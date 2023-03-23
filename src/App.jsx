import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import "aframe";
import "./three/three.js";

  // Run on Ipad
  // npm run dev -- --host 0.0.0.0

function App() {
  const [isReady, setIsReady] = useState(false);
  const modelRef = useRef();
  
  // Part State
  const [rotationX, setRotationX] = useState(0);
  // End


  // Test Rotation
  useEffect(() => {
    if (isReady) {
      // Use Blender to check the name and path
      const model = modelRef.current;
      // Initialize Bone
      var head = model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0];
      var spine = model?.children[0]?.children[0]?.children[0]?.children[0];
      var leftArm = model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.children[0];
      var leftForeArm = model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.children[0]?.children[0];
      var rightArm = model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[2]?.children[0];
      var rightForeArm = model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[2]?.children[0]?.children[0];
      var leftUpLeg = model?.children[0]?.children[0]?.children[0]?.children[1];
      var leftLeg = model?.children[0]?.children[0]?.children[0]?.children[1].children[0];
      var rightUpLeg = model?.children[0]?.children[0]?.children[0]?.children[2];
      var rightLeg = model?.children[0]?.children[0]?.children[0]?.children[2].children[0];

      leftLeg.rotation.y = rotationX;
      rotation_movement(rightLeg, rotationX,rotationX,rotationX)
    }
  }, [isReady, rotationX]);

  // Part Rotation Movement
  function rotation_movement(part, rx,ry,rz){
    part.rotation.x = rx;
    part.rotation.y = ry;
    part.rotation.z = rz;
  }

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
      setRotationX(degreetoradian(degree));
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
        <a-camera id="camera" position="0 2 0"></a-camera>
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
