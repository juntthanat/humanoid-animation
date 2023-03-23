// import { useEffect } from "react";
// import "./three.js";
// import {createHandle} from "./object/handle"

// export default function three_animation() {
//   useEffect(() => {
//     let exit = false;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.getElementById("three_animation").replaceChildren(renderer.domElement);

//     var geometry = new THREE.BoxGeometry(2, 1, 2);
//     var material = new THREE.MeshStandardMaterial();
//     var base = new THREE.Mesh(geometry, material);
//     scene.add(base);

//     camera.position.z = 5;
//     camera.position.x = 5;
//     camera.position.y = 5;
//     camera.lookAt(0,1.5,0);

    
//     function animate() {
//       if (exit === true) return;
//       requestAnimationFrame(animate);

//       base.rotation.x += Number(xSpeed);
//       base.rotation.y += Number(ySpeed);
//       base.rotation.z += Number(zSpeed);

//       shoulder.rotation.x = Number(handleAngle);

//       window.THREE.Cache.clear() // Prevent Context Lost

//       renderer.render(scene, camera);
//     }
//     animate();
//     return () => {
//       exit = true;
//     }
//   }, []);

//   return <div id="three_animation"></div>;
// }
