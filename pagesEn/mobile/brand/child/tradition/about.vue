<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <article class="brand-content">
    <h3>About & Tradition</h3>
    <div class="indent">
      <figure><img src="~/assets/images/AAmobile/brand/tradition.jpg" alt=""></figure>
      <p>&Tradition’s vision is to create a more conscious, comfortable and beautiful world. With a passionate approach to masterly design, we preserve icons of the past whilst creating the classics of tomorrow, bringing you a collection infused with enduring qualities that work to connect people and places.</p>
      <P>Always respectfully. Always made to last.</P>
      <a class="brank_link" href="https://www.andtradition.com" target="_blank">www.andtradition.com</a>
      <div class="two-pic">
        <figure><img src="~/assets/images/AAmobile/brand/trad-left.png" alt=""></figure>
        <figure><img src="~/assets/images/AAmobile/brand/trad-right.png" alt=""></figure>
      </div>
    </div>
    <h3 class="trad">A Century of Great Design</h3>
    <div class="indent">
      <figure><img src="~/assets/images/AAmobile/brand/trad-tion.png" alt=""></figure>
      <p>Spanning decades of timeless design icons – from Verner Panton’s norm-breaking Flowerpot lamp first produced in the late 1960s to Arne Jacobsen and Flemming Lassen’s Mayor sofa designed specifically for Søllerød’s city hall located in the outskirts of Copenhagen – &Tradition’s collection of furniture, lighting and interior objects ranges from reissued mid-century classics to contemporary pieces.</p>
      <figure><img src="~/assets/images/AAmobile/brand/tr-1.png" alt=""></figure>
      <p>Once fought-over by design appreciators at auctions around the world and available to only a handful of people, many of our products – including the Mayor sofa, Viggo Boesen’s Little Petra chair and some of the newly-added Hvidt & Mølgaard designs – are retrieved from original sketches and produced on a large scale for the first time ever.</p>
      <figure><img src="~/assets/images/AAmobile/brand/tr-2.png" alt=""></figure>
      <p>Alongside such mid-century gems are a number of contemporary pieces, the work of some of today’s most acclaimed international artists: Valencia-based Jaime Hayon, local studio Space Copenhagen, Swedish-raised designer Sami Kallio and Norwegian duo Anderssen & Voll – to name a few. </p>
      <figure><img src="~/assets/images/AAmobile/brand/tr-3.png" alt=""></figure>
    </div>
  </article>
</template>

<script>
export default {
  name: 'VerpanAbout',
  data () {
    return {}
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
      window.open('https://weibo.com/n/andtradition')
    },
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5f192584000000000101d1f4?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663126152')
    },
    goodHome () {
      window.open('https://m.haohaozhu.cn/user/azI0OU9FMjIzRnluL0NXVis2Q1MrQT09OjM3NTE0ZDEyNmFmOGVlOWZhMTY0MzkzZWUxN2I0ZWUz.html?is_share_activity=1&?is_share_activity=1&&hz_dev=ios&hz_share_plfm=link&hz_share_uid=d2RRQUYxZG5xOGVTcXFUdEIvY3N6UT09OmU5NzRmNzM1YWY0N2EzNjQ5MzE3Y2QzOTVjMDk1MWZi')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
