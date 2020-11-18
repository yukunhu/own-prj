<template>
    <div class="container" @mousewheel="changePage">
        <div class="page page1" v-if="pageIndex == 1">
            <h1 class="title">浏览器中的计算机图形学初探</h1>
        </div>
        <div class="page page2" v-if="pageIndex == 2">
            <h2 style="text-align: left">1. 计算机图形学的应用</h2>
            <h2 style="text-align: left">2. 计算机图形学在浏览器中实现</h2>
            <h2 style="text-align: left">3. 几个实例</h2>
        </div>
        <div class="page page3" v-if="pageIndex == 3">
            <h2>1. 计算机图形学的应用<span v-if="page3[itemIndex].text" style="color:red">({{page3[itemIndex].text}})</span></h2>
            <p :style="{backgroundImage: `url(${page3[itemIndex].url})`}" v-if="itemIndex < 15"></p>
            <p v-if="itemIndex === 15">计算机可视化输出，前端即计算机图形学的浏览器实现</p>
        </div>
        <div class="page page4" v-if="pageIndex == 4">
            <h2>2. 计算机图形学在浏览器中实现</h2>
            <p v-if="itemIndex < 4">
                <span v-if="itemIndex === 0">CPU vs GPU</span>
                <span v-if="itemIndex === 1 || itemIndex === 2">CPU(串行) vs GPU(并行)</span>
                <br v-if="itemIndex === 2"/>
                <span v-if="itemIndex === 2">1920 * 1080 * 60  &asymp;  1&times;10^8</span>
                <table v-if="itemIndex === 3" border="1" style="width:100%; border-callapse: true" >
                    <tr>
                        <td></td>
                        <td colspan="2">CPU</td>
                        <td>GPU</td>
                    </tr>
                    <tr>
                        <td rowspan="3">通用</td>
                        <td>OpenGL</td>
                        <td>桌面</td>
                        <td rowspan="3">glsl</td>
                    </tr>
                    <tr>
                        <td>OpenGL|ES</td>
                        <td>移动</td>
                    </tr>
                    <tr>
                        <td>WebGL</td>
                        <td>浏览器</td>
                    </tr>
                    <tr>
                        <td rowspan="2">下一代</td>
                        <td>Vulkan</td>
                        <td>桌面、移动</td>
                        <td>SPIR-V</td>
                    </tr>
                    <tr>
                        <td>WebGPU</td>
                        <td>浏览器</td>
                        <td>glsl</td>
                    </tr>
                </table>
                <span v-if="itemIndex === 3">windows DirectX</span>
                <br v-if="itemIndex === 3"/>
                <span v-if="itemIndex === 3">APPLE metal</span>
            </p>
            <div v-if="itemIndex === 4" style="text-align: center">GC + BROSWER = WebGL/WebGPU</div>
            <p :style="{backgroundImage: `url(${page4[itemIndex].url})`}" v-if="itemIndex === 4"></p>
        </div>
        <div class="page page5" v-if="pageIndex == 5">
            <h2>3. 几个实例<span v-if="page5[itemIndex].text" style="color:red">({{page5[itemIndex].text}})</span></h2>
            <div v-if="itemIndex === 2" style="text-align: center">《易传·系辞上传》：“易有太极，是生两仪，两仪生四象，四象生八卦。”</div>
            <div v-if="itemIndex === 2" style="text-align: center">《报任安书》：“盖西伯拘而演《周易》”</div>
            <p :style="{backgroundImage: `url(${page5[itemIndex].url})`}" v-if="itemIndex ===0 || itemIndex ===2"></p>
            <comMoon  v-if="itemIndex ===1" style="margin: 0 auto; width: 1200px"/>
            <comBugua v-if="itemIndex ===3" style="margin: 0 auto; width: 1200px"/>
            <div v-if="itemIndex >3" style="width:1400px; height: 600px; margin: 0 auto">
                <iframe src="https://bruno-simon.com/" frameborder="0" v-if="itemIndex ===4" width='1400' height="600"></iframe>
                <iframe src="https://go.pioneer.com/cornrevolution" frameborder="0" v-if="itemIndex ===5" width='1400' height="600"></iframe>
                <iframe src="http://oatthegoat.co.nz/" frameborder="0" v-if="itemIndex ===6" width='1400' height="600"></iframe>
                <iframe src="http://vr.ff.com/us/" frameborder="0" v-if="itemIndex ===7" width='1400' height="600"></iframe>
                <iframe src="https://www.nationalgeographic.com/science/2016/11/exploring-mars-map-panorama-pictures/" frameborder="0" v-if="itemIndex ===8" width='1400' height="600"></iframe>
                <iframe src="https://phoboslab.org/wipeout/" frameborder="0" v-if="itemIndex ===9" width='1400' height="600"></iframe>
            </div>

        </div>
        <div class="page page6" v-if="pageIndex == 6">
            <h1 class="title">谢谢</h1>
        </div>
    </div>
</template>

<script>
import p3Image1 from './gcinbrowser/1game.png'
import p3Image2 from './gcinbrowser/2game.png'
import p3Image3 from './gcinbrowser/3movie.png'
import p3Image4 from './gcinbrowser/4movie.png'
import p3Image5 from './gcinbrowser/5animation.png'
import p3Image6 from './gcinbrowser/6animation.png'
import p3Image7 from './gcinbrowser/7design.png'
import p3Image8 from './gcinbrowser/8design.png'
import p3Image9 from './gcinbrowser/9visiualization.png'
import p3Image10 from './gcinbrowser/10vr.png'
import p3Image11 from './gcinbrowser/11ar.png'
import p3Image12 from './gcinbrowser/12draw.png'
import p3Image13 from './gcinbrowser/13simulation.png'
import p3Image14 from './gcinbrowser/14gui.png'
import p3Image15 from './gcinbrowser/15font.png'
import p4Image1 from './gcinbrowser/16ppap.png'
import p5image1 from './gcinbrowser/17moon.jpg'
import p5image2 from './gcinbrowser/18bagua.jpg'
import comMoon from './gcinbrowser/moon'
import comBugua from './gcinbrowser/bagua'
export default {
  name: 'gcinbrowser',
  data () {
    return {
      pageIndex: 1,
      pageMin: 1,
      pageMax: 6,
      page3: [
        { text: '游戏', url: p3Image1 },
        { text: '游戏', url: p3Image2 },
        { text: '电影', url: p3Image3 },
        { text: '电影', url: p3Image4 },
        { text: '动画', url: p3Image5 },
        { text: '动画', url: p3Image6 },
        { text: '设计', url: p3Image7 },
        { text: '设计', url: p3Image8 },
        { text: '数据可视化', url: p3Image9 },
        { text: 'vr', url: p3Image10 },
        { text: 'ar', url: p3Image11 },
        { text: '插画', url: p3Image12 },
        { text: '数值模拟', url: p3Image13 },
        { text: 'gui', url: p3Image14 },
        { text: '文字设计', url: p3Image15 },
        'text'
      ],
      page4: [
        'text',
        'text',
        'text',
        'text',
        { url: p4Image1 }
      ],
      page5: [
        { text: '月有阴晴圆缺', url: p5image1 },
        { text: '月有阴晴圆缺' },
        { text: '八卦', url: p5image2 },
        { text: '八卦与二进制', url: p5image2 },
        { text: '一份简历' },
        { text: '卖玉米的' },
        { text: '童话故事' },
        { text: '贾跃亭造车' },
        { text: '火星演化' },
        { text: '赛车游戏' }
      ],
      itemIndex: 0
    }
  },
  components: {
    comMoon,
    comBugua
  },
  methods: {
    changePage (e) {
      const scrollDistance = e.deltaY
      const scrollDirection = scrollDistance / Math.abs(scrollDistance)
      let itemArr = this[`page${this.pageIndex}`]
      this.itemIndex += scrollDirection
      if (itemArr && itemArr[this.itemIndex]) {
        return
      }
      if ((this.pageIndex === this.pageMin && scrollDirection < 0) || (this.pageIndex === this.pageMax && scrollDirection > 0)) return
      this.pageIndex += scrollDirection
      itemArr = this[`page${this.pageIndex}`]
      if (itemArr && scrollDirection < 0) this.itemIndex = itemArr.length - 1
      if (itemArr && scrollDirection > 0) this.itemIndex = 0
    }
  }
}
</script>

<style lang="less" scoped>
    div, h1, h2, p, canvas{
        margin: 0;
        padding: 0;
    }

    .page{
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
    }
    h1{
        font-size: 60px;
        text-align: center;
        margin-top: 300px;
    }

    h2{
        &:first-child{
            padding-top: 100px;
        }
        font-size: 40px;
        padding-left: 60px;
        padding-bottom: 20px;
    }

    p{
        padding: 40px;
        font-size: 30px;
        height: 60%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size:contain;
    }
    iframe{
        margin: 0 auto;
    }

</style>
