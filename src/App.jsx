import { useState, useEffect, useRef } from "react";
import "./App.css";
import "aframe";
import "./three/three.js";
import testOutput from "./assets/testOutput.json"

// Run on Ipad
// npm run dev -- --host 0.0.0.0

function App() {
  const [isReady, setIsReady] = useState(false);
  const modelRef = useRef();

  // Part State
  const [testRotation, setTestRotation] = useState(0);
  const [testPosition, setTestPosition] = useState(0);

  const [testRotationX, setTestRotationX] = useState(0);
  const [testRotationY, setTestRotationY] = useState(0);
  const [testRotationZ, setTestRotationZ] = useState(0); 
  // End

  // Test Rotation
  useEffect(() => {
    if (isReady) {
      // Use Blender to check the name and path
      const model = modelRef.current;
      // Initialize Bone
      var head =
        model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
          ?.children[0]?.children[0]?.children[0];
      var spine = model?.children[0]?.children[0]?.children[0]?.children[0];
      var leftArm =
        model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
          ?.children[0]?.children[1]?.children[0];
      var leftForeArm =
        model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
          ?.children[0]?.children[1]?.children[0]?.children[0];
      var rightArm =
        model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
          ?.children[0]?.children[2]?.children[0];
      var rightForeArm =
        model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
          ?.children[0]?.children[2]?.children[0]?.children[0];
      var leftUpLeg = model?.children[0]?.children[0]?.children[0]?.children[1];
      var leftLeg =
        model?.children[0]?.children[0]?.children[0]?.children[1]?.children[0];
      var rightUpLeg =
        model?.children[0]?.children[0]?.children[0]?.children[2];
      var rightLeg =
        model?.children[0]?.children[0]?.children[0]?.children[2]?.children[0];
      var hips = model?.children[0]?.children[0]?.children[0];

      // rotation_movement(rightLeg, testRotation, testRotation, testRotation);
      // rotation_movement(leftArm, 0,0,0);
      // rotation_movement(leftForeArm, testPosition,-45,90);
      // rotation_movement(rightArm,45,0,0);
      // rotation_movement(hips, 0, testRotation,0);
      // position_movement(model, 0, 0 , -testPosition);
      rotation_movement(head, testRotationX, testRotationY, testRotationZ);
    }
  }, [isReady, testRotation, testPosition, testRotationX, testRotationY, testRotationZ]);

  // Part Rotation Movement
  function rotation_movement(part, rx, ry, rz) {
    part.rotation.x = rx;
    part.rotation.y = ry;
    part.rotation.z = rz;
  }

  // Part Position Movement
  function position_movement(part, px, py, pz) {
    part.position.x = px;
    part.position.y = py;
    part.position.z = pz;
  }


  //Timer for 360 degree rotation
  useEffect(() => {
    var degree = 0;
    const interval = setInterval(() => {
      if (degree === 360) {
        clearInterval(interval);
      }
      // Test Counter (Increase degree)
      setTestRotation(degreetoradian(degree));
      degree++;
      // End
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //Timer for move around and come back to the initial position
  useEffect(() => {
    var position = 0;
    var initial = true;
    const interval = setInterval(() => {
      if (initial === true){
        if (position === 180){
          initial = false;
        }
        // Test Counter (Increase degree)
        setTestPosition((degreetoradian(position)/5));
        position++;
        // End
      } else if (initial === false) {
        if (position === 0){
          clearInterval(interval)
        }
        // Test Counter (Increase degree)
        setTestPosition((degreetoradian(position)/5));
        position--;
        // End  
      }
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Test JSON OUTPUT
  useEffect(() => {
    var index = 0;
    const interval = setInterval(() => {
      setTestRotationX(testOutput[index].rot_x);
      setTestRotationY(testOutput[index].rot_y);
      setTestRotationZ(testOutput[index].rot_z);
      index++;
      if (index == obj.length()){
        clearInterval(interval)
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [testOutput]);

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

  // Convert Degree to Radian
  function degreetoradian(degree) {
    var radian = (degree * Math.PI) / 180;
    return radian;
  }

  return (
    <div className="App">
      <a-scene>
        <a-camera id="camera" position="0 1 2"></a-camera>
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
        <a-gltf-model
          id="room"
          src="#room_704"
          position="-3 0 0"
          // For Ipad to look at the model
          // camera="look-controls" 
        ></a-gltf-model>
        <a-gltf-model
          id="model"
          src="#mannequin"
          position="0 0 0"
        ></a-gltf-model>
        <a-sky color="lightblue"></a-sky>
      </a-scene>
    </div>
  );
}

export default App;
