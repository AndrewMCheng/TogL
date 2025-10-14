"use client";

import { useState, useEffect } from 'react'
import './globals.css'
import seeds from './seeds'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRotate, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { solveLightsOut } from './assist';
import { GRID_SIZE, AnimatedButton, AnimatedCell, FadeInPanel, FadeOutPanel, ResetGame } from './Animations';
import { Settings, Help, Victory } from './Components';
import { Howl } from 'howler';

const sounds = {
  click: new Howl({ src: ['./assets/click.wav'], volume: 0.875, preload: true }),
  win: new Howl({ src: ['./assets/win.wav'], volume: 0.625, preload: true }),
  reset: new Howl({ src: ['./assets/cardflip.mp3'], volume: 0.75, preload: true }),
  assist: new Howl({ src: ['./assets/assist.mp3'], volume: 0.75, preload: true }),
  toggle: new Howl({ src: ['./assets/toggle.wav'], volume: 0.5, preload: true }),
  uiclick: new Howl({ src: ['./assets/uiclick.wav'], volume: 1.0, preload: true }),
};

function getTodayKey() {
  const today = new Date().toISOString().split('T')[0];
  return `togl-stats-${today}`;
}

export default function Page() {
  const currentSeed = seeds[0];
  const [victory, setVictory] = useState(false);
  const [resetKey, setResetKey] = useState(false);

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [numOfMoves, setNumOfMoves] = useState(0);
  const [numOfResets, setNumOfResets] = useState(0);
  const [numOfAssists, setNumOfAssists] = useState(0);

  const [darkMode, setDarkMode] = useState(false);
  const [onColor, setOnColor] = useState('#4CAF50');
  const [offColor, setOffColor] = useState('#C0C0C0');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const todayKey = getTodayKey();
    const savedStats = JSON.parse(localStorage.getItem(todayKey)) || {};

    setSecondsElapsed(savedStats.secondsElapsed || 0);
    setNumOfMoves(savedStats.numOfMoves || 0);
    setNumOfResets(savedStats.numOfResets || 0);
    setNumOfAssists(savedStats.numOfAssists || 0);

    setDarkMode(localStorage.getItem('darkMode') === 'true');
    setOnColor(localStorage.getItem('onColor') || '#4CAF50');
    setOffColor(localStorage.getItem('offColor') || '#C0C0C0');
  }, []);

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => localStorage.setItem('darkMode', darkMode), [darkMode]);
  useEffect(() => localStorage.setItem('onColor', onColor), [onColor]);
  useEffect(() => localStorage.setItem('offColor', offColor), [offColor]);

  const [showSettings, setShowSettings] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(null);
  const [animatedCells, setAnimatedCells] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [isSettingClosing, setIsSettingClosing] = useState(false);
  const [isHelpClosing, setIsHelpClosing] = useState(false);
  const [animatedCellsReset, setAnimatedCellsReset] = useState([]);
  const [isDailyAssistLimit, setIsDailyAssistLimit] = useState(false);
  const [isDailyResetLimit, setIsDailyResetLimit] = useState(false);

  function playSound(name) {
    if (sounds[name]) {
      sounds[name].stop();
      sounds[name].play();
    }
  }

  useEffect(() => {
    const todayKey = getTodayKey();
    const stats = {
      secondsElapsed,
      numOfMoves,
      numOfResets,
      numOfAssists,
    };
    localStorage.setItem(todayKey, JSON.stringify(stats));
  }, [secondsElapsed, numOfMoves, numOfResets, numOfAssists]);

  useEffect(() => {
    const todayKey = getTodayKey();
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('togl-stats-') && key !== todayKey) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  const generateBoard = (seed) => {
    return seeds.map(v => v === 1);
  };

  const [board, setBoard] = useState(generateBoard(currentSeed));
  const defaultBoard = generateBoard(currentSeed);

  useEffect(() => {
    if (victory) {
      const today = new Date().toDateString();
      const completedDate = localStorage.getItem("puzzleCompletedDate");
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      if (completedDate !== today) {
        playSound("win");
        localStorage.setItem("puzzleCompletedDate", today);
      }

    }
    else {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, [victory]);

  useEffect(() => {
    const today = new Date().toDateString();
    const completedDate = localStorage.getItem('puzzleCompletedDate');
    if (completedDate === today) {
      setVictory(true);
    }
  }, []);

  const handleClick = (index) => {
    if (victory) return;
    if (!hasStarted) setHasStarted(true);

    const newBoard = [...board];
    const toggledCells = [index];

    newBoard[index] = !newBoard[index];

    if (index % GRID_SIZE !== 0) {
      newBoard[index - 1] = !newBoard[index - 1];
      toggledCells.push(index - 1);
    }
    if (index % GRID_SIZE !== GRID_SIZE - 1) {
      newBoard[index + 1] = !newBoard[index + 1];
      toggledCells.push(index + 1);
    }
    if (index - GRID_SIZE >= 0) {
      newBoard[index - GRID_SIZE] = !newBoard[index - GRID_SIZE];
      toggledCells.push(index - GRID_SIZE);
    }
    if (index + GRID_SIZE < GRID_SIZE * GRID_SIZE) {
      newBoard[index + GRID_SIZE] = !newBoard[index + GRID_SIZE];
      toggledCells.push(index + GRID_SIZE);
    }

    setBoard(newBoard);
    setNumOfMoves(numOfMoves + 1);
    setIsHighlighted(null);

    setAnimatedCells(toggledCells);

    if (newBoard.every(cell => cell)) {
      setVictory(true);
    }

    setTimeout(() => setAnimatedCells([]), 300);
  }

  useEffect(() => {
    if (!hasStarted || victory) return;

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 10);
    }, 10);

    return () => clearInterval(timer);
  }, [resetKey, victory, hasStarted]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  const resetGame = () => {

    const cellsToFlip = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] !== defaultBoard[i]) {
        cellsToFlip.push(i);
      }
    }
    if (cellsToFlip.length > 0) {
      playSound("reset")
    }
    setAnimatedCellsReset(cellsToFlip);
    setVictory(false);
    setResetKey(!resetKey);
    setHasStarted(false);
    setSecondsElapsed(0);
    setNumOfMoves(0);
    setNumOfResets(numOfResets + 1);
    setIsHighlighted(null);
    setNumOfAssists(0);
    setTimeout(() => {
      setBoard(generateBoard(currentSeed));
    }, 300);
    setTimeout(() => {
      setAnimatedCellsReset([]);
    }, 600);
  }

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hundredth = Math.floor(milliseconds % 1000 / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredth).padStart(2, '0')}`;
  }

  function getAssist(board) {
    const solution = solveLightsOut(board);
    const pressableIndices = [];

    for (let row = 0; row < solution.length; row++) {
      for (let col = 0; col < solution[row].length; col++) {
        if (solution[row][col] === 1) {
          pressableIndices.push({ row, col, index: row * GRID_SIZE + col });
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * pressableIndices.length);
    return pressableIndices[randomIndex];
  }

  function closeSettings() {
    setIsSettingClosing(true);
    setTimeout(() => {
      setShowSettings(false);
      setIsSettingClosing(false);
    }, 500);
  }

  function closeHelp() {
    setIsHelpClosing(true);
    setTimeout(() => {
      setShowHelp(false);
      setIsHelpClosing(false);
    }, 500);
  }

  return (
    <>
      <div className="main-container">
        <div className="header-container">
          <p className="title">Togl</p>

          <AnimatedButton className="reset-button" onClick={() => {
            resetGame();
          }
          }>
            <FontAwesomeIcon icon={faRotate} />
          </AnimatedButton>
          <AnimatedButton className="assist-button" onClick={() => {
            const assist = getAssist(board);
            if (assist) {
              setIsHighlighted(assist.index);
              setNumOfAssists(numOfAssists + 1);
              playSound("assist");
            }
          }}>
            <FontAwesomeIcon icon={faLightbulb} />
          </AnimatedButton>
          <AnimatedButton
            className="settings-button"
            onClick={() => {
              setShowSettings(true)
              playSound("uiclick");
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </AnimatedButton>
          <AnimatedButton
            className="help-button"
            onClick={() => {
              setShowHelp(true)
              playSound("uiclick");
            }}
          >
            <FontAwesomeIcon icon={faQuestion} />
          </AnimatedButton>
        </div>

        <hr className="divider" />

        <p className="timer" >
          Time: {formatTime(secondsElapsed)}
        </p>

        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 3rem)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 3rem)`,
            width: `${GRID_SIZE * 3 + (GRID_SIZE - 1) * 0.25}rem`
          }}
        >

          {board.map((val, index) => (

            <ResetGame key={index} flip={animatedCellsReset.includes(index)}>
              <AnimatedCell
                onClick={() => {
                  handleClick(index);
                  playSound("click");
                }}
                className="cell"
                isAnimatedCell={animatedCells.includes(index) || index === isHighlighted}
                style={{
                  backgroundColor: index === isHighlighted
                    ? 'orange'
                    : (val ? onColor : offColor),
                  boxShadow: index === isHighlighted
                    ? '0 0 10px 3px orange'
                    : (val ? '0 0 5px rgba(0, 0, 0, 0.25)' : 'none'),
                  transition: 'box-shadow 0.3s ease, background-color 0.3s ease'
                }}
              ></AnimatedCell>
            </ResetGame>

          ))}
        </div>

        {victory && (() => {
          return (
            <FadeInPanel>
              <Victory
                GRID_SIZE={GRID_SIZE}
                secondsElapsed={secondsElapsed}
                numOfMoves={numOfMoves}
                numOfAssists={numOfAssists}
                numOfResets={numOfResets}
                defaultBoard={defaultBoard}
                formatTime={formatTime}
              />
            </FadeInPanel>
          );
        })()}

        {showHelp && (() => {
          const Wrapper = isHelpClosing ? FadeOutPanel : FadeInPanel;

          const helpProps = {
            closeHelp,
            playSound,
          };

          return (
            <Wrapper>
              <Help {...helpProps} />
            </Wrapper>
          );
        })()}

        {showSettings && (() => {
          const Wrapper = isSettingClosing ? FadeOutPanel : FadeInPanel;

          const settingsProps = {
            darkMode,
            setDarkMode,
            onColor,
            setOnColor,
            offColor,
            setOffColor,
            closeSettings,
            setShowSettings,
            playSound,
          };

          return (
            <Wrapper>
              <Settings {...settingsProps} />
            </Wrapper>
          );
        })()}
      </div>

    </>
  )
}
