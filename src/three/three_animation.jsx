import { useEffect, useState } from "react";
import "./three.js";
import {GUI} from 'dat.gui'

export default function three_animation({ xSpeed, ySpeed }) {
  useEffect(() => {
    let exit = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("three_animation").replaceChildren(renderer.domElement);

    var geometry = new THREE.BoxGeometry(2, 1, 2);
    var material = new THREE.MeshStandardMaterial();
    var base = new THREE.Mesh(geometry, material);
    scene.add(base);

    camera.position.z = 5;
    camera.position.x = 5;
    camera.position.y = 5;
    camera.lookAt(0,1.5,0);


    var shoulder = new THREE.Object3D();
    shoulder.translateY(0.5);
    base.add(shoulder);

    geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
    var lowerArm = new THREE.Mesh(geometry, material);
    lowerArm.translateY(1);
    shoulder.add(lowerArm);

    geometry = new THREE.SphereGeometry(0.6,20,20); // (radius, width segment, height segment)
    var handle = new THREE.Mesh(geometry, material);
    handle.translateY(1);
    lowerArm.add(handle);

    var light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(10,5,10);
    light.target = base;
    scene.add(light);

    var alight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(alight);

    function animate() {
      if (exit === true) return;
      requestAnimationFrame(animate);

      base.rotation.x += Number(xSpeed);
      base.rotation.y += Number(ySpeed);

      shoulder.rotation.x += 0.01

      renderer.render(scene, camera);
    }
    animate();
    return () => {
      exit = true;
    }
  }, [xSpeed, ySpeed]);

  return <div id="three_animation"></div>;
}
