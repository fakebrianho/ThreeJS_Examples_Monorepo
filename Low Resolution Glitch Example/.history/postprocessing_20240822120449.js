import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'

export function postprocessing(scene, camera, renderer) {
	const composer = new EffectComposer(renderer)
	composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	composer.setSize(window.innerWidth, window.innerHeight)

	const renderPass = new RenderPass(scene, camera)
	composer.addPass(renderPass)

	//the bigger the number the more 'blocky' the glitches will be
	const glitchPass = new GlitchPass(18)
	composer.addPass(glitchPass)

	const afterPass = new AfterimagePass()
	afterPass.uniforms.damp.value = 0.899
	afterPass.damp = 0
	composer.addPass(afterPass)

	const outputPass = new OutputPass()
	composer.addPass(outputPass)
	return { composer: composer }
}
