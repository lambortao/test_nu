<template>
  <article class="brand-content">
    <h3>关于 HAY</h3>
    <div class="video-area" @click="play()">
      <video
        ref="videoE"
        src="~/assets/video/HAY.mp4"
        paused="paused"
        width="100%"
        height="100%"
      />
      <img v-if="hiddenVideo" src="~/assets/images/brand/1.png" class="ver-video">
      <img v-if="videoButton" src="~/assets/images/brand/play.png" class="play-button">
    </div>
    <p>丹麦设计品牌 HAY 成立于 2002 年 ，尊崇“每个人都应享有好设计”的理念，持续以创新且平易近人的方式，来满足现代世界瞬息万变的需求。</p>
    <p>HAY 联合创始人与创意总监 Mette 和 Rolf Hay 许下承诺，他们会与这个世代来自世界的优秀设计师合作，以高品质的作品，推广给更多人使用。这一个原则深植于 HAY 的 DNA，至今仍是品牌文化的核心。</p>
    <p>2003年，HAY 的第一个家具系列在科隆国际家具展发布，同时，第一家门店于哥本哈根开业。如今，HAY 在欧洲、亚洲和美国设有 25 家分店。</p>
    <a class="brank_link" href="https://hay.dk/country-selector" target="_blank">www.hay.dk</a>
    <figure><img src="~/assets/images/AAmobile/brand/pic1.jpg" alt=""></figure>
    <h3>我们的创造</h3>
    <p>HAY 受到当今生活的激励和启发，个人空间和工作空间之间的传统距离变得切换自如。空间的功能性被拓展，为了满足新的需求，我们的产品涵盖了家具、照明和配饰领域，并且始终灵活多变、适应性强、功能多样。满足从起居室到办公室、酒店休息室或咖啡馆的多种需要。</p>
    <p>秉承这种精神，HAY 通过在各种各样的产品上进行创新设计来重拾平凡生活中的美。</p>
    <p>这些产品中部分为我们日常所使用，从收纳到桌子到座椅，回归生活本身，装点多样空间，制造点滴快乐，为我们生活的每个微小时刻，锦上添花。</p>
    <div class="two-pic">
      <figure><img src="~/assets/images/AAmobile/brand/pic2.jpg" alt=""></figure>
      <figure><img src="~/assets/images/AAmobile/brand/pic3.jpg" alt=""></figure>
    </div>
    <h3>我们的运作方式</h3>
    <p>HAY 的所有产品开发均与创意总监 Mette 和 Rolf Hay 息息相关，他们在哥本哈根办公室的设计师和产品开发团队与遍布全球的当代设计师密切合作、共同研发。</p>
    <p>“我们坚持设计有意义的、原创的、可能最重要的是被人们需要的产品，因此我们非常在意所做的一切背后的构思和初衷。我们坚信每个目标都有一个明确的起点——无论是一项新技术、一款新材料，或者仅仅是我们认为在生活中缺失这一件产品。这使我们的开发流程更加流畅和完善，最终的产品也更加经久耐用。”</p>
    <figure><img src="~/assets/images/AAmobile/brand/pic4.jpg" alt=""></figure>
    <h3>我们的品牌观</h3>
    <p>
      在 HAY 的大家庭里，我们崇尚在可持续发展、民主和谐的环境中与全球领先的设计师合作。灵感主要来自于三个来源：
      艺术，建筑和时尚。
    </p>
    <p>我们始终密切关注周围的环境并从中汲取灵感，与时俱进则是我们与周围世界保持同步的基本方式。</p>
    <i class="article-text">“我对艺术的钦佩源自于它的出乎意料和独特创意，建筑当然是我们所创造的环境和家园，而时尚则赋予它奇妙的活力，反映了时代精神和当下事物。 我想说的是，我们所做的最好产品可能存在于这三个元素之间的某个地方，并从每个元素中汲取点滴灵感。”</i>
    <figure><img src="~/assets/images/AAmobile/brand/pic5.jpg" alt=""></figure>
    <h3>我们的核心价值</h3>
    <p>HAY 的四个核心价值仍在不断塑造和激励着公司：PASSION 激情，FUNCTION 功能，COMMUNITY 团体，RESPONSIBILITY 责任。</p>
    <p>从家具到配件和灯具，HAY 的内部产品开发团队、来自全世界的合作设计师以及我们的创始人 Mette 和 Rolf Hay 始终致力于坚持这些核心价值。</p>
    <p>无论您对哪件产品感兴趣，从抱枕到餐桌，HAY 的顾客都可以确信每件单品中都倾注了这些价值观。</p>
    <figure><img src="~/assets/images/AAmobile/brand/pic6.jpg" alt=""></figure>
    <div class="indent">
      <h4>激情 PASSION</h4>
      <p class="p-detail">
        在 HAY，我们对设计的热爱和创新的坚持激励着我们不断挑战自我，创造能够提升人们日常生活品质的产品。这意味着要突破陈规，运用现有最先进的材料、方法、工具和技术，以独特、原创的方式 重新思考日常用品。
      </p>
      <h4>功能 FUNCTION</h4>
      <p class="p-detail">
        遵循功能创造形态，我们的产品不仅美观、精细、创新、时尚，并且始终以实用和舒适为首要目标。 我们的设计秉承需求至上，坚信极简才是最好的解决方案。
      </p>
      <h4>团体 COMMUNITY</h4>
      <p class="p-detail">
        遵循功能创造形态，我们的产品不仅美观、精细、创新、时尚，并且始终以实用和舒适为首要目标。 我们的设计秉承需求至上，坚信极简才是最好的解决方案。
      </p>
      <h4>责任 RESPONSIBILITY</h4>
      <p class="p-detail">
        高质量意味着精心设计、精湛工艺和经久耐用。 在 HAY，我们致力于减少产品生产中对地球的影响，以期与您一起更久地在地球上共存。我们始终坚持高标准，因此我们的每个产品类别都有相应的设计师、技术人员和工程师团队，以确保从各个角度全面考量每件产品，以经受住各方面的 严格质检。
      </p>
    </div>
    <figure><img src="~/assets/images/AAmobile/brand/pic7.jpg" alt=""></figure>
  </article>
</template>

<script>
export default {
  name: 'HayAbout',
  data () {
    return {
      hiddenVideo: true,
      videoButton: true
    }
  },
  mounted () {
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
