import { useState, useEffect} from "react";
import "./App.css";
import "aframe"
// import Three_animation from "./three/three_animation";

function App() {
  // useEffect(() => {
  //   var lever = document.querySelector("#lever");
  //   var handle = true;
  //   lever.addEventListener('click', function(e){
  //     if (handle == true){
  //       lever.setAttribute('animation', {
  //         property: 'rotation',
  //         from: '45 0 90',
  //         to: {x, y, z},
  //         dur: '2500',
  //         pauseEvents: 'mouseleave',
  //         resumeEvents: 'mouseenter'
  //       })
  //       handle = false;
  //     } else {
  //       lever.setAttribute('animation', {
  //         property: 'rotation',
  //         from: '-45 0 90',
  //         to: '45 0 90',
  //         dur: '2500',
  //         pauseEvents: 'mouseleave',
  //         resumeEvents: 'mouseenter'
  //       })
  //       handle = true;
  //     }
      
  //   });
  // });

  var x = -45;
  var y = 0;
  var z = 90;



  return (
    <div className="App">

      <a-scene >
        <a-assets>
          <a-asset-item src="src\assets\room_704.gltf" id="room"></a-asset-item>
          <a-asset-item src="src\assets\mannequin_female.gltf" id="avatar"></a-asset-item>
        </a-assets>
        <a-gltf-model src="#room"></a-gltf-model>
        <a-gltf-model src="#avatar" position="3 0 0"></a-gltf-model>
      {/* <a-entity id="mouseCursor" cursor="rayOrigin: mouse"></a-entity>
      <a-entity light="type:directional; castShadow:true;" position="1 1 1"></a-entity>
        <a-entity 
          geometry="primitive:box; height:0.5; width:2; depth:2"
          material="color: grey;"
          position="0 0 0"
        >
        </a-entity>
        <a-entity 
          id="lever"
          geometry="primitive: cylinder; height: 0.5; thetaLength: 360; radius: 0.9" 
          position="0 0 0;" 
          material="color: lightgrey;"
          rotation="0 0 90;"
        >
          <a-entity 
          geometry="primitive:cylinder; radius: 0.2; height: 3;"
          material="color: lightgrey;"
          position="1.5 0 0"
          rotation="0 0 90"
          ></a-entity>
          <a-entity 
          position="3 0 0"
          material="color: tomato"
          geometry="primitive: sphere; radius: 0.5"
          animation__mouseenter="property: components.material.material.color; type: color; to: blue; startEvents: mouseenter; dur: 500"
          animation__mouseleave="property: components.material.material.color; type: color; to: red; startEvents: mouseleave; dur: 500"
          ></a-entity>
        </a-entity> */}
        
      </a-scene>
    </div>
  );
}

export default App;
