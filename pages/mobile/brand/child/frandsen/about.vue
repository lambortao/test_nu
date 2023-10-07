<template>
  <article class="brand-content">
    <h3>我们的DNA</h3>
    <div class="indent">
      <p>FRANDSEN根植于强大的北欧设计基因，代表的是对有机、简洁和几何化照明解决方案的热爱。我们希望以此唤醒和激发人们的好奇心，让每一盏灯都能以自己的方式，为空间创造理想的环境，照亮生活中的每一个美好时刻。</p>
      <a class="brank_link" href="https://www.frandsen.com" target="_blank">www.frandsen.com</a>
      <div class="two-pic">
        <figure><img src="~/assets/images/AAmobile/brand/frand-left.png" alt=""></figure>
        <figure><img src="~/assets/images/AAmobile/brand/frand-right.png" alt=""></figure>
      </div>
    </div>
    <h3>我们的故事</h3>
    <div class="indent">
      <p>设计师Benny Frandsen先生在1968年设计了他的第一款灯具作品，同年创立了FRANDSEN品牌，希望将斯堪的纳维亚式照明美学在世界范围内传播。</p>
      <p>经过几代人的努力，FRANDSEN将经典设计和现代创新工艺结合，以此延续Benny Frandsen先生的设计精神，让好设计经久不衰。</p>
      <div class="video-ar" @click="play()">
        <video
          ref="videoE"
          src="~/assets/video/Interview.mp4"
          paused="paused"
          width="100%"
          height="100%"
        />
        <img v-if="hiddenVideo" src="~/assets/images/brand/3.png" class="ver-video">
        <img v-if="videoButton" src="~/assets/images/brand/play.png" class="play-button">
      </div>
      <div class="auth">
        FRANDSEN创始人Benny Frandsen采访视频
      </div>
    </div>
    <h3>创始人 Benny Frandsen</h3>
    <div class="indent">
      <p>作为品牌创始人，Benny Frandsen先生同样是一位优秀的设计师，在半个多世纪的设计生涯中，他和他的团队设计出了大量的经典产品，如：Ball系列、Benjamin系列、BF20系列、Kobe吊灯等。</p>
      <p>Benny Frandsen先生始终认为，＂只有对未来的大力投入品牌才有良好的未来发展潜力，所有付出最终体现在产品之中，因此每一件灯具都有自己的风格。＂</p>
      <figure><img src="~/assets/images/AAmobile/brand/frand-one.png" alt=""></figure>
      <p>Benny Frandsen先生代表作Ball系列灯具是在品牌初创时设计的，但在当时圆形灯并不常见，磁吸壁灯的设计非常适合家用，一经推出便大获成功，时至今日依旧畅销不衰。</p>
      <figure><img src="~/assets/images/AAmobile/brand/frand-two.png" alt=""></figure>
      <div class="auth">
        Ball系列灯具的手绘稿
      </div>
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
              FRANDSEN
            </div>
          </div>
          <div class="copy" @click="copyText('FRANDSEN')">
            <span class="copy-text">复制</span>
          </div>
        </div>
        <div class="contact-info">
          <div class="contact-icon">
            <div class="con-icon">
              <img src="~/assets/images/AAmobile/brand/weibo.jpg">
            </div>
            <div class="con-text">
              FRANDSEN
            </div>
          </div>
          <div class="copy" @click="weibo()">
            <span class="copy-text">关注</span>
          </div>
        </div>
        <div class="contact-info">
          <div class="contact-icon">
            <div class="con-icon">
              <img src="~/assets/images/AAmobile/brand/red.jpg">
            </div>
            <div class="con-text">
              FRANDSEN
            </div>
          </div>
          <div class="copy" @click="redBook()">
            <span class="copy-text">关注</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'FrandsenAbout',
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
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5cb45523000000001702130c?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663126527')
      this.brandTracking({ label: '小红书' })
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
