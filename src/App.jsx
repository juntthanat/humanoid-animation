import { useState, useEffect} from "react";
import "./App.css";
import "aframe"
import "./three/three.js";

function App() {
  const [rotationX, setRotationX] = useState(0);
  // useEffect(()=> {
  //   var scene = document.querySelector("a-scene").object3D;
  //   var room = document.getElementById("room").object3D;
  //   var model = document.getElementById("model").object3D;
  //   model.position.x = 3;
  //   model.rotation.x = degreetoradian(0);
  //   console.log(model.children[0]);
  //   console.log(model.children[0].children[0]);
  //   console.log(model);

  //   model.traverse(node => {
  //     if (node.isBone) {
  //         console.log(node.material) 
  //     }
  //   });
    
  // }, []);

// Test Model Movement
  
  useEffect(()=>{
    let exit = false;
    var model = document.getElementById("model").object3D;

    model.rotation.x = degreetoradian(rotationX);
  },[rotationX]);

  
// Counter
  async function counter() {
    for (var degree = 0; degree < 360; degree++){
      await timer(25);
      setRotationX(degree);
    }
  }
  
  useEffect(()=>{
    counter();
  },[])

// Delay Timer
  const timer = ms => new Promise(res => setTimeout(res, ms))

// Convert Degree to Radian
  function degreetoradian(degree){
    var radian = degree * Math.PI/180;
    return radian;
  }
  
  return (
    <div className="App">
      <a-scene>
        <a-camera id="camera" position="0 0 0"></a-camera>
        <a-entity id="mouseCursor" cursor="rayOrigin: mouse" raycaster="objects: [data-raycastable]"></a-entity>
        <a-assets>
          <a-asset-item src="src\assets\room_704.gltf" id="room_704"></a-asset-item>
          <a-asset-item src="src\assets\mannequin_female.gltf" id="mannequin"></a-asset-item>
        </a-assets>
        <a-gltf-model id="room" src="#room_704"></a-gltf-model>
        <a-gltf-model id="model" src="#mannequin" position="3 0 0"></a-gltf-model>

      </a-scene>
    </div>
  );
}

export default App;
