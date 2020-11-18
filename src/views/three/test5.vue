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
      const { scene, camera, renderer } = sceneParams
      // 直接操作点
      const pointGeometry = new THREE.Geometry()
      pointGeometry.vertices.push(new THREE.Vector3(50, 0, 0), new THREE.Vector3(0, 70, 0), new THREE.Vector3(0, 0, 60))
      pointGeometry.colors.push(new THREE.Color(0x00ff00), new THREE.Color(0xff0000), new THREE.Color(0x0000ff))
      const pointMesh = new THREE.Points(pointGeometry, new THREE.PointsMaterial({
        vertexColors: THREE.VertexColors,
        size: 10.0
      }))
      scene.add(pointMesh)
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
