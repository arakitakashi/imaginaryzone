/**
 * ARセッション管理
//  */
import * as THREE from 'three'
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js'

import Experience from './Experience.js'
import Player from './Player.js'

export default class ARSession
{
    constructor ()
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.renderer = this.experience.renderer

        this.player = new Player()
    }

    init ()
    {   
        this.renderer.instance.xr.enabled = true

        this.controller = this.renderer.instance.xr.getController(0)
        this.scene.add(this.controller)

        const button = ARButton.createButton(this.renderer.instance, { requiredFeatures: [ 'hit-test']})
        document.body.appendChild(button)
        
        this.player.init(this.controller)
    }

    _onSelect()
    {
        console.log('select')
    }

    update(delta)
    {

        this.renderer.instance.xr.getSession()
        this.player.update( delta )
    }
}