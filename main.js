import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  2000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
document.body.appendChild(renderer.domElement);

var group = new THREE.Group();

const earthTexture = new THREE.TextureLoader().load("/2k_earth.jpg");
const moonTexture = new THREE.TextureLoader().load("/2k_moon.jpg");
const sunTexture = new THREE.TextureLoader().load("/8k_sun.jpg");

const geometry = new THREE.SphereGeometry(15, 100, 100);
const material = new THREE.MeshStandardMaterial({
  map: earthTexture,
  fog: true,
  depthTest: true,
  depthWrite: true,
  visible: true,
  side: THREE.FrontSide,
  opacity: 1,
  color: 0xffffff,
});
const cube = new THREE.Mesh(geometry, material);
group.add(cube);

const geometry2 = new THREE.SphereGeometry(3, 100, 100);
const material2 = new THREE.MeshStandardMaterial({
  map: moonTexture,
  fog: true,
  depthTest: true,
  depthWrite: true,
  visible: true,
  side: THREE.FrontSide,
  opacity: 1,
  color: 0xffffff,
});
const moon = new THREE.Mesh(geometry2, material2);

group.add(moon);

const geometry3 = new THREE.SphereGeometry(150, 100, 100);
const material3 = new THREE.MeshBasicMaterial({
  map: sunTexture,
  fog: true,
  transparent: true,
  opacity: 0.8,
});
const sun = new THREE.Mesh(geometry3, material3);
group.add(sun);
sun.position.set(220, 120, 50);

scene.add(group);

const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(50, 50, 50);
// const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

camera.position.z = 100;

var off = 0;
var offz = 0;

function animate() {
  requestAnimationFrame(animate);

  off += 0.015;
  offz += 0.015;

  cube.rotation.x = -0.015;
  cube.rotation.y += 0.01;

  sun.rotation.x = 0.0005;
  sun.rotation.y += 0.0005;

  moon.rotation.y += 0.025;
  moon.position.set(
    30 * Math.sin(off),
    20 * Math.sin(off),
    50 * Math.sin(offz + 1000),
  );

  renderer.render(scene, camera);
}

animate();
