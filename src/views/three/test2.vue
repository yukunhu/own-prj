<template>
    <div ref="container"></div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'three-test1',
  props: {
    scene: Object,
    camera: Object,
    renderer: Object
  },
  computed: {
    readyInfo () {
      return {
        scene: this.scene,
        camera: this.camera,
        renderer: this.renderer
      }
    }
  },
  data () {
    return {
      loaded: false,
      rotateX: 0,
      rotateY: 0,
      timer: null
    }
  },
  methods: {
    // 判断是否加载scene、camera、renderer
    prepareScene (sceneParams) {
      if (!this.loaded) {
        let result = 1
        for (const x in sceneParams) {
          result *= !!sceneParams[x]
        }
        if (result) {
          this.loaded = true
        } else {
          return
        }
      }
      this.createScene(sceneParams)
    },
    // 实际执行函数
    createScene (sceneParams) {
      // console.log(OrbitControls)
      const { scene, camera, renderer } = sceneParams
      const geometry = new THREE.BoxGeometry(100, 100, 100)
      const material = new THREE.MeshPhongMaterial({ color: 0x0000ff, specular: 0xff0000, shininess: 2 })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const sphereGeometry = new THREE.SphereGeometry(60, 40, 40)
      const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, wireframe: true })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(0, 200, 100)
      scene.add(sphere)

      const cylinderGeometry = new THREE.CylinderGeometry(50, 50, 100, 25)
      const cylinderMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffff00, opacity: 0.7, transparent: true })
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
      cylinder.translateX(120)
      scene.add(cylinder)

      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(400, 200, 300)
      scene.add(pointLight)

      const axisHelper = new THREE.AxesHelper(250)
      scene.add(axisHelper)

      const ambientLight = new THREE.AmbientLight(0x444444)
      scene.add(ambientLight)
      camera.position.set(200, 300, 200)
      camera.lookAt(scene.position)
      let t0 = new Date()
      let t1 = null
      const render = () => {
        cancelAnimationFrame(this.timer)
        renderer.render(scene, camera)
        t1 = new Date()
        const timeStep = t1 - t0
        t0 = t1
        mesh.rotateY(0.001 * timeStep)
        this.timer = requestAnimationFrame(render)
      }
      render()
    }
  },
  activated () {
    // 第一次进入页面执行
    this.$watch('readyInfo', (newValue, oldValue) => {
      this.prepareScene(newValue)
    })
    // 进入子页面执行
    this.prepareScene(this.readyInfo)
  }
}
</script>
