import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import "aframe";
import "./three/three.js";

function App() {
  const [rotationX, setRotationX] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const modelRef = useRef();

  // Run on Ipad
  // npm run dev -- --host 0.0.0.0

  // Test Rotation
  useEffect(() => {
    if (isReady) {
      // Use Blender to check the name and path
      const model = modelRef.current;
      var leftArm = model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.children[0];
      leftArm.rotation.y = degreetoradian(rotationX);
    }
  }, [isReady, rotationX]);

  // Check if Model is rendered
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      var model = document.getElementById("model").object3D;
      if (model) {
        clearInterval(interval);
        modelRef.current = model;
        setIsReady(true);
      }
    }, 1000);

    return () => {
      setIsReady(false);
      clearInterval(interval);
    };
  }, []);

  //Timer
  useEffect(() => {
    var degree = 0;
    const interval = setInterval(() => {
      if (degree === 360) {
        clearInterval(interval);
      }
      // Test Counter (Increase degree)
      setRotationX(degree);
      console.log(degree);
      degree++;
      // End
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Convert Degree to Radian
  function degreetoradian(degree) {
    var radian = (degree * Math.PI) / 180;
    return radian;
  }

  return (
    <div className="App">
      <a-scene>
        <a-camera id="camera" position="0 0 0"></a-camera>
        <a-entity
          id="mouseCursor"
          cursor="rayOrigin: mouse"
          raycaster="objects: [data-raycastable]"
        ></a-entity>
        <a-assets>
          <a-asset-item
            src="src\assets\room_704.gltf"
            id="room_704"
          ></a-asset-item>
          <a-asset-item
            src="src\assets\mannequin_female.gltf"
            id="mannequin"
          ></a-asset-item>
        </a-assets>
        <a-gltf-model id="room" src="#room_704"></a-gltf-model>
        <a-gltf-model
          id="model"
          src="#mannequin"
          position="3 0 0"
        ></a-gltf-model>
      </a-scene>
    </div>
  );
}

export default App;
