<template>
  <div ref="canvas" class="canvas"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvas = ref(null);

let camera, scene, renderer, earth;
let clock = new THREE.Clock();

onMounted(() => {
  init();
});

function init() {
  const container = canvas.value;

  camera = new THREE.PerspectiveCamera(
    10,
    canvas.value.clientWidth / canvas.value.clientHeight,
    0.25,
    1000
  );
  camera.position.set(100, 0, 0);

  scene = new THREE.Scene();

  let light = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(light);

  // model

  const loader = new GLTFLoader().setPath("/models/");
  loader.load("earth.glb", function (gltf) {
    earth = gltf.scene;
    scene.add(earth);

    camera.lookAt(
      new THREE.Vector3(
        earth.position.x,
        earth.position.y,
        earth.position.z + 7
      )
    );

    animate();
  });

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
  renderer.setClearColor(0xffffff, 0);

  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = canvas.value.clientWidth / canvas.value.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
}

function animate() {
  const dt = clock.getDelta();
  requestAnimationFrame(animate);

  earth.rotation.x -= dt * 0.2;
  earth.rotation.y -= dt * 0.2;
  earth.rotation.z -= dt * 0.2;

  renderer.render(scene, camera);
}
</script>

<style scoped>
/* .canvas {
  flex-grow: 1;
} */

/* @media (max-width: 760px) { */
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
}
/* } */
</style>
