import { useState, useEffect, useRef } from "react";
import "./App.css";
import "aframe";
import "../three/three.js";
// import { socket } from "../socket/socket";
import { startWebSocket, closeWebsocket } from "../socket/socket";
// import testOutput from "./assets/testOutput.json";

// Run on Ipad
// npm run dev -- --host 0.0.0.0

// Adding Physic Tutorial
// AFRAME https://www.youtube.com/watch?v=SKYfYd3pk4I
// THREEJS https://threejs.org/docs/#examples/en/animations/MMDPhysics

function App() {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState({});
  const [index, setIndex] = useState(0);
  let modelRef = useRef();

  const socketRef = useRef();

  const [head, setHead] = useState();
  const [leftArm, setLeftArm] = useState();
  const [leftForeArm, setLeftForeArm] = useState();
  const [rightArm, setRightArm] = useState();
  const [rightForeArm, setRightForeArm] = useState();
  const [leftLeg, setLeftLeg] = useState();
  const [leftUpLeg, setLeftUpLeg] = useState();
  const [rightLeg, setRightLeg] = useState();
  const [rightUpLeg, setRightUpLeg] = useState();

  const [body, setBody] = useState();

  // Check if Model is rendered
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      let model = document.getElementById("model").object3D;
      // let model = _model.object3D;
      // console.log(model)
      if (model) {
        clearInterval(interval);
        setHead(
          model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
            ?.children[0]?.children[0]?.children[0]
        );
        setLeftArm(
          model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
            ?.children[0]?.children[1]?.children[0]
        );
        setLeftForeArm(
          model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
            ?.children[0]?.children[1]?.children[0]?.children[0]
        );
        setRightArm(
          model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
            ?.children[0]?.children[2]?.children[0]
        );
        setRightForeArm(
          model?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
            ?.children[0]?.children[2]?.children[0]?.children[0]
        );
        setLeftUpLeg(model?.children[0]?.children[0]?.children[0]?.children[1]);
        setLeftLeg(
          model?.children[0]?.children[0]?.children[0]?.children[1]?.children[0]
        );
        setRightUpLeg(
          model?.children[0]?.children[0]?.children[0]?.children[2]
        );
        setRightLeg(
          model?.children[0]?.children[0]?.children[0]?.children[2]?.children[0]
        );
        setBody(model?.children[0]?.children[0]?.children[0]);
        modelRef.current = model;
        console.log("init");
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

    // const initialJson =
    //   '{ "source": "NODEMCU", "frequency": 1, "acc_x":0, "acc_y":0, "acc_z":0, "rot_x":0, "rot_y":0, "rot_z":0 }';
    // let currentData = JSON.parse(initialJson);

    // Use Blender to check the name and path
    // Initialize Bone
    // setHead(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[0]
    //     ?.children[0]?.children[0]?.children[0]?.children[0]
    // );
    // setSpine(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[0]
    // );
    // setLeftArm(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[0]
    //     ?.children[0]?.children[0]?.children[1]?.children[0]
    // );
    // setLeftForeArm(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[0]
    //     ?.children[0]?.children[0]?.children[1]?.children[0]?.children[0]
    // );
    // setRightArm(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[0]
    //     ?.children[0]?.children[0]?.children[2]?.children[0]
    // );
    // setRightForeArm(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[0]
    //     ?.children[0]?.children[0]?.children[2]?.children[0]?.children[0]
    // );
    // setLeftUpLeg(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[1]
    // );
    // setLeftLeg(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[1]
    //     ?.children[0]
    // );
    // setRightUpLeg(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[2]
    // );
    // setRightLeg(
    //   modelRef.current?.children[0]?.children[0]?.children[0]?.children[2]
    //     ?.children[0]
    // );

    socketRef.current = startWebSocket();
    // socket.current = new WebSocket("wss://testsocket.danceoftaihou.live");

    socketRef.current.onmessage = (data) => {
      const json = JSON.parse(data.data);
      setData(json);

      // rotation_movement(rightArm, json)
      // rotation_movement(body, json)

      // Rotationing
      // console.log(json.source);
      switch (json.source) {
        case "HEAD":
          rotation_movement(head, json)
          break;
        case "BODY":
          break;
        case "ARM-R":
          rotation_movement(rightArm, json)
          reverse_rotation(rightForeArm, json)
          break;
        case "FOREARM-R":
          rotation_movement(rightForeArm,json)
          break;
        case "ARM-L":
          rotation_movement(leftArm, json)
          reverse_rotation(leftForeArm, json)
          // console.log(leftArm.rotation.x)
          break;
        case "FOREARM-L":
          rotation_movement(leftForeArm, json)
          // console.log(leftForeArm.rotation.x)
          break;
        case "THICC-R":
          reverse_rotation(rightUpLeg, json)
          rotation_movement(rightLeg, json)
          break;
        case "LEG-R":
          rotation_movement(rightLeg, json)
          break;
        case "THICC-L":
          reverse_rotation(leftUpLeg,json)
          rotation_movement(leftLeg,json)
          break;
        case "LEG-L":
          rotation_movement(leftLeg,json)
          break;
        case "2000": //Positioning
          position_movement(body, json)
          break;
      }      
    };

    return () => {
      closeWebsocket(socketRef.current);
    };
  }, [isReady]);

  // Part Rotation Movement
  function rotation_movement(part, data) {
    // let changeX = 0;
    // let changeY = 0;
    // let changeZ = 0;
    // let interval;
    // let index = 0;
    // if (data.rot_x != 0) {
    //   changeX = data.rot_x / 5;
    // }
    // if (data.rot_y != 0) {
    //   changeY = data.rot_y / 5;
    // }
    // if (data.rot_z != 0) {
    //   changeZ = data.rot_z / 5;
    // }
    // interval = setInterval(() => {
      // part.rotation.x += changeX;
      // part.rotation.y += changeY;
      // part.rotation.z += changeZ;

    //   if (index == 5) {
    //     clearInterval(interval);
    //   }
    //   index++;
    // }, 20);

    // return () => {
    //   clearInterval(interval);
  // };
    if(data.rot_x > 0.1 || data.rot_x < -0.1){
      part.rotation.x += data.rot_x/data.frequency;
    }
    if(data.rot_y > 0.1 || data.rot_y < -0.1){
      part.rotation.y += data.rot_y/data.frequency;
    }
    if(data.rot_z > 0.1 || data.rot_z < -0.1){
      part.rotation.z += data.rot_z/data.frequency;
    }
    console.log(data.rot_x)
    console.log(data.rot_y)
    console.log(data.rot_z)
  }

  function reverse_rotation(part, data){
    if(data.rot_x > 0.1 || data.rot_x < -0.1){
      part.rotation.x -= data.rot_x/data.frequency;
    }
    if(data.rot_y > 0.1 || data.rot_y < -0.1){
      part.rotation.y -= data.rot_y/data.frequency;
    }
    if(data.rot_z > 0.1 || data.rot_z < -0.1){
      part.rotation.z -= data.rot_z/data.frequency;
    }
  }

  // Part Position Movement
  function position_movement(part, data) {
    // X = 9m, Z = 10.5m
    part.position.x = data.x;
    // part.position.y = data.rot_y;
    part.position.z = -data.y;
  }

  // Convert Degree to Radian
  function degreetoradian(degree) {
    let radian = (degree * Math.PI) / 180;
    return radian;
  }

  // const modelList = ["male", "female"];

  // async function changeAvatar() {
  //   setIsReady(false);
  //   setIndex((index + 1) % modelList.length);
  //   console.log(modelRef.current);
  //   modelRef.current.removeAttribute("gltf-model");
  //   modelRef.current.setAttribute("gltf-model", `#${modelList[index]}`);
  //   // let newModel = document.getElementById("model").object3D;
  //   // modelRef.current = newModel;
  //   await delay(1000);
  //   setIsReady(true);
  // }

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
              id="female"
            ></a-asset-item>
            <a-asset-item
              src="src\assets\mannequin_male.glb"
              id="male"
            ></a-asset-item>
          </a-assets>
          <a-gltf-model
            id="room"
            src="#room_704"
            position="0 0 0"
            // For Ipad to look at the model
            // camera="look-controls"
          ></a-gltf-model>
          <a-gltf-model
            id="model"
            src="#female"
            position="0 0 0"
            // x = 9, z = 10
          ></a-gltf-model>
          <a-sky color="lightblue"></a-sky>
        </a-scene>
      </div>
      <div id="overlay">
        Rotation 
        <div className="indicator-container">
          <div className="indicator">X = {data.rot_x}</div>
          <div className="indicator">Y = {data.rot_y}</div>
          <div className="indicator">Z = {data.rot_z}</div>
        </div>
        Position
        <div className="indicator-container">
          <div className="indicator">X = {data.x}</div>
          <div className="indicator">Y = {data.y}</div>
          {/* <div className="indicator">Z = {data.rot_z}</div> */}
        </div>
        {/* <button onClick={changeAvatar}>click me</button> */}
      </div>
    </div>
  );
}

export default App;
