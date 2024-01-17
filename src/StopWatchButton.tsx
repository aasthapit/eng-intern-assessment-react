import React, { useState } from "react";

type Props = {
  setTimeInSeconds: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTimeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);

  const handleStartButton = () => {
    let interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000);

    setIntervalId(interval);
  };

  const handleStopButton = () => {
    clearInterval(intervalId);
  };

  const handleResetButton = () => {
    clearInterval(intervalId);
    setTimeInSeconds(0);
  };

  return (
    <div className="buttons">
      <button onClick={handleStopButton}>Restart</button>
      <button onClick={handleStartButton}>Start</button>
      <button onClick={handleStopButton}>Stop</button>
    </div>
  );
}
