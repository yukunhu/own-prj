import Vue from 'vue'
import VueRouter from 'vue-router'
import three from './three'
import ppt from './ppt'
import glsl from '../views/glsl/index'
import chart3d from '../views/chart3d/topology3d'

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
  },
  {
    path: '/chart3d',
    name: 'chart3d',
    component: chart3d
  }
]

const router = new VueRouter({
  routes
})

export default router
