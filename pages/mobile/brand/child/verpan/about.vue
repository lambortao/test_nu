<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <article class="brand-content">
    <h3>关于 VERPAN</h3>
    <div class="indent">
      <p>VERPAN 是丹麦著名建筑师和设计师 Verner Panton 设计作品的授权制造商。就像 Panton 本人一样，这家丹麦设计公司也是丹麦设计传统的产物，使丹麦设计以其功能性、现代性和独特性而闻名于世。</p>
      <p>VERPAN的故事始于2003年，在得到作品独家授权后，开始发行Verner Panton的灯具系列作品，2010年后，又投入了家具系列作品的生产。VERPAN继承于Panton先生的设计精神，以高辨识度的产品，为现代用户重现其超前的生活方式主张。</p>
      <a class="brank_link" href="https://www.verpan.com" target="_blank">www.verpan.com</a>
      <div class="two-pic">
        <figure><img src="~/assets/images/AAmobile/brand/verpan-left.jpg" alt=""></figure>
        <figure><img src="~/assets/images/AAmobile/brand/verpan-right.jpg" alt=""></figure>
      </div>
      <p>VERPAN 的全系列产品均为 Verner Panton 作品中最优雅和最值得纪念的经典之作。如今，这些设计与它们在50年代、60年代、70年代和80年代被首次设计时一样具有标志性，趣味性和当代性。</p>
      <p>VERPAN 的产品带着独有的声音、动态、色彩与光和生命力闯进我们的视觉世界，并赋予其更广阔的价值。</p>
    </div>
    <div class="two-pic">
      <figure><img src="~/assets/images/AAmobile/brand/vicon-left.jpg" alt=""></figure>
      <figure><img src="~/assets/images/AAmobile/brand/vicon-right.jpg" alt=""></figure>
    </div>
    <h3 class="h3">Verner Panton</h3>
    <div class="auths">维纳尔·潘顿</div>
    <div class="indent">
      <p>作为丹麦设计界的巨匠，Verner Panton(1926-1998) 以其旺盛的创造力和不懈的探索精神开创了独特的风格体系。他热衷于新型材料和色彩的设计实践，将强烈的视觉表现方式运用到众多作品的造型创意设计中，因此也被誉为“二十世纪最富有创造力的设计大师”。</p>
      <figure><img src="~/assets/images/AAmobile/brand/ver.jpg" alt=""></figure>
      <div class="auth">Verner Panton</div>
      <p>Panton 幼年时曾梦想成为一名画家，在接受了建筑学相关的学习后，最终在设计领域找到了自己的兴趣所向。师从 Arne Jacobsen 和 Poul Henningsen 等人，这些设计大师给予 Panton 很深的影响。</p>
      <p>纵观 Panton 先生的职业生涯，他总是在不断挖掘新材料和工艺技术，将人体工学等功能性设计与富有想象力的有机形状、大胆且丰富的色彩相结合，以挑战传统的方式达到工艺和质量的跃升。时至今日，这些实验经受住时间的考验，变成了一件件伟大的设计实践。</p>
      <figure><img src="~/assets/images/AAmobile/brand/v-bg.jpg" alt=""></figure>
      <div class="auth">Visiona 2展览中的VP Globe吊灯</div>
      <p>尽管 Panton 师出名门，贡献良多，但在跨入设计领域之初，他始终冲向创新的最前沿，大胆前卫的设计风格让他被同时代的丹麦设计师视作“反叛者”。</p>
      <p>Panton 的标志性设计已成为当代设计的经典之作，并与50年前一样具有惊人的创造力。</p>
      <div class="video-area" @click="play()">
        <video
          ref="videoE"
          src="~/assets/video/Verpan.mp4"
          paused="paused"
          width="100%"
          height="100%"
        />
        <img v-if="hiddenVideo" src="~/assets/images/brand/4.png" class="ver-video">
        <img v-if="videoButton" src="~/assets/images/brand/play.png" class="play-button">
      </div>
      <div class="auth">Verner Panton著名空间装置作品Visiona 2，1970年</div>
    </div>
    <div class="contacts">
      <div class="follow-us">
        <div class="left-line" />
        <div class="follow-we">
          关注我们
        </div>
        <div class="right-line" />
      </div>
      <div class="contact-all">
        <div class="contact-info">
          <div class="contact-icon">
            <div class="con-icon">
              <img src="~/assets/images/AAmobile/brand/wechat.jpg">
            </div>
            <div class="con-text">
              VERPAN
            </div>
          </div>
          <div class="copy" @click="copyText('VERPAN')">
            <span class="copy-text">复制</span>
          </div>
        </div>
        <div class="contact-info">
          <div class="contact-icon">
            <div class="con-icon">
              <img src="~/assets/images/AAmobile/brand/weibo.jpg">
            </div>
            <div class="con-text">
              VERPAN
            </div>
          </div>
          <div class="copy" @click="weibo()">
            <span class="copy-text">关注</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'VerpanAbout',
  data () {
    return {
      hiddenVideo: true,
      videoButton: true
    }
  },
  mounted () {
  },
  methods: {
    copyText (text) {
      const textValue = document.createElement('textarea')
      textValue.setAttribute('readonly', 'readonly')
      textValue.value = text
      document.body.appendChild(textValue)
      textValue.select()
      const res = document.execCommand('copy')
      document.body.removeChild(textValue)
      console.log('复制成功')
      document.body.oncopy = function () {
        alert('复制成功!')
      }
      this.brandTracking({ label: '公众号' })
      return res
    },
    weibo () {
      window.open('https://weibo.com/u/7496459897')
      this.brandTracking({ label: '微博' })
    },
    play () {
      this.hiddenVideo = false
      this.videoButton = false
      if (this.$refs.videoE.paused === true) {
        this.videoButton = false
        this.$refs.videoE.play()
      } else {
        this.videoButton = true
        this.$refs.videoE.pause()
      }
    },
    brandTracking ({ label }) {
      this.$emit('tracking', { event: 'jump_to_url', mode: 'Brands', label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
