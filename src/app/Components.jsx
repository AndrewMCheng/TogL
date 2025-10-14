import { AnimatedButton, AnimatedColorPicker, AnimatedToggle } from './Animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';

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

export function Settings({
    darkMode = false,
    setDarkMode = () => { },
    onColor = '#4CAF50',
    setOnColor = () => { },
    offColor = '#C0C0C0',
    setOffColor = () => { },
    closeSettings = () => { },
    playSound = () => { }
}) {
    return (
        <div className="overlay" onClick={closeSettings}>
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
                    <p> <FontAwesomeIcon icon={faGear} /> Settings - edit the color themes</p>
                    <p> <FontAwesomeIcon icon={faLightbulb} /> Lightbulb - get a hint</p>
                    <p> <FontAwesomeIcon icon={faRotate} /> Reset - reset the board</p>
                </div>
                <p>Try to solve the puzzle in as few moves and time as possible with the least amount of help!</p>
                <AnimatedButton onClick={() => {
                    closeHelp()
                    playSound("uiclick")
                }
                }>Close</AnimatedButton>
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
  formatTime = () => {}
}) {
  return (
    <div className="victory-overlay">
      <div className="victory-box">
        <p className="victory-title">
          You got today's puzzle! Come back tomorrow for a new one
        </p>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 30px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 30px)`,
            gap: '3px',
            justifyContent: 'center'
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
        <div className="victory-footer2">
          <StatBox label="Assists" value={numOfAssists} />
          <StatBox label="Resets" value={numOfResets} />
        </div>
        <p style={{ fontSize: '1rem' }}>Screenshot and share with others!</p>
      </div>
    </div>
  );
}
