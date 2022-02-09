/**
 * プレイヤー操作画面
 */
import * as THREE from 'three'

import Experience from './Experience.js'
import Whale from './Whale.js'
import Triceratops from './Triceratops.js'

export default class Player
{
    constructor()
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        console.log(this.scene)
    }

    init(controller)
    {
        this.whale = new Whale()
        this.whale.add(controller)
        this.whale.setAnimation()

        this.triceratops = new Triceratops()
        this.triceratops.add(controller)
        this.triceratops.setAnimation()

        controller.addEventListener('select', () => this._onSelect(controller))
    }

    _onSelect(controller)
    {
        const geometry = new THREE.CylinderGeometry( 0, 0.05, 0.2, 32 ).rotateX( Math.PI / 2 )
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } )
        const mesh = new THREE.Mesh( geometry, material )
        mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld )
        mesh.quaternion.setFromRotationMatrix( controller.matrixWorld )
        this.scene.add( mesh )
    }

    update(delta)
    {
        this.whale.update(delta)
        this.triceratops.update(delta)
    }
}