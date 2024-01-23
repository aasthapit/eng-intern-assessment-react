import React, { useState, useRef } from "react";

// Define the type for props expected by StopWatchButton component
type Props = {
  setTimeInSeconds: Function;
};

// StopWatchButton function
export default function StopWatchButton(props: Props) {
  const { setTimeInSeconds } = props;
  // State to manage the interval ID for setInterval
  const [intervalId, setIntervalId] = useState<number>(0);
   // State to store lap times
  const [lapTimes, setLapTimes] = useState<string[]>([]);

  // Function to handle the Start button click
  const handleStartButton = () => {
    // Set up the interval to update timeInSeconds every second
    let interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000);
    // Disable the Start button and store the interval ID
    setButtonDisabled(true);
    setIntervalId(interval);
  };

  // Function to handle the Stop button click
  const handleStopButton = () => {
    // Enable the Start button and clear the interval
    setButtonDisabled(false);
    clearInterval(intervalId);
  };

  

  const handleLapButton = () => {
    // Enable the Lap button
    // Get the current time
    var sourceContent = document.getElementById('current-timer').innerText;

    setLapTimes(prevLapTimes => [...prevLapTimes, sourceContent]);
  }
  
  

  //Function to handle the Pause button click
  const handlePauseButton = () => {
    // Enable the stop button and clear the interval
    setButtonDisabled(false);
    clearInterval(intervalId);
  
  };


  // Function to handle the Restart button click
  const handleResetButton = () => {
    // Clear the interval and reset timeInSeconds to 0
    clearInterval(intervalId);
    setTimeInSeconds(0);
    document.getElementById('lap-list').innerHTML = "";
  };

  // Styles for disabled and enabled buttons
  const styles = {
    disabledButton: {
      display: "none",
      cursor: "not-allowed",
    },

    enabledButton: {},
  };

  //keeps track of state to determine what button is displayed. Will have the start button dissapear on start and replaced with stop button
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  return (
    <div className="buttons">
      <button onClick={handleResetButton}>Reset</button>
      <button
        onClick={handleStartButton}
        style={isButtonDisabled ? styles.disabledButton : styles.enabledButton}
        disabled={isButtonDisabled}
      >
        Start
      </button>
      <button
        onClick={handleStopButton}
        style={!isButtonDisabled ? styles.disabledButton : styles.enabledButton}
        disabled={!isButtonDisabled}
      >
        Stop
      </button>
      
      <button onClick={handlePauseButton} style={!isButtonDisabled ? styles.disabledButton : styles.enabledButton}
        disabled={!isButtonDisabled}>Pause</button>
      <button onClick={handleStartButton} style={isButtonDisabled ? styles.disabledButton : styles.enabledButton}
        disabled={isButtonDisabled}>Resume</button>
        <div>
      <button onClick={handleLapButton}>Lap</button>
        <h2>Laps</h2>
        <div className='lap-list' id='lap-list'data-testid="lap-list" >
          {lapTimes.map((lapTime, index) => (
          <span id="time" key={index}>{lapTime}</span>
        ))}
        </div>
        </div>
    </div>
  );
}
