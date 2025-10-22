//optimize mobile performance though page speed insights, lightbulub google dev backlink
//remove initial loading animation decrease size*colorblind*
//remove background for favicons
"use client";

import { useState, useEffect, useLayoutEffect } from 'react'
import './globals.css'

import { solveLightsOut } from './assist';
import { FadeInPanel, FadeOutPanel, BoardChange } from './Animations';
import { Settings, Help, Victory, Header, Board6x6 } from './Components';
import { Howl } from 'howler';
import { generateLightsOutSeed, getTodaySeedNumber, generateRealLightsOutSeed } from './seedGen.js';

const todaySeed = getTodaySeedNumber()
const seed6x6 = generateLightsOutSeed(6, todaySeed);
const seed5x5 = generateRealLightsOutSeed(generateLightsOutSeed(5, todaySeed));
const seed4x4 = generateRealLightsOutSeed(generateLightsOutSeed(4, todaySeed));

const sounds = {
  click: new Howl({ src: ['./assets/click.wav'], volume: 0.875, preload: true }),
  win: new Howl({ src: ['./assets/win.wav'], volume: 0.625, preload: true }),
  reset: new Howl({ src: ['./assets/cardflip.mp3'], volume: 0.75, preload: true }),
  assist: new Howl({ src: ['./assets/assist.mp3'], volume: 0.75, preload: true }),
  toggle: new Howl({ src: ['./assets/toggle.wav'], volume: 0.5, preload: true }),
  uiclick: new Howl({ src: ['./assets/uiclick.wav'], volume: 1.0, preload: true }),
};

function getLocalDateString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getTodayKey(diff) {
  const today = getLocalDateString();
  return `togl-stats-${today}-diff${diff}`;
}

export default function Page() {
  const [difficulty, setDifficulty] = useState(1);
  const [previousDifficulty, setPreviousDifficulty] = useState(1);
  const sizeMap = [4, 5, 6];
  const gridSize = sizeMap[difficulty] || 6;
  const currentSeed = difficulty === 0 ? seed4x4 : (difficulty === 1 ? seed5x5 : seed6x6);
  const [victories, setVictories] = useState({ 0: false, 1: false, 2: false });

  const [stats, setStats] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        0: { secondsElapsed: 0, numOfMoves: 0, numOfResets: 0, numOfAssists: 0 },
        1: { secondsElapsed: 0, numOfMoves: 0, numOfResets: 0, numOfAssists: 0 },
        2: { secondsElapsed: 0, numOfMoves: 0, numOfResets: 0, numOfAssists: 0 },
      };
    }

    const today = getLocalDateString();
    const allStats = {};
    [0, 1, 2].forEach(diff => {
      const key = getTodayKey(diff);
      const saved = JSON.parse(localStorage.getItem(key)) || {};
      allStats[diff] = {
        secondsElapsed: saved.secondsElapsed || 0,
        numOfMoves: saved.numOfMoves || 0,
        numOfResets: saved.numOfResets || 0,
        numOfAssists: saved.numOfAssists || 0,
      };
    });
    return allStats;
  });

  const [secondsElapsed, setSecondsElapsed] = useState(stats[difficulty].secondsElapsed);
  const [numOfMoves, setNumOfMoves] = useState(stats[difficulty].numOfMoves);
  const [numOfResets, setNumOfResets] = useState(stats[difficulty].numOfResets);
  const [numOfAssists, setNumOfAssists] = useState(stats[difficulty].numOfAssists);

  const victory = victories[difficulty];

  const [resetKey, setResetKey] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [onColor, setOnColor] = useState('#4CAF50');
  const [offColor, setOffColor] = useState('#C0C0C0');

  useLayoutEffect(() => {
    setDarkMode(localStorage.getItem('darkMode') === 'true');
    setOnColor(localStorage.getItem('onColor') || '#4CAF50');
    setOffColor(localStorage.getItem('offColor') || '#C0C0C0');
  }, []);

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => localStorage.setItem('darkMode', darkMode), [darkMode]);
  useEffect(() => localStorage.setItem('onColor', onColor), [onColor]);
  useEffect(() => localStorage.setItem('offColor', offColor), [offColor]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const today = getLocalDateString();

    // Remove any stale keys from previous days first
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('togl-stats-') && !key.includes(today)) {
        localStorage.removeItem(key);
      }
    });

    const allVictories = {};
    const allStats = {};
    [0, 1, 2].forEach(diff => {
      const key = getTodayKey(diff);
      const saved = JSON.parse(localStorage.getItem(key)) || {};

      allVictories[diff] = !!saved.victory;
      allStats[diff] = {
        secondsElapsed: Number.isFinite(saved.secondsElapsed) ? saved.secondsElapsed : 0,
        numOfMoves: Number.isFinite(saved.numOfMoves) ? saved.numOfMoves : 0,
        numOfResets: Number.isFinite(saved.numOfResets) ? saved.numOfResets : 0,
        numOfAssists: Number.isFinite(saved.numOfAssists) ? saved.numOfAssists : 0,
      };
    });

    setVictories(allVictories);
    setStats(allStats);

    const current = allStats[difficulty] || { secondsElapsed: 0, numOfMoves: 0, numOfResets: 0, numOfAssists: 0 };
    setSecondsElapsed(current.secondsElapsed);
    setNumOfMoves(current.numOfMoves);
    setNumOfResets(current.numOfResets);
    setNumOfAssists(current.numOfAssists);
  }, []);

  const [showSettings, setShowSettings] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(null);
  const [animatedCells, setAnimatedCells] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [isSettingClosing, setIsSettingClosing] = useState(false);
  const [isHelpClosing, setIsHelpClosing] = useState(false);
  const [animatedCellsReset, setAnimatedCellsReset] = useState([]);

  function playSound(name) {
    if (sounds[name]) {
      sounds[name].stop();
      sounds[name].play();
    }
  }

  useEffect(() => {
    if (!hasStarted && !victories[difficulty]) return;

    const currentKey = getTodayKey(difficulty);
    const data = {
      victory: !!victories[difficulty],
      secondsElapsed: Number.isFinite(secondsElapsed) ? secondsElapsed : 0,
      numOfMoves: Number.isFinite(numOfMoves) ? numOfMoves : 0,
      numOfResets: Number.isFinite(numOfResets) ? numOfResets : 0,
      numOfAssists: Number.isFinite(numOfAssists) ? numOfAssists : 0,
    };

    localStorage.setItem(currentKey, JSON.stringify(data));
  }, [
    victories[difficulty],
    hasStarted,
    secondsElapsed,
    numOfMoves,
    numOfResets,
    numOfAssists,
    difficulty
  ]);

  useEffect(() => {
    return () => {
      const currentKey = getTodayKey(difficulty);
      const saved = JSON.parse(localStorage.getItem(currentKey));

      if (saved && !saved.victory) {
        localStorage.removeItem(currentKey);
      }
    };
  }, [difficulty]);

  const generateBoard = (seed) => {
    return seed.map(v => v === 1);
  };

  const [board, setBoard] = useState(() => generateBoard(currentSeed));
  const defaultBoard = generateBoard(currentSeed);

  useEffect(() => {
    const seed = difficulty === 0 ? seed4x4 : (difficulty === 1 ? seed5x5 : seed6x6);
    const todayKey = getTodayKey(difficulty);
    const savedStats = JSON.parse(localStorage.getItem(todayKey)) || {};

    if (savedStats.victory) {
      setBoard(Array(gridSize * gridSize).fill(true));
    } else {
      setBoard(seed.map(v => v === 1));
    }

    setHasStarted(false);
    setIsHighlighted(null);
  }, [difficulty]);

  useEffect(() => {
    const current = stats[difficulty];
    setSecondsElapsed(current.secondsElapsed);
    setNumOfMoves(current.numOfMoves);
    setNumOfResets(current.numOfResets);
    setNumOfAssists(current.numOfAssists);
  }, [difficulty]);

  const handleClick = (index) => {
    if (victory) return;
    if (!hasStarted) setHasStarted(true);

    const newBoard = [...board];
    const toggledCells = [index];

    newBoard[index] = !newBoard[index];

    if (index % gridSize !== 0) {
      newBoard[index - 1] = !newBoard[index - 1];
      toggledCells.push(index - 1);
    }
    if (index % gridSize !== gridSize - 1) {
      newBoard[index + 1] = !newBoard[index + 1];
      toggledCells.push(index + 1);
    }
    if (index - gridSize >= 0) {
      newBoard[index - gridSize] = !newBoard[index - gridSize];
      toggledCells.push(index - gridSize);
    }
    if (index + gridSize < gridSize * gridSize) {
      newBoard[index + gridSize] = !newBoard[index + gridSize];
      toggledCells.push(index + gridSize);
    }

    setBoard(newBoard);
    setNumOfMoves(numOfMoves + 1);
    setIsHighlighted(null);
    setAnimatedCells(toggledCells);

    if (newBoard.every(cell => cell)) {
      setVictories(prev => ({ ...prev, [difficulty]: true }));

      const todayKey = getTodayKey(difficulty);
      const stats = {
        secondsElapsed,
        numOfMoves,
        numOfResets,
        numOfAssists,
        victory: true,
      };
      localStorage.setItem(todayKey, JSON.stringify(stats));
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

  useLayoutEffect(() => {
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
    setVictories(prev => ({ ...prev, [difficulty]: false }));
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
          pressableIndices.push({ row, col, index: row * gridSize + col });
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
        <Header
          resetGame={resetGame}
          getAssist={getAssist}
          board={board}
          setIsHighlighted={setIsHighlighted}
          numOfAssists={numOfAssists}
          setNumOfAssists={setNumOfAssists}
          setShowSettings={setShowSettings}
          setShowHelp={setShowHelp}
          playSound={playSound}
        />

        <hr className="divider" />

        {(() => {
          const [mounted, setMounted] = useState(false);
          useEffect(() => setMounted(true), []);

          return (
            <p className="timer">
              Time: {mounted ? formatTime(secondsElapsed) : "00:00.00"}
            </p>
          );
        })()}

        <BoardChange difficulty={difficulty} direction={difficulty > previousDifficulty ? 1 : -1}>
          <Board6x6
            board={board}
            handleClick={handleClick}
            onColor={onColor}
            offColor={offColor}
            isHighlighted={isHighlighted}
            animatedCells={animatedCells}
            animatedCellsReset={animatedCellsReset}
            GRID_SIZE={gridSize}
            playSound={playSound}

          />
        </BoardChange>

        {victory && (() => {
          return (
            <FadeInPanel>
              <Victory
                playSound={playSound}
                GRID_SIZE={gridSize}
                secondsElapsed={secondsElapsed}
                numOfMoves={numOfMoves}
                numOfAssists={numOfAssists}
                numOfResets={numOfResets}
                defaultBoard={defaultBoard}
                formatTime={formatTime}
                setDifficulty={setDifficulty}
                difficulty={difficulty}
                setPreviousDifficulty={setPreviousDifficulty}
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
            setDifficulty,
            difficulty,
            setPreviousDifficulty,
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
