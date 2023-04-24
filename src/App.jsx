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
  const [data,setData] = useState({})
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
    
    const initialJson = '{ "source": "NODEMCU", "frequency": 1, "acc_x":0, "acc_y":0, "acc_z":0, "rot_x":0, "rot_y":0, "rot_z":0 }'
    let currentData = JSON.parse(initialJson);
    
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

    socket.onmessage = (data) => {
      const json = JSON.parse(data.data);
      setData(json)
      const newData = JSON.parse(data.data)

      // console.log(json);

      // rotation_movement(head, newData, currentData);
      // rotation_movement(spine, newData, currentData);
      // rotation_movement(hips, newData, currentData);
      // rotation_movement(leftArm, newData, currentData);
      rotation_movement(leftForeArm, newData, currentData);
      rotation_movement(rightArm, newData, currentData);
      // rotation_movement(rightForeArm, newData, currentData);
      // rotation_movement(leftLeg, newData, currentData);
      // rotation_movement(leftUpLeg, newData, currentData);
      // rotation_movement(rightLeg, newData, currentData);
      // rotation_movement(rightUpLeg, newData, currentData);

      // // rotation_movement(head, json);
      // // rotation_movement(spine, json);
      // // rotation_movement(hips, json);
      // // rotation_movement(leftArm, json);
      // rotation_movement(leftForeArm, json);
      // rotation_movement(rightArm, json);
      // // rotation_movement(rightForeArm, json);
      // // rotation_movement(leftLeg, json);
      // // rotation_movement(leftUpLeg, json);
      // // rotation_movement(rightLeg, json);
      // // rotation_movement(rightUpLeg, json);

      currentData = newData;
    };

    return () => {
      socket.close();
    };
  }, [isReady]);

  // Part Rotation Movement
  // function rotation_movement(part, newData, currentData) {
  //   let interval;
  //   let index = 0;
  //   let differentX = newData.rot_x - currentData.rot_x;
  //   let differentY = newData.rot_y - currentData.rot_y;
  //   let differentZ = newData.rot_z - currentData.rot_z;
  //   let partialDataX = 0;
  //   let partialDataY = 0;
  //   let partialDataZ = 0;
  //   if(differentX != 0){
  //     partialDataX = differentX/10;
  //   }
  //   if(differentY != 0){
  //     partialDataY= differentY/10;
  //   }
  //   if(differentZ != 0){
  //     partialDataZ = differentZ/10;
  //   }

  
  //   interval = setInterval(() => {
  //     part.rotation.x = currentData.rot_x + partialDataX*index;
  //     part.rotation.y = currentData.rot_y + partialDataY*index;
  //     part.rotation.z = currentData.rot_z + partialDataZ*index;
  //     if (index == 10) {
  //       clearInterval(interval);
  //     }
  //     index++;
  //   }, 20);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }

  function rotation_movement(part, data){
  let changeX = 0;
  let changeY = 0;
  let changeZ = 0;
  let interval;
  let index = 0;
  if (data.rot_x != 0){
    changeX = data.rot_x/5;
  }
  if (data.rot_y != 0){
    changeY = data.rot_y/5;
  }
  if (data.rot_z != 0){
    changeZ = data.rot_z/5;
  }
    interval = setInterval(() => {
    part.rotation.x += changeX;
    part.rotation.y += changeY;
    part.rotation.z += changeZ;
    if (index == 5) {
        clearInterval(interval);
      }
      index++;
    }, 20);

    return () => {
      clearInterval(interval);
    };
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
      <div>
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
      <div id="overlay">
        <div className="indicator">X = {data.rot_x}</div>
        <div className="indicator">Y = {data.rot_y}</div>
        <div className="indicator">Z = {data.rot_z}</div>
      </div>
    </div>
  );
}

export default App;
