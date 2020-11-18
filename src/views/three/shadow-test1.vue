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
      this.renderScene()
    },
    // 场景对象
    sceneCore () {
      const scene = this.scene
      const geometry = new THREE.BoxGeometry(40, 40, 40)
      const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      scene.add(mesh)

      const planeGeometry = new THREE.PlaneGeometry(300, 200)
      const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 })
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
      planeMesh.rotateX(-Math.PI / 2)
      planeMesh.position.y = -50
      planeMesh.receiveShadow = true
      scene.add(planeMesh)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(-60, 100, 40)
      directionalLight.castShadow = true
      directionalLight.shadow.camera.near = 0.5
      directionalLight.shadow.camera.far = 300
      directionalLight.shadow.camera.left = -50
      directionalLight.shadow.camera.right = 50
      directionalLight.shadow.camera.top = 200
      directionalLight.shadow.camera.bottom = -100
      directionalLight.shadow.mapSize.width = 1024
      directionalLight.shadow.mapSize.height = 1024
      scene.add(directionalLight)
    },
    // 渲染场景
    renderScene () {
      const { scene, camera, renderer } = this
      // 直接操作点
      this.sceneCore()
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFShadowMap
      camera.position.set(200, 300, 200)
      camera.lookAt(scene.position)
      let t0 = new Date()
      let t1 = null
      const cube = scene.children[0]

      const render = () => {
        cancelAnimationFrame(this.timer)
        renderer.render(scene, camera)
        t1 = new Date()
        const timeStep = t1 - t0
        cube.rotateX(timeStep * 0.001)
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
