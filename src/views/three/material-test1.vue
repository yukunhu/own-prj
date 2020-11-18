<template>
    <div ref="container"></div>
</template>

<script>
import * as THREE from 'three'
import { PointLightHelper } from 'three'
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
      this.renderScene()
    },
    // 场景对象
    sceneCore () {
      const cubeGeometry = new THREE.BoxGeometry(100, 100, 100)
      const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 })
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      this.scene.add(cube)

      const cubeLamb = new THREE.Mesh(cubeGeometry.clone().translate(0, 140, 0), new THREE.MeshLambertMaterial({ color: 0xf0f0f0 }))
      this.scene.add(cubeLamb)
      const ambient = new THREE.AmbientLight(0x444444)
      this.scene.add(ambient)

      const pointLight = new THREE.PointLight(0xff0000)
      pointLight.position.set(400, 200, 300)
      this.scene.add(pointLight)

      const pointLightHelper = new THREE.PointLightHelper(pointLight)
      this.scene.add(pointLightHelper)

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.2)
      dirLight.position.set(280, 100, 50)
      dirLight.target = cubeLamb
      // this.scene.add(dirLight)

      const spotLight = new THREE.SpotLight(0x00ff00)
      spotLight.position.set(200, 200, 200)
      spotLight.target = cube
      spotLight.angle = Math.PI / 6
      this.scene.add(spotLight)
    },
    // 渲染场景
    renderScene () {
      const { scene, camera, renderer } = this
      // 直接操作点
      this.sceneCore()
      camera.position.set(200, 300, 200)
      camera.lookAt(scene.position)
      let t0 = new Date()
      let t1 = null
      const spotLight = scene.children[3]
      const render = () => {
        cancelAnimationFrame(this.timer)
        renderer.render(scene, camera)
        t1 = new Date() * 0.001
        spotLight.position.set(Math.sin(t1) * 200, 400, Math.cos(t1) * 200)
        t0 = t1
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
