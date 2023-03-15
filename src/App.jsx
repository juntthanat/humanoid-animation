import { useState} from "react";
import "./App.css";
import Three_animation from "./three/three_animation";

function App() {
  const [xSpeed, setXSpeed] = useState(0);
  const [ySpeed, setYSpeed] = useState(0);
  const [zSpeed, setZSpeed] = useState(0);
  const [handleAngle, setHandleAngle] = useState(90);

  function changeSpeed(){
    setXSpeed(document.getElementById("xSpeed").value);
    setYSpeed(document.getElementById("ySpeed").value);
    setZSpeed(document.getElementById("zSpeed").value);
  }

  function changeHandle(){
    setHandleAngle(document.getElementById("handleAngle").value);
  }

  return (
    <div className="App">
      <div id="three">
        <Three_animation xSpeed={xSpeed} ySpeed={ySpeed} zSpeed={zSpeed} handleAngle={handleAngle}></Three_animation>
      </div>
      <div id="overlay">
        <div id="control">
          Rotation x {xSpeed * 1000}<input id="xSpeed" type="range" min="0" max={0.1} step={0.001} onChange={changeSpeed}></input>
          Rotation y {ySpeed * 1000}<input id="ySpeed" type="range" min="0" max={0.1} step={0.001} onChange={changeSpeed} ></input>
          Rotation z {zSpeed * 1000}<input id="zSpeed" type="range" min="0" max={0.1} step={0.001} onChange={changeSpeed} ></input>
          Handle Angle {(Number(handleAngle) + 2) * 45}<input id="handleAngle" type="range" min={-2} max={2} step={0.1} onChange={changeHandle} ></input>
        </div>
      </div>
    </div>
  );
}

export default App;
