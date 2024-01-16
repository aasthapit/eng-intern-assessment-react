import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [timeInSeconds, setStimeInSeconts] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);

  useEffect(() => {
    let timerArray: Array<number | string> = calculateTimer(timeInSeconds);
    setTimerArray(timerArray);
  }, [timeInSeconds]);

  return (
    <div className="stopwatch">
      <h1>StopWatch</h1>
      <div className="time">
        <span className="hours">{timerArray[0]}</span>
        <span className="time-sep">h</span>
        <span className="minutes">{timerArray[1]}</span>
        <span className="time-sep">m</span>
        <span className="seconds">{timerArray[2]}</span>
        <span className="time-sep">s</span>
      </div>
      <p className="stopWatchButtons"></p>
      <StopWatchButton />
    </div>
  );
}

//function to calculate the current time and return the results in an resulting array of [hours, minutes, seconds]
function calculateTimer(timeInSeconds: number): Array<number | string> {
  let hours: number = Math.floor(timeInSeconds / 3600);
  let minutes: number = Math.floor((timeInSeconds - hours * 3600) / 60);
  let seconds: number = timeInSeconds - hours * 3600 - minutes * 60;

  //in order to consistently display 2 digits, doing a check of the time value. If value is less than 10, prepend a 0 to the value as a string
  let hoursFormatted = hours < 10 ? `0${hours}` : hours;
  let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
  let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;

  return [hoursFormatted, minutesFormatted, secondsFormatted];
}
