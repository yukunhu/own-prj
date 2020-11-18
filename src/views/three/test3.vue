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
      camera.position.set(200, 300, 200)
      camera.lookAt(scene.position)

      const geometry = new THREE.BufferGeometry()
      const vertices = new Float32Array([0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10])
      const attribute = new THREE.BufferAttribute(vertices, 3)
      geometry.attributes.position = attribute
      // 面
      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geometry, material)
      // scene.add(mesh)
      // 同一颜色点
      const pointMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 2.0 })
      const points = new THREE.Points(geometry, pointMaterial)
      // scene.add(points)
      // 线
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 })
      const line = new THREE.Line(geometry, lineMaterial)
      scene.add(line)
      // 坐标轴
      const axisHelper = new THREE.AxesHelper(250)
      // scene.add(axisHelper)
      // 不同色彩的点
      const pointGeometry = new THREE.BufferGeometry()
      const vertices1 = new Float32Array([0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10])
      const colors = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1])
      pointGeometry.attributes.color = new THREE.BufferAttribute(colors, 3)
      pointGeometry.attributes.position = new THREE.BufferAttribute(vertices1, 3)
      const pointMaterial1 = new THREE.PointsMaterial({
        vertexColors: THREE.VertexColors,
        size: 10
      })
      const points1 = new THREE.Points(pointGeometry, pointMaterial1)
      scene.add(points1)

      const squareMaterial = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      })
      scene.add(new THREE.Mesh(pointGeometry, squareMaterial))
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
