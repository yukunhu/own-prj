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
    createScene (sceneParams) {
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
      const { scene, camera, renderer } = sceneParams
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      cube.rotation.set(this.rotateX, this.rotateY, 0)
      camera.position.set(0, 0, 5)
      camera.lookAt(scene.position)
      const animate = () => {
        cancelAnimationFrame(this.timer)
        this.rotateX += 0.01
        this.rotateY += 0.01
        cube.rotation.x = this.rotateX
        cube.rotation.y = this.rotateY
        this.timer = requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    }
  },
  activated () {
    // 第一次进入页面执行
    this.$watch('readyInfo', (newValue, oldValue) => {
      this.createScene(newValue)
    })
    // 进入子页面执行
    this.createScene(this.readyInfo)
  }
}
</script>
