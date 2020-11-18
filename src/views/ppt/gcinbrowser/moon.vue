<template>
  <div style="position: relative">
    <div id="moonContainer" style="width: 1200px; height: 600px"></div>
    <div style="position: absolute; height: 600px; width: 1px; left: 600px; top: 1px; background:#fff"></div>
    <button @click="()=>{changeMotion = !changeMotion}">{{'旋转'}}</button>
  </div>
</template>
<script>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import { DirectionalLight, DoubleSide, Vector2, Vector3 } from 'three'
export default {
  name: 'three-index',
  data () {
    return {
      earthMoonDistance: 20,
      earth: null,
      moon: null,
      moonCamera: null,
      moonCameraSphere: null,
      camera: null,
      renderer: null,
      scene: null,
      containerWidth: null,
      containerHeight: null,
      changeMotion: false,
      controls: null
    }
  },
  mounted () {
    const moonRadius = 1
    const earthRadius = 3.67
    const cameraViewSize = 30

    const container = document.getElementById('moonContainer')
    this.containerWidth = container.offsetWidth
    this.containerHeight = container.offsetHeight
    const aspect = this.containerWidth / this.containerHeight / 2

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.containerWidth, this.containerHeight)
    this.renderer.autoClear = false
    this.renderer.shadowMap.enabled = true
    container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()

    // 地球
    this.earth = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, 30, 30), new THREE.MeshLambertMaterial({ color: 0x33ffdd }))
    this.earth.castShadow = true
    this.scene.add(this.earth)

    // 月球
    this.moon = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, 30, 30), new THREE.MeshLambertMaterial({ color: 0xdddddd }))
    this.moon.receiveShadow = true
    this.scene.add(this.moon)

    // 日光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.castShadow = true
    directionalLight.position.set(-this.earthMoonDistance, 0, 0)
    directionalLight.shadow.mapSize.width = 10224
    directionalLight.shadow.mapSize.height = 1024
    this.scene.add(directionalLight)

    // 左侧摄像机
    this.camera = new THREE.OrthographicCamera(-cameraViewSize * aspect, cameraViewSize * aspect, cameraViewSize * aspect, -cameraViewSize * aspect, 1, 1000)
    this.camera.position.set(0, 40, 0)
    this.camera.lookAt(this.earth.position)

    // 右侧摄像机
    this.moonCamera = new THREE.PerspectiveCamera(25, aspect, 0.1, 10000)
    this.moonCamera.position.set(0, 0, 0)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.rotateSpeed = 0.5
    this.moonCameraSphere = new THREE.Mesh(new THREE.SphereGeometry(moonRadius / 3, 20, 20), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    this.scene.add(this.moonCameraSphere)

    this.animate()
  },
  methods: {

    animate () {
      this.controls.update()
      const time = new Date() / 4000
      if (this.changeMotion) {
        this.moon.position.z = Math.sin(time) * this.earthMoonDistance
        this.moon.position.x = Math.cos(time) * this.earthMoonDistance
        this.moonCameraSphere.position.z = Math.sin(time * 30) * 3.67
        this.moonCameraSphere.position.x = Math.cos(time * 30) * 3.67
      } else {
        this.moon.position.z = 4
        this.moon.position.x = this.earthMoonDistance
      }

      this.moonCamera.lookAt(this.moon.position)

      this.moonCameraSphere.visible = false
      this.renderer.setViewport(this.containerWidth / 2, 0, this.containerWidth / 2, this.containerHeight)
      this.renderer.render(this.scene, this.moonCamera)

      this.moonCameraSphere.visible = true
      this.renderer.setViewport(0, 0, this.containerWidth / 2, this.containerHeight)
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    }
  },
  computed: {

  }
}
</script>
