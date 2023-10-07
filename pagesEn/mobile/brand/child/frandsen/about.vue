<template>
  <article class="brand-content">
    <h3>Our DNA </h3>
    <div class="indent">
      <p>At Frandsen, we create decorative, timeless lighting that inspire curiosity and add personality to any space, and with inspiring lighting designs, we brighten the lives of people everywhere. </p>
      <p>Rooted in a strong design heritage, we represent a love of organic, simple and graphic lighting solutions. Our products are honest and built to last with sustainability being a vital part of our state of mind. </p>
      <p>Our style is international with a touch of Nordic, and the overall vibe is joyful and positively easy-going. </p>
      <a class="brank_link" href="https://www.frandsen.com" target="_blank">www.frandsen.com</a>
      <div class="two-pic">
        <figure><img src="~/assets/images/AAmobile/brand/frand-left.png" alt=""></figure>
        <figure><img src="~/assets/images/AAmobile/brand/frand-right.png" alt=""></figure>
      </div>
    </div>
    <h3>Our Story.</h3>
    <div class="indent">
      <p>It all began in 1968 when Frandsen’s founder, Benny Frandsen, designed his first lamp. Since then, Frandsen has kept evolving Benny’s designs keeping true to his design heritage while striving to make our designs last and inspire for generations and bridging Benny’s everlasting classics with the new to come. </p>
    </div>
    <h3>
      The Founder of Frandsen<br>
      Benny Frandsen
    </h3>
    <div class="indent">
      <figure><img src="~/assets/images/AAmobile/brand/frand-one.png" alt=""></figure>
      <p>Benny Frandsen designed his first lamp in 1968. That same year, he designed the BALL pendant and wall lamp, which is still relevant today as Frandsen keeps evolving, expanding and adding new colours to the collection. Benny Frandsen has won numerous international design awards for his lamp designs over the years, and in 2018 he celebrated his 50th anniversary with Frandsen.</p>
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
      console.log('复制成功')
      document.body.oncopy = function () {
        alert('复制成功!')
      }
      return res
    },
    weibo () {
      window.open('https://weibo.com/u/7496459897')
    },
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5cb45523000000001702130c?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663126527')
    },
    play () {
      this.hiddenVideo = false
      this.videoButton = false
      console.log(this.$refs.videoE.paused, 'wwwwwwwwwwwwwwwwwwww')
      if (this.$refs.videoE.paused === true) {
        this.videoButton = false
        this.$refs.videoE.play()
      } else {
        this.videoButton = true
        this.$refs.videoE.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
