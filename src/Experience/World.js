import * as THREE from 'three'
import Experience from './Experience.js'
import ARSession from './ARSession.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {   
                this.setARSession()
                this.setLights()
                // this.setGround()
            }
        })
    }

    setARSession()
    {
        this.ARSession = new ARSession()
        this.ARSession.init()
    }

    setLights()
    {
        const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.7)
        const helper = new THREE.DirectionalLightHelper( directionalLight, 5)
        directionalLight.position.set(5, 10, -5)
        directionalLight.castShadow = true
        this.scene.add(directionalLight)
        this.scene.add(helper)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7)
        directionalLight2.position.set(2, -2, -2)
        this.scene.add(directionalLight2)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        this.scene.add(ambientLight)

        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
        light.position.set( 0.5, 1, 0.25 );
        this.scene.add( light );
    }

    setGround()
    {
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 1), new THREE.MeshPhongMaterial({color: new THREE.Color(0xffffff)}))
        ground.rotation.set(-Math.PI / 2, 0, 0)
        ground.receiveShadow = true

        this.scene.add(ground)    
    }

    resize()
    {
    }

    update(delta)
    {   
        if(this.ARSession)
        {
            this.ARSession.update(delta)
        }
    }

    destroy()
    {
    }
}