import { useState } from "react";
import "./App.css";
import ThreeTest from "./threeTest/threeTest";

function App() {
  const [xSpeed, setXSpeed] = useState(0.01);
  const [ySpeed, setYSpeed] = useState(0.01);

  return (
    <div className="App">
      <div id="three">
        <ThreeTest xSpeed={xSpeed} ySpeed={ySpeed}></ThreeTest>
      </div>
      <div id="overlay">
        <div id="control">
          Rotation x<input id="xSpeed"></input>
          Rotation y<input id="ySpeed"></input>
          <button
            id="clickme"
            onClick={() => {
              setXSpeed(document.getElementById("xSpeed").value);
              setYSpeed(document.getElementById("ySpeed").value);
            }}
          >
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
