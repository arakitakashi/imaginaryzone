/**
 * Whale（クジラ）インスタンス
 */

import * as THREE from 'three'

import Experience from './Experience.js'

export default class Whale
{
    constructor ()
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    add (controller)
    {
        this.gltf = this.resources.items.whaleModel
        const albedoTexture = this.resources.items.whaleAlbedo
        const aoTexture = this.resources.items.whaleAO
        const normalTexture = this.resources.items.whaleNormal

        albedoTexture.flipY = false
        normalTexture.flipY = false
        aoTexture.flipY = false

        this.gltf.scene.traverse((child) =>
        {
            if(child.name === 'Whale')
            {
                // child.material = new THREE.MeshPhongMaterial({ map: albedoTexture, normalMap: normalTexture, aoMap: aoTexture})
                child.material = new THREE.MeshBasicMaterial({ map: normalTexture})
                // child.material.normalScale.set(1, 1)
                // child.material.aoMapIntensity = 0.4
                // child.material = new THREE.MeshPhongMaterial({ map: albedoTexture})
                // child.receiveShadow = true
                // child.castShadow = true
            }
        })
        this.gltf.scene.position.set(0, 5, 0).applyMatrix4(controller.matrixWorld)
        this.scene.add(this.gltf.scene)
    }

    setAnimation()
    {
        const scene = this.gltf.scene

        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.gltf.scene)
        this.clips = this.gltf.animations

        this.swimAction = THREE.AnimationClip.findByName(this.clips, 'Swim_Whale')
        this.rollingAction = THREE.AnimationClip.findByName(this.clips, 'Rolling_Whale')
        this.animation.swim = this.animation.mixer.clipAction(this.swimAction)
        this.animation.rolling = this.animation.mixer.clipAction(this.rollingAction)
        // this.animation.rolling.play()
        this.animation.rolling.play()
    }

    update(delta)
    {   
        this.animation.mixer.update( delta * 0.001 )
    }
}