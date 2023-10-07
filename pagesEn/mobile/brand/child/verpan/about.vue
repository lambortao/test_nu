<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <article class="brand-content">
    <h3>About Verpan</h3>
    <div class="indent">
      <p>Verpan is - much like Verner Panton - a product of the Danish design tradition, which have put Denmark on the world map for functional, modern and unique design.</p>
      <a class="brank_link" href="https://www.verpan.com" target="_blank">www.verpan.com</a>
      <div class="two-pic">
        <figure><img src="~/assets/images/AAmobile/brand/verpan-left.jpg" alt=""></figure>
        <figure><img src="~/assets/images/AAmobile/brand/verpan-right.jpg" alt=""></figure>
      </div>
      <p>The story of Verpan began in 2003, when the first production of Verner Panton lighting was initiated. In 2010 a furniture range was added. Today, Verpan offers a carefully curated selection of Verner Panton’s timeless designs. Our product range include iconic furniture and lighting pieces that offers extraordinary user experiences and facilitate new ways of living, working and interacting.</p>
      <p>Verpan is proud to carry on the legacy of Verner Panton as an official licensee of Verner Panton Design AG - the exclusive owner of all Verner Panton designs.</p>
    </div>
    <div class="two-pic">
      <figure><img src="~/assets/images/AAmobile/brand/vicon-left.jpg" alt=""></figure>
      <figure><img src="~/assets/images/AAmobile/brand/vicon-right.jpg" alt=""></figure>
    </div>
    <h3 class="h3">THE NAME BEHIND THE BRAND</h3>
    <h3 class="h3">Verner Panton</h3>
    <div class="indent">
      <p>Among the giants of Danish design, Verner Panton (1926-1998) established a unique reputation for his exuberant originality and tireless experimentation. Panton created lamps, furniture and textiles – and was also a sought-after interior designer. Although he was at the forefront of mid-century Danish Modern, Panton’s contribution was anything but mainstream.</p>
      <figure><img src="~/assets/images/AAmobile/brand/ver.jpg" alt=""></figure>
      <p>He enthusiastically embraced new materials, he splashed with a bold colour palette, and he playfully imbued many of his sculptural creations with a strong graphical expression – without ever compromising on quality or workmanship. Panton’s iconic designs have emerged as contemporary design classics – as strikingly inventive now as they were 50 years ago.</p>
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
