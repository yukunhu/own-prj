<template>
  <div>
    <div>
      <button @click="eryiShow=true;digit=1; num = false">两仪</button>
      <button @click="sixiangShow=true;digit=2; num = false">四象</button>
      <button @click="baguaShow=true;digit=3; num = false">八卦</button>
      <button @click="baguaShow=true;digit=6; num = false">周易</button>
      <button @click="num = false">重置</button>
    </div>
    <div id="glsl_container" style="width: 300px; height: 300px; display:inline-block; vertical-align: top"></div>
    <div style="width: 880px; height: 300px; display:inline-block">
      <div class="digit1" v-show="eryiShow">
        <h4>两仪</h4>
        <div>
          <button @click="()=>{baguaNum(2); eryi0 = true}">阴</button>
          <button @click="()=>{baguaNum(4); eryi1 = true}">阳</button>
        </div>
        <div>
          <img src="./img/liangyi0.png" alt=""  width="100" v-if="eryi0"/>
          <img src="./img/liangyi1.png" alt=""  width="100" v-if="eryi1"/>
        </div>
        <div>
          <span v-if="eryi0">0</span>
          <span v-if="eryi1">1</span>
        </div>
      </div>

      <div class="digit2" v-show="sixiangShow">
        <h4>四象</h4>
        <div>
          <button @click="()=>{baguaNum(2); sixiang0 = true}">太阴</button>
          <button @click="()=>{baguaNum(4); sixiang1 = true}">少阴</button>
          <button @click="()=>{baguaNum(6); sixiang2 = true}">少阳</button>
          <button @click="()=>{baguaNum(8); sixiang3 = true}">太阳</button>
        </div>
        <div>
          <img src="./img/sixiang0.png" alt=""  width="100" v-if="sixiang0"/>
          <img src="./img/sixiang1.png" alt=""  width="100" v-if="sixiang1"/>
          <img src="./img/sixiang2.png" alt=""  width="100" v-if="sixiang2"/>
          <img src="./img/sixiang3.png" alt=""  width="100" v-if="sixiang3"/>
        </div>
        <div>
          <span v-if="sixiang0">00</span>
          <span v-if="sixiang1">01</span>
          <span v-if="sixiang2">10</span>
          <span v-if="sixiang3">11</span>
        </div>
      </div>

      <div class="digit3" v-show="baguaShow">
        <h4>八卦</h4>
        <div>
          <button @click="baguaNum(2); img0 = true">坤</button>
          <button @click="baguaNum(4); img1 = true">艮</button>
          <button @click="baguaNum(6); img2 = true">坎</button>
          <button @click="baguaNum(8); img3 = true">巽</button>
          <button @click="baguaNum(10); img4 = true">震</button>
          <button @click="baguaNum(12); img5 = true">离</button>
          <button @click="baguaNum(14); img6 = true">兑</button>
          <button @click="baguaNum(16); img7 = true">乾</button>
        </div>
        <div>
          <img src="./img/bagua0.png" alt=""  width="100" v-if="img0"/>
          <img src="./img/bagua1.png" alt=""  width="100" v-if="img1"/>
          <img src="./img/bagua2.png" alt=""  width="100" v-if="img2"/>
          <img src="./img/bagua3.png" alt=""  width="100" v-if="img3"/>
          <img src="./img/bagua4.png" alt=""  width="100" v-if="img4"/>
          <img src="./img/bagua5.png" alt=""  width="100" v-if="img5"/>
          <img src="./img/bagua6.png" alt=""  width="100" v-if="img6"/>
          <img src="./img/bagua7.png" alt=""  width="100" v-if="img7"/>
        </div>
        <div>
          <span v-if="img0">000</span>
          <span v-if="img1">001</span>
          <span v-if="img2">010</span>
          <span v-if="img3">011</span>
          <span v-if="img4">100</span>
          <span v-if="img5">101</span>
          <span v-if="img6">110</span>
          <span v-if="img7">111</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  button{
    width: 100px;
    margin-right: 10px;
  }
  img{
    margin-right: 10px;
  }
  span{
    width: 100px;
    text-align: center;
    display: inline-block;
    margin-right: 10px;
  }
</style>

<script>
import * as THREE from 'three'
export default {
  name: 'glslTest',
  data () {
    return {
      num: false,
      eryiShow: false,
      sixiangShow: false,
      baguaShow: false,
      digit: 3,
      timer: null,
      img0: false,
      img1: false,
      img2: false,
      img3: false,
      img4: false,
      img5: false,
      img6: false,
      img7: false,

      sixiang0: false,
      sixiang1: false,
      sixiang2: false,
      sixiang3: false,

      eryi0: false,
      eryi1: false
    }
  },
  methods: {
    glslMouse (e) {
      console.log(e)
    },
    baguaNum (num) {
      this.num = num
    }
  },
  mounted () {
    var container
    var camera, scene, renderer
    var uniforms
    const that = this
    init()
    animate()

    function init () {
      container = document.getElementById('glsl_container')

      camera = new THREE.Camera()
      camera.position.z = 1

      scene = new THREE.Scene()

      var geometry = new THREE.PlaneBufferGeometry(2, 2)

      uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2() },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        u_digit: { type: 'f', value: 6.0 }
      }
      const vertexShader = `
        void main() {
          gl_Position = vec4( position, 1.0 );
        }
      `
      const fragmentShader = `
        #define PI 3.14159265359
        #define TWO_PI 6.28318530718
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform float u_digit;

        float shape(vec2 st, int N){
          st = st * 2. - 1.;
          float a = atan(st.x, st.y) +PI;
          float r = TWO_PI / float(N);
          return cos(floor(.5 + a/r) * r - a) * length(st);
        }

        float box(vec2 st, vec2 size){
          return shape(st * size, 4);
        }

        float hex(vec2 st, bool a, bool b, bool c, bool d, bool e, bool f){
          st = st * vec2(2., u_digit);

          vec2 fpos = fract(st);
          vec2 ipos = floor(st);

          if(ipos.x == 1.) fpos.x = 1. - fpos.x;
          if(ipos.y < 1.){
            return a? box(fpos-vec2(0.03,0.), vec2(1.)) : box(fpos, vec2(0.84, 1.));
          } else if (ipos.y < 2.0){
            return b? box(fpos-vec2(0.03,0.), vec2(1.)) : box(fpos, vec2(0.84,1.));
          } else if (ipos.y < 3.0){
            return c? box(fpos-vec2(0.03,0.), vec2(1.)) : box(fpos, vec2(0.84,1.));
          } else if (ipos.y < 4.0){
            return d? box(fpos-vec2(0.03,0.), vec2(1.)) : box(fpos, vec2(0.84,1.));
          }  else if (ipos.y < 5.0){
            return e? box(fpos-vec2(0.03,0.), vec2(1.)) : box(fpos, vec2(0.84,1.));
          } else if (ipos.y < 6.0){
            return f? box(fpos-vec2(0.03,0.), vec2(1.)) : box(fpos, vec2(0.84,1.));
          }
          return 0.0;
        }

        float hex(vec2 st, float N){
            bool b[6];
            float digit = pow(2., u_digit);
            float remain = floor(mod(N,digit));
            for(int i = 0; i < 6; i++){
                b[i] = mod(remain,2.)==1.?true:false;
                remain = ceil(remain/2.);
            }
            return hex(st,b[0],b[1],b[2],b[3],b[4],b[5]);
        }
        
        vec3 random3(vec3 c) {
            float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
            vec3 r;
            r.z = fract(512.0*j);
            j *= .125;
            r.x = fract(512.0*j);
            j *= .125;
            r.y = fract(512.0*j);
            return r-0.5;
        }

        const float F3 =  0.3333333;
        const float G3 =  0.1666667;
        float snoise(vec3 p) {

            vec3 s = floor(p + dot(p, vec3(F3)));
            vec3 x = p - s + dot(s, vec3(G3));

            vec3 e = step(vec3(0.0), x - x.yzx);
            vec3 i1 = e*(1.0 - e.zxy);
            vec3 i2 = 1.0 - e.zxy*(1.0 - e);

            vec3 x1 = x - i1 + G3;
            vec3 x2 = x - i2 + 2.0*G3;
            vec3 x3 = x - 1.0 + 3.0*G3;

            vec4 w, d;

            w.x = dot(x, x);
            w.y = dot(x1, x1);
            w.z = dot(x2, x2);
            w.w = dot(x3, x3);

            w = max(0.6 - w, 0.0);

            d.x = dot(random3(s), x);
            d.y = dot(random3(s + i1), x1);
            d.z = dot(random3(s + i2), x2);
            d.w = dot(random3(s + 1.0), x3);

            w *= w;
            w *= w;
            d *= w;

            return dot(d, vec4(52.0));
        }


        void main(){
          vec2 st = gl_FragCoord.xy/u_resolution.xy;
          st.y *= u_resolution.y/u_resolution.x;

          float t = u_time*0.5;

          float df = 1.0;
          df = mix(hex(st,t),hex(st,t+1.),fract(t));
          df += snoise(vec3(st*75.,t*0.1))*0.03;
          gl_FragColor = vec4(mix(vec3(0.),vec3(1.),step(0.7,df)),1.0);
        }
      `
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader,
        fragmentShader
      })
      container.addEventListener('mousemove', (e) => {
        material.uniforms.u_mouse.value = new THREE.Vector2(e.clientX, container.clientHeight - e.clientY)
      }, false)

      var mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(container.offsetWidth, container.offsetHeight)
      container.appendChild(renderer.domElement)

      onWindowResize()
      window.addEventListener('resize', onWindowResize, false)
    }

    function onWindowResize (event) {
      uniforms.u_resolution.value.x = renderer.domElement.width
      uniforms.u_resolution.value.y = renderer.domElement.height
    }

    function animate () {
      that.timer = requestAnimationFrame(animate)
      render()
    }
    function render () {
      if (typeof that.num === 'number') {
        uniforms.u_time.value = that.num
      } else {
        uniforms.u_time.value += 0.05
      }
      uniforms.u_digit.value = that.digit
      renderer.render(scene, camera)
    }
  }

}
</script>
