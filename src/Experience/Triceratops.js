/**
 * Triceratops（トリケラトプス）インスタンス
 */

 import * as THREE from 'three'

 import Experience from './Experience.js'
 
 export default class Triceratops
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
         this.gltf = this.resources.items.triceratopsModel
         const albedoTexture = this.resources.items.triceratopsAlbedo
         const aoTexture = this.resources.items.triceratopsAO
         const normalTexture = this.resources.items.triceratopsNormal
 
         albedoTexture.flipY = false
         normalTexture.flipY = false
         aoTexture.flipY = false
 
         this.gltf.scene.traverse((child) =>
         {
             if(child.name === 'Triceratops')
             {
                 child.material = new THREE.MeshPhongMaterial({ map: albedoTexture, normalMap: normalTexture, aoMap: aoTexture})
                 // child.material = new THREE.MeshBasicMaterial({ map: normalTexture})
                 child.material.normalScale.set(0.8, 0.8)
                 child.material.aoMapIntensity = 0.4
                 child.material.shininess = 20
                 // child.material = new THREE.MeshPhongMaterial({ map: albedoTexture})
                //  child.receiveShadow = true
                //  child.castShadow = true
             }
         })
        //  this.gltf.scene.position.set(0, -0.22, 0)
         this.gltf.scene.position.set(0, -0.22, 0).applyMatrix4(controller.matrixWorld)
        
         this.scene.add(this.gltf.scene)
     }
 
     setAnimation()
     {
         const scene = this.gltf.scene
 
         this.animation = {}
         this.animation.mixer = new THREE.AnimationMixer(this.gltf.scene)
         this.clips = this.gltf.animations
 
         this.roarAction = THREE.AnimationClip.findByName(this.clips, 'roar')
         this.runAction = THREE.AnimationClip.findByName(this.clips, 'run')
         this.walkAction = THREE.AnimationClip.findByName(this.clips, 'walk')
         this.animation.roar = this.animation.mixer.clipAction(this.roarAction)
         this.animation.run = this.animation.mixer.clipAction(this.runAction)
         this.animation.walk = this.animation.mixer.clipAction(this.walkAction)
         // this.animation.rolling.play()
         this.animation.run.play()
     }
 
     update(delta)
     {   
         this.animation.mixer.update( delta * 0.005 )
     }
 }