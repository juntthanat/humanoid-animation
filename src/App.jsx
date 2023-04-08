import { useState, useEffect, useRef } from "react";
import "./App.css";
import "aframe";
import "./three/three.js";
import { socket } from "./socket/socket";
// import testOutput from "./assets/testOutput.json";

// Run on Ipad
// npm run dev -- --host 0.0.0.0

// Adding Physic Tutorial
// AFRAME https://www.youtube.com/watch?v=SKYfYd3pk4I
// THREEJS https://threejs.org/docs/#examples/en/animations/MMDPhysics

function App() {
  const [isReady, setIsReady] = useState(false);
  const modelRef = useRef();

  // Check if Model is rendered
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      let model = document.getElementById("model").object3D;
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

  useEffect(() => {
    if (!isReady) return;
    // Use Blender to check the name and path
    const model = modelRef.current;
    let bone;
    // Initialize Bone
    let head =
      model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
        ?.children[0]?.children[0]?.children[0];
    let spine = model?.children[0]?.children[0]?.children[0]?.children[0];
    let leftArm =
      model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
        ?.children[0]?.children[1]?.children[0];
    let leftForeArm =
      model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
        ?.children[0]?.children[1]?.children[0]?.children[0];
    let rightArm =
      model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
        ?.children[0]?.children[2]?.children[0];
    let rightForeArm =
      model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
        ?.children[0]?.children[2]?.children[0]?.children[0];
    let leftUpLeg = model?.children[0]?.children[0]?.children[0]?.children[1];
    let leftLeg =
      model?.children[0]?.children[0]?.children[0]?.children[1]?.children[0];
    let rightUpLeg = model?.children[0]?.children[0]?.children[0]?.children[2];
    let rightLeg =
      model?.children[0]?.children[0]?.children[0]?.children[2]?.children[0];

    // socket.on("data", (data) => {
    socket.onmessage = (data) => {
      console.log(data.data);

      const json = JSON.parse(data.data)
      

      rotation_movement(head, json);
      // rotation_movement(spine, .);
      // rotation_movement(hips, .);
      rotation_movement(leftArm, json);
      rotation_movement(leftForeArm, json);
      rotation_movement(rightArm, json);
      rotation_movement(rightForeArm, json);
      rotation_movement(leftLeg, json);
      rotation_movement(leftUpLeg, json);
      rotation_movement(rightLeg, json);
      rotation_movement(rightUpLeg, json);
    };

    return () => {
      socket.off("data");
    };
  }, [isReady]);

  // Part Rotation Movement
  function rotation_movement(part, data) {
    part.rotation.x = data.rot_x;
    part.rotation.y = data.rot_y;
    part.rotation.z = data.rot_z;
  }

  // Part Position Movement
  function position_movement(part, px, py, pz) {
    part.position.x = px;
    part.position.y = py;
    part.position.z = pz;
  }

  // Convert Degree to Radian
  function degreetoradian(degree) {
    let radian = (degree * Math.PI) / 180;
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
