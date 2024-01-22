import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  return (
    <div className="App">
      <header className="App">
        
      </header>
      <body>  
        <StopWatch />
        <ol id="lap-list"> </ol>
      </body>
    </div>
  );
}
