import { useState, useEffect, useRef } from "react";
import "./App.css";
import "aframe";
import "../three/three.js";
import { startWebSocket, closeWebsocket } from "../socket/socket";

// Run on Ipad
// npm run dev -- --host 0.0.0.0

function App() {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState({});

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

    socketRef.current = startWebSocket();

    socketRef.current.onmessage = (data) => {
      const json = JSON.parse(data.data);
      setData(json);

      console.log(json)

      switch (json.source) {
        case "HEAD":
          rotation_movement(head, json)
          break;
        // case "BODY":
        //   body_movement(body,json)
        //   body_reverse_movement_arm(rightArm,json)
        //   body_reverse_movement_arm(rightForeArm,json)
        //   body_reverse_movement_arm(leftArm,json)
        //   body_reverse_movement_arm(leftForeArm,json)
        //   body_reverse_movement_upleg(rightUpLeg, json)
        //   body_reverse_movement_leg(rightLeg, json)
        //   body_reverse_movement_upleg(leftUpLeg, json)
        //   body_reverse_movement_leg(leftLeg, json)
        //   break;
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
          break;
        case "FOREARM-L":
          rotation_movement(leftForeArm, json)
          break;
        case "THICC-R":
          rotation_movement(rightUpLeg, json)
          rotation_movement(rightLeg, json)
          break;
        case "LEG-R":
          reverse_rotation(rightLeg, json)
          break;
        case "THICC-L":
          rotation_movement(leftUpLeg,json)
          rotation_movement(leftLeg,json)
          break;
        case "LEG-L":
          reverse_rotation(leftLeg,json)
          break;
        case "2000":
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
    if(data.rot_x > 0.1 || data.rot_x < -0.1){
      part.rotation.x += data.rot_x/data.frequency;
    }
    if(data.rot_y > 0.1 || data.rot_y < -0.1){
      part.rotation.y += data.rot_y/data.frequency;
    }
    if(data.rot_z > 0.1 || data.rot_z < -0.1){
      part.rotation.z += data.rot_z/data.frequency;
    }
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
  
  // function body_movement(part, data){
  //     part.rotation.y += data.rot_y/data.frequency;
  // }

  // function body_reverse_movement_arm(part, data){
  //     part.rotation.z += data.rot_z/data.frequency;
  // }

  // function body_reverse_movement_upleg(part, data){
  //     part.rotation.y -= data.rot_y/data.frequency;
  // }
  // function body_reverse_movement_leg(part, data){
  //   part.rotation.y += data.rot_y/data.frequency;
  // }

  // Part Position Movement
  function position_movement(part, data) {
    // X = 9m, Z = 10.5m
    part.position.x = data.x;
    part.position.z = -data.y;
  }


  return (
    <div className="App">
      <div>
        <a-scene vr-mode-ui="enabled: true">
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
          ></a-gltf-model>
          <a-gltf-model
            id="model"
            src="#female"
            position="0 0 0"
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
        </div>
      </div>
    </div>
  );
}

export default App;
