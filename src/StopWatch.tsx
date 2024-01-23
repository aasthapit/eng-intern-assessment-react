import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

//StopWatch function
export default function StopWatch() {
  // State to manage the time in seconds
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  // State to store the formatted timer array [hours, minutes, seconds]
  const [timerArray, setTimerArray] = useState<Array<number | string>>(["00:00:00"]);

  // Effect hook to update the timerArray when timeInSeconds changes
  useEffect(() => {
    // Calculate the timer and update the state
    let timerArray: Array<number | string> = calculateTimer(timeInSeconds);
    setTimerArray(timerArray);
  }, [timeInSeconds]);
const [laps, setLaps] = useState<string[]>([]);
  return (
    <div className="Stopwatch">
      <h1>Stopwatch</h1>
      <div>
        <span id="current-timer" >
          {timerArray.join(':')}
        </span>
      </div>
      <div className="stopWatchButtons">
        <StopWatchButton setTimeInSeconds={setTimeInSeconds} />
      </div>   
      
    </div>
  );
}

// Function to calculate the current time and return the results in an resulting array of [hours, minutes, seconds]
function calculateTimer(timeInSeconds: number): Array<number | string> {
  // Calculate hours, minutes, and seconds
  let hours: number = Math.floor(timeInSeconds / 3600);
  let minutes: number = Math.floor((timeInSeconds - hours * 3600) / 60);
  let seconds: number = timeInSeconds - hours * 3600 - minutes * 60;

  // Format hours, minutes, and seconds to always display 2 digits
  // in order to consistently display 2 digits, doing a check of the time value. If value is less than 10, prepend a 0 to the value as a string
  let hoursFormatted = hours < 10 ? `0${hours}` : hours;
  let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
  let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;

  return [hoursFormatted, minutesFormatted, secondsFormatted];
}
