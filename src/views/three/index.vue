<template>
    <div>
        <div class="nav">
            <router-link :to="`/three/${item}`" v-for="(item, index) in routerName" :key="index">{{item}}</router-link>
        </div>
        <keep-alive>
            <router-view :scene="scene" :camera="camera" :renderer="renderer"/>
        </keep-alive>
    </div>
</template>
<script>
import * as THREE from 'three'
export default {
  name: 'three-index',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      routerName: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'materialtTest1', 'shadowTest1', 'groupTest1']
    }
  },
  mounted () {
    this.$router.afterEach((to, from) => {
      this.scene.children = []
    })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
  }
}
</script>
