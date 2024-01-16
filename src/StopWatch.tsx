import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  return (
    <div className="stopwatch">
      <h1>StopWatch</h1>
      <div className="time">
        <span className="hours">0</span>
        <span className="time-sep">h</span>
        <span className="minutes">0</span>
        <span className="time-sep">m</span>
        <span className="seconds">0</span>
        <span className="time-sep">s</span>
      </div>
      <p className="stopWatchButtons"></p>
      <StopWatchButton />
    </div>
  );
}
