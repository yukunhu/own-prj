<template>
  <div>
    <div id="moonContainer" style="width: 1200px; height: 600px"></div>
    <button @click="pauseOrplay">{{pauseFlag?'开始':'暂停'}}</button>
  </div>
</template>
<script>
import * as THREE from 'three'
import { DirectionalLight, DoubleSide, Vector2, Vector3 } from 'three'
export default {
  name: 'three-index',
  data () {
    return {
      earth: null,
      moon: null,
      moonHelper: null,
      line: null,
      moonCamera: null,
      moonCameraSphere: null,
      camera: null,
      renderer: null,
      scene: null,
      containerWidth: null,
      containerHeight: null,
      earthMoonDistance: 221.18,
      timer: null,
      pauseFlag: false,
      stopTime: new Date(),
      startTime: new Date(),
      lineRotateFlag: 0
    }
  },
  mounted () {
    const moonRadius = 1
    const earthRadius = 3.67
    const container = document.getElementById('moonContainer')
    this.containerWidth = container.offsetWidth
    this.containerHeight = container.offsetHeight
    const aspect = this.containerWidth / this.containerHeight / 2
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.scene = new THREE.Scene()
    this.moonCamera = new THREE.PerspectiveCamera(5, aspect, 0.1, 10000)
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 10000)
    this.earth = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, 20, 20), new THREE.MeshLambertMaterial({ color: 0x33ffdd }))
    this.moon = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, 20, 20), new THREE.MeshLambertMaterial({ color: 0xdddddd }))
    this.moonHelper = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, 20, 20), new THREE.MeshBasicMaterial({ color: 0xdddddd }))
    this.moonCameraSphere = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, 20, 20), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    const directionalLight = new THREE.DirectionalLight({ color: 0xffffff })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.containerWidth, this.containerHeight)
    this.renderer.autoClear = false
    container.appendChild(this.renderer.domElement)
    this.moonCamera.position.set(earthRadius, 0, 0)
    this.camera.position.set(0, 1.4 * this.earthMoonDistance, 0)
    this.camera.lookAt(this.earth.position)
    directionalLight.shadow.camera.far = 10000
    directionalLight.shadow.camera.top = 10000
    directionalLight.shadow.camera.bottom = -10000
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.castShadow = true
    directionalLight.position.set(-this.earthMoonDistance * 2, 0, 0)
    directionalLight.target = this.earth

    const material = new THREE.LineBasicMaterial({ color: 0xdddddd, opacity: 0.125 })
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    vertices.push(earthRadius * 3, 0, 0, this.earthMoonDistance * 0.98, 0, 0)
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    this.line = new THREE.Line(geometry, material)
    this.scene.add(this.line)
    this.earth.castShadow = true
    this.moon.receiveShadow = true
    this.renderer.shadowMap.enabled = true
    this.moon.rotateX(-Math.PI / 2)
    this.moon.position.set(this.earthMoonDistance, 0, 0)
    this.moon.position.set(this.earthMoonDistance, 0, 0)
    this.scene.add(directionalLight)
    this.scene.add(this.moon)
    this.scene.add(this.moonHelper)
    this.scene.add(this.earth)
    this.scene.add(this.moonCameraSphere)

    this.animate()
    this.line.rotateY(Math.PI / 3)
  },
  methods: {
    pauseOrplay () {
      if (!this.pauseFlag) {
        cancelAnimationFrame(this.timer)
        this.pauseFlag = true
        this.stopTime = new Date()
      } else {
        this.pauseFlag = false
        this.startTime = new Date()
        this.animate()
      }
    },

    animate () {
      const time = (new Date().getTime() - this.startTime.getTime() + this.stopTime.getTime()) / 4000
      this.line.rotateY(-time + this.lineRotateFlag)
      this.lineRotateFlag = time
      this.moon.position.z = Math.sin(time - Math.PI * 0.334) * this.earthMoonDistance
      this.moon.position.x = Math.cos(time - Math.PI * 0.334) * this.earthMoonDistance
      this.moonHelper.position.z = Math.sin(time - Math.PI * 0.334) * this.earthMoonDistance
      this.moonHelper.position.x = Math.cos(time - Math.PI * 0.334) * this.earthMoonDistance
      this.moonCameraSphere.position.z = Math.sin(time * 30) * 3.67
      this.moonCameraSphere.position.x = Math.cos(time * 30) * 3.67
      this.moonCamera.position.z = Math.sin(time * 30) * 3.67
      this.moonCamera.position.x = Math.cos(time * 30) * 3.67
      this.moonCamera.lookAt(this.moon.position)
      this.earth.visible = false
      this.line.visible = false

      this.renderer.setViewport(this.containerWidth / 2, 0, this.containerWidth / 2, this.containerHeight)
      this.renderer.render(this.scene, this.moonCamera)
      this.line.visible = true
      this.earth.visible = true
      this.renderer.setViewport(0, 0, this.containerWidth / 2, this.containerHeight)
      this.renderer.render(this.scene, this.camera)
      this.timer = requestAnimationFrame(this.animate)
    }
  },
  computed: {

  }
}
</script>
