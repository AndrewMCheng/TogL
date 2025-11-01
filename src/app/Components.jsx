import { AnimatedButton, AnimatedColorPicker, AnimatedToggle, ResetGame, AnimatedCell } from './Animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRotate, faQuestion, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import './globals.css'

function ColorPicker({ children, color, setColor, onClick }) {
    return (
        <label>
            {children}
            <AnimatedColorPicker>
                <input type="color"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    onClick={onClick}
                />
            </AnimatedColorPicker>
        </label>
    )
}

export default function DifficultyTabs({
    setDifficulty = () => { },
    setPreviousDifficulty = () => { },
    playSound = () => { },
    closeSettings = () => { },
    value = 0
}) {
    const [active, setActive] = useState(value);

    useEffect(() => {
        setActive(value);
    }, [value]);

    const handleClick = (index) => {
        setPreviousDifficulty(active);
        setActive(index);
        setDifficulty(index);
    };

    return (
        <div className="tabs" onClick={e => e.stopPropagation()}>
            <div
                className="active"
                style={{
                    transform: `translateX(calc(${active} * 100% + ${active} * 10px + 5px))`,
                    width: "calc(33.33% - 10px)",
                }}
            ></div>

            <button onClick={() => { playSound("uiclick"); closeSettings(); handleClick(0); }} aria-pressed={active === 0}>Easy</button>
            <button onClick={() => { playSound("uiclick"); closeSettings(); handleClick(1); }} aria-pressed={active === 1}>Medium</button>
            <button onClick={() => { playSound("uiclick"); closeSettings(); handleClick(2); }} aria-pressed={active === 2}>Hard</button>
        </div>
    );
}

export function Settings({
    darkMode = false,
    setDarkMode = () => { },
    onColor = '#4CAF50',
    setOnColor = () => { },
    offColor = '#C0C0C0',
    setOffColor = () => { },
    closeSettings = () => { },
    setDifficulty = () => { },
    difficulty = 1,
    setPreviousDifficulty = () => { },
    playSound = () => { },
}) {
    return (
        <div className="overlay" onClick={closeSettings}>
            <div className="setting-container">
                <div className="settings-modal" onClick={e => e.stopPropagation()}>
                    <h2>Settings</h2>
                    <label>
                        <AnimatedToggle>
                            <button
                                className={`toggle-button ${darkMode ? "toggled" : ""}`}
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                    playSound("toggle");
                                }}
                            >
                                <div className="thumb"></div>
                            </button>
                        </AnimatedToggle>
                        Dark Mode
                    </label>
                    <ColorPicker
                        color={offColor}
                        setColor={setOffColor}
                        onClick={() => {
                            playSound("uiclick")
                        }}
                    >
                        Off Color:
                    </ColorPicker>
                    <ColorPicker
                        color={onColor}
                        setColor={setOnColor}
                        onClick={() => {
                            playSound("uiclick")
                        }}
                    >
                        On Color:
                    </ColorPicker>
                    <AnimatedButton
                        className="close-button"
                        onClick={() => {
                            closeSettings()
                            playSound("uiclick")
                        }}
                    >
                        Close
                    </AnimatedButton>
                </div>
                <DifficultyTabs setDifficulty={setDifficulty} value={difficulty} setPreviousDifficulty={setPreviousDifficulty} playSound={playSound} closeSettings={closeSettings} />
            </div>
        </div>
    );
}

export function Help({
    closeHelp = () => { },
    playSound = () => { },
}) {
    return (
        <div className="overlay" onClick={closeHelp}>
            <div className="help-box" onClick={e => e.stopPropagation()}>
                <h2>How to Play</h2>
                <p style={{ fontSize: '12px' }}>!this game is more challenging than it looks!</p>
                <div style={{ textAlign: 'left' }}>
                    <p>The goal is to turn all the cells on</p>
                    <p>Clicking a cell turns it on and the cells adjacent to it</p>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <p> <FontAwesomeIcon icon={faGear} /> Settings - edit themes and change difficulty</p>
                    <p> <FontAwesomeIcon icon={faLightbulb} /> Lightbulb - get a hint</p>
                    <p> <FontAwesomeIcon icon={faRotate} /> Reset - reset the board</p>
                </div>
                <p>Try to solve the puzzle in as few moves and time as possible with the least amount of help!</p>
                <AnimatedButton className="close-button" onClick={() => {
                    closeHelp()
                    playSound("uiclick")
                }}>Close</AnimatedButton>
            </div>
        </div>
    )
}

function StatBox(props) {
    return (
        <div className="stat-box">
            <p className="stat-label">{props.label}</p>
            <p className="stat-value">{props.value}</p>
        </div>
    )
}

export function Victory({
    GRID_SIZE = 5,
    secondsElapsed = 0,
    numOfMoves = 0,
    numOfAssists = 0,
    numOfResets = 0,
    defaultBoard = [],
    formatTime = () => { },
    setDifficulty = () => { },
    difficulty = 1,
    setPreviousDifficulty = () => { },
    playSound = () => { },
}) {
    return (
        <div className="overlay">
            <div className="setting-container">
                <div className="victory-box">
                    <p className="victory-title">
                        You got today's puzzle! Come back tomorrow for a new one
                    </p>
                    <div
                        className="grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                            gap: `${(180 / GRID_SIZE) * 0.1}px`,
                            width: "95vw",
                            maxWidth: "190px",
                            aspectRatio: "1 / 1",
                            margin: "0 auto",
                        }}
                    >
                        {defaultBoard.map((val, index) => (
                            <div
                                key={index}
                                className="victory-cell"
                                style={{
                                    backgroundColor: val ? '#4CAF50' : '#C0C0C0',
                                    borderRadius: '2.5px'
                                }}
                            />
                        ))}
                    </div>

                    <div className="victory-footer">
                        <StatBox label="Time" value={formatTime(secondsElapsed)} />
                        <StatBox label="Moves" value={numOfMoves} />
                    </div>
                    <div className="victory-footer">
                        <StatBox label="Assists" value={numOfAssists} />
                        <StatBox label="Resets" value={numOfResets} />
                    </div>
                    <p style={{ fontSize: '1rem', display: 'inline-block' }}>Share with others!</p>
                    <AnimatedButton className="share-button"
                        onClick={() => { handleCopyResults({ difficulty, secondsElapsed, numOfMoves, formatTime });
                        playSound("uiclick") }}
                    >
                        <FontAwesomeIcon icon={faShareNodes} />
                    </AnimatedButton>
                </div>
                <DifficultyTabs setDifficulty={setDifficulty} value={difficulty} setPreviousDifficulty={setPreviousDifficulty} playSound={playSound} />
            </div>
        </div>
    );
}

export function Header({
    resetGame = () => { },
    getAssist = () => { },
    board = [],
    setIsHighlighted = () => { },
    numOfAssists = 0,
    setNumOfAssists = () => { },
    setShowSettings = () => { },
    setShowHelp = () => { },
    playSound = () => { },
    numOfResets,
}) {
    return (
        <div className="header-container">

            <div className="left-buttons">
                <AnimatedButton className="reset-button" aria-label="Reset Game" onClick={() => {
                    resetGame();
                }}>
                    <FontAwesomeIcon icon={faRotate} />
                </AnimatedButton>
                <AnimatedButton className="assist-button" aria-label="Get Hint" onClick={() => {
                    const assist = getAssist(board);
                    if (assist) {
                        setIsHighlighted(assist.index);
                        setNumOfAssists(numOfAssists + 1);
                        playSound("assist");
                    }
                }}>
                    <FontAwesomeIcon icon={faLightbulb} />
                </AnimatedButton>
            </div>

            <p className="title">TogL</p>

            <div className="right-buttons">
                <AnimatedButton
                    className="settings-button"
                    aria-label="Settings"
                    onClick={() => {
                        setShowSettings(true)
                        playSound("uiclick");
                    }}
                >
                    <FontAwesomeIcon icon={faGear} />
                </AnimatedButton>
                <AnimatedButton
                    className="help-button"
                    aria-label="Help"
                    onClick={() => {
                        setShowHelp(true)
                        playSound("uiclick");
                    }}
                >
                    <FontAwesomeIcon icon={faQuestion} />
                </AnimatedButton>
            </div>
        </div>
    )
}

export function Board6x6({
    GRID_SIZE = 6,
    board = [],
    handleClick = () => { },
    onColor = "#4CAF50",
    offColor = "#C0C0C0",
    animatedCells = [],
    animatedCellsReset = [],
    isHighlighted = -1,
    playSound = () => { }
}) {
    return (
        <div
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                width: "min(80vw, 300px)",
                aspectRatio: "1 / 1",
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
                        role="button"
                        aria-label={`Cell ${index + 1}, currently ${val ? "on" : "off"}`}
                        aria-pressed={val ? "true" : "false"}
                        isAnimatedCell={animatedCells.includes(index) || index === isHighlighted}
                        style={{
                            backgroundColor: index === isHighlighted
                                ? "orange"
                                : val
                                    ? onColor
                                    : offColor,
                            boxShadow:
                                index === isHighlighted
                                    ? "0 0 10px 3px orange"
                                    : val
                                        ? "0 0 5px rgba(0, 0, 0, 0.25)"
                                        : "none",
                            transition: "box-shadow 0.3s ease, background-color 0.3s ease",
                        }}
                    />
                </ResetGame>
            ))}
        </div>
    );
}

function handleCopyResults({ difficulty, secondsElapsed, numOfMoves, formatTime }) {
    const gridSize = difficulty === 0 ? "4x4 Easy 😊" : difficulty === 1 ? "5x5 Medium 😑" : "6x6 Hard 🤬";
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });


    const text = `TogL - ${today}
${gridSize} 
⏱️ ${formatTime(secondsElapsed)} 🎮 ${numOfMoves} moves
https://playtogl.com`;

    navigator.clipboard.writeText(text).then(() => {
        alert("Copied results to clipboard!");
    });
}

