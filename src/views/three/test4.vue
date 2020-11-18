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
      // 不使用顶点索引
      const geometry = new THREE.BufferGeometry()
      geometry.attributes.position = new THREE.BufferAttribute(new Float32Array([0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 100, 50, 0, 0]), 3)
      geometry.attributes.normal = new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]), 3)
      geometry.attributes.color = new THREE.BufferAttribute(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1]), 3)
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      }))
      // scene.add(mesh)
      // 使用顶点索引
      const indexGeometry = new THREE.BufferGeometry()
      indexGeometry.attributes.position = new THREE.BufferAttribute(new Float32Array([0, 0, 0, 80, 0, 0, 0, 80, 80, 0, 0, 80]), 3)
      indexGeometry.attributes.normal = new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]), 3)
      indexGeometry.attributes.color = new THREE.BufferAttribute(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0]), 3)
      indexGeometry.index = new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 0, 2, 3]), 1)
      const indexMesh = new THREE.Mesh(indexGeometry, new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      }))
      scene.add(indexMesh)

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
