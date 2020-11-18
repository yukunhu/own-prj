<template>
  <div id="moonContainer" style="width: 1200px; height: 600px"></div>
</template>
<script>
import * as THREE from 'three'
import { Vector2, Vector3 } from 'three'
export default {
  name: 'three-index',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null
    }
  },
  mounted () {
    const earthMoonDistance = 221.18
    const earthRadius = 3.67
    const moonRadius = 1
    const container = document.getElementById('moonContainer')
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true })
    const camera = new THREE.PerspectiveCamera(40, containerWidth / containerHeight / 2, 0.1, earthMoonDistance * 10)
    const moonCamera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight / 2, 1, earthMoonDistance)
    moonCamera.position.set(earthRadius, 0, 0)
    camera.position.set(0, earthMoonDistance * 3, 0)
    camera.lookAt(scene.position)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.autoClear = false
    const cameraHelper = new THREE.CameraHelper(moonCamera)
    scene.add(moonCamera)
    scene.add(cameraHelper)
    container.appendChild(renderer.domElement)

    // 背景光
    // scene.add(new THREE.AmbientLight(0x222222))
    // 地球
    const earth = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, 200, 200), new THREE.MeshLambertMaterial({ color: 0x33ffdd }))
    earth.position.set(0, 0, 0)
    earth.castShadow = true
    scene.add(earth)

    // 月球
    const moon = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, 200, 200), new THREE.MeshLambertMaterial({ color: 0xdddddd }))
    moon.position.set(earthMoonDistance / 50, 0, 0)
    moon.receiveShadow = true
    scene.add(moon)

    // 太阳光
    const directionalLight = new THREE.DirectionalLight({ color: 0xffffff })
    directionalLight.position.set(-earthRadius * 5 * 1.2, 0, 0)
    directionalLight.target = earth
    directionalLight.castShadow = true
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 300
    directionalLight.shadow.camera.left = -5
    directionalLight.shadow.camera.right = 5
    directionalLight.shadow.camera.top = 5
    directionalLight.shadow.camera.bottom = -5
    directionalLight.shadow.mapSize.width = 64
    directionalLight.shadow.mapSize.height = 64

    scene.add(directionalLight)
    const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    scene.add(shadowCameraHelper)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    camera.up = new THREE.Vector3(0, 0, 1)
    moonCamera.up = new Vector3(0, 1, 0)

    animate()
    function animate () {
      const time = new Date() / 4000
      // 地球旋转
      // 月球旋转

      moon.position.z = Math.cos(time) * earthRadius
      requestAnimationFrame(animate)
      // moon.position.x = Math.sin(time) * earthMoonDistance
      // moon.position.z = Math.cos(time) * earthMoonDistance
      // moonCamera.position.x = Math.sin(time * 30) * earthMoonDistance
      // moonCamera.position.z = Math.cos(time * 30) * earthMoonDistance
      moonCamera.lookAt(moon.position)
      renderer.clear()
      earth.visible = true
      cameraHelper.visible = false
      renderer.setViewport(0, 0, containerWidth / 2, containerHeight)
      renderer.render(scene, camera)
      cameraHelper.visible = false
      earth.visible = false
      renderer.setViewport(containerWidth / 2, 0, containerWidth / 2, containerHeight)
      renderer.render(scene, moonCamera)
    }
  }
}
</script>
