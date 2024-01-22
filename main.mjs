import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { Clock } from 'three'

// Resto de tu código


// Creacion del scene y renderizado 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creacion de un plano
const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


// creacion de controles en primera persona

const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

document.addEventListener('click', () => {
    controls.lock();
});

// Evento para actualizar la posicion del control
const clock = new Clock();
const updateControls = () => {

    const delta = clock.getDelta();
    
};

// creacion de una caja para representar al jugador

const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

// creacion de una luz ambiental
const ambientLigth = new THREE.AmbientLight(0x00ffff, 0.5);
scene.add(ambientLigth);
// creacion del cielo

const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide });
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// creacion de arboles

const createTree = (x, z) => {

    // tronco
    const trunkGeometry = new THREE.CylinderGeometry(1, 1, 5, 8);
    let cafe = 0x8B4513;
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: cafe });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

    //hojas

    const leavesGeometry = new THREE.ConeGeometry(4, 10, 8);
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = 8; //alinear con la parte superior del tronco

    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves);
    tree.position.set(x, 2.5, z);
    scene.add(tree);
}

//crear algunos arboles

createTree(-10, -10);
createTree(10, -5);

// crear piedras

const createStone = (x, z) => {
    const stoneGeometry = new THREE.SphereGeometry(1, 16, 16);
    const stoneMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    stone.position.set(x, 0.5, z);
    scene.add(stone);
}

// colocar algunas piedras
createStone(-5, 5);
createStone(8, -8);

// crear arbustos con frutos
const createBush = (x, z) => {
    const bushGeometry = new THREE.SphereGeometry(2, 16, 16);
    const bushMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const bush = new THREE.Mesh(bushGeometry, bushMaterial);
    bush.position.set(x, 1, z);
    scene.add(bush);

    //crear algunos frutos
    for (let i = 0; i < 5; i++) {
        const fruitGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const fruitMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
        const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);

        //posicion de los frutos
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.5 + 1.5; // Ajusta este valor según tus necesidades
        const offsetX = Math.cos(angle) * radius;
        const offsetZ = Math.sin(angle) * radius;
        fruit.position.set(x + offsetX, 2, z + offsetZ);
        scene.add(fruit);
    }
}

//colocar algunos arbustos con frutos

createBush(-11, 5);
createBush(22, -5)
// Creacion de cubo

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


camera.position.y = 1;
//render o loop

const animate = () => {
    requestAnimationFrame(animate);

    // actualizar controles
    updateControls();

    renderer.render(scene, camera);
};

if (WebGL.isWebGLAvailable()) {

    // Initiate function or  other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}