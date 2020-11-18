import Vue from 'vue'
import VueRouter from 'vue-router'
import three from './three'
import ppt from './ppt'
import glsl from '../views/glsl/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/three',
    name: 'Three',
    component: () => import('../views/three/index'),
    children: three
  },
  {
    path: '/ppt',
    name: 'ppt',
    component: () => import('../views/ppt/index'),
    children: ppt
  },
  {
    path: '/glsl',
    name: 'glsl',
    component: glsl
  }
]

const router = new VueRouter({
  routes
})

export default router
