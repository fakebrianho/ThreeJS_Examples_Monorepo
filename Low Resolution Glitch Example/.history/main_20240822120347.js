import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMesh, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import Model from './Model'
import { postprocessing } from './postprocessing'

const scene = new THREE.Scene()

//Turn Anti-Aliasing off
const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
camera.position.set(0, 0, 5)

//Globals
const meshes = {}
const lights = {}
const clock = new THREE.Clock()
const composer = postprocessing(scene, camera, renderer)
init()
function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	//The lower we move the pixel ratio the more pixelated the image will be
	// you can use js function to change the pixel ratio on the fly
	renderer.setPixelRatio(0.2)
	document.body.appendChild(renderer.domElement)

	//meshes
	meshes.default = addBoilerPlateMesh()
	meshes.standard = addStandardMesh()

	//lights
	lights.defaultLight = addLight()

	//changes
	meshes.default.scale.set(2, 2, 2)

	//scene operations
	scene.add(meshes.default)
	scene.add(meshes.standard)
	scene.add(lights.defaultLight)

	addModel()
	resize()
	animate()
}

function addModel() {
	const model = new Model({
		name: 'flower',
		meshes: meshes,
		scene: scene,
		url: 'flowers.glb',
		scale: new THREE.Vector3(4.5, 4.5, 4.5),
		position: new THREE.Vector3(0, -1.5, 1.5),
		replace: true,
	})
	model.init()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	const delta = clock.getDelta()

	meshes.default.rotation.x += 0.01
	meshes.default.rotation.z += 0.01

	meshes.standard.rotation.x += 0.01
	meshes.standard.rotation.z += 0.01

	if (meshes.flower) {
		meshes.flower.rotation.y += 0.01
	}

	// renderer.render(scene, camera)
	composer.composer.render()
}