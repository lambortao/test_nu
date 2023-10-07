<template>
  <article class="brand-content">
    <h3>可持续发展与认证</h3>
    <p>在HAY，我们为了让人们能更长久的与我们的产品生活，努力设计和生产持久耐用且具有功能性的作品。</p>
    <p>关于我们对减少环境影响的承诺，我们遵行以可持续的方式使用资源，努力使用最有效和最环保的方法、工具和材料。</p>
    <p>由于我们意识到我们的行为对环境有重大的影响，因此我们认真审视并负起责任，为更环保的未来做出贡献。</p>
    <figure><img src="~/assets/images/AAmobile/brand/pic8.jpg" alt=""></figure>
    <div class="indent">
      <h4>水性漆 / WATER-BASED LACQUER </h4>
      <p>部分的木制家具系列使用水性漆生产，它比普通的PU漆有很多优点。水性变体中的低VOC（挥发性有机化合物）含量，排放的污染物明显减少，这使得它更加环保，有助于创造更健康的工作环境和更好的室内气候。此外，水性漆通常比PU漆更耐用，所以木制家具也可以拥有更长的使用寿命。</p>
    </div>
    <figure><img src="~/assets/images/AAmobile/brand/pic9.jpg" alt=""></figure>
    <div class="indent">
      <h4>FSC®森林认证 (FSC-C153898)<br>FSC®-certified (FSC-C153898)<br>CERTIFICATION</h4>
      <p>HAY的大部分木制家具都通过了FSC®森林认证（FSC-C153898）。这意味着产品是由FSC®森林认证（FSC-C153898）的木材制成，这些木材来自可持续发展的森林，通过负责任的管理，减少了森林的砍伐，确保了森林的未来保护。认证产品是您的保证，HAY的木制家具是以一种对社会、经济和环境负责的方式生产的。</p>
    </div>
    <div>
      <figure><img src="~/assets/images/AAmobile/brand/pic_000.png" alt=""></figure>
      <!-- <figure><img src="~/assets/images/AAmobile/brand/pic10.jpg" alt=""></figure> -->
    </div>
    <div class="indent">
      <h4>欧盟生态标签/ EU ECOLABEL</h4>
      <p>欧盟生态标签是欧洲官方的卓越环境标签，颁发给在整个生命周期中符合高环境标准的产品和服务——从原材料的开采，到生产、分销和处置——产品都有拆装说明。获得欧盟生态标签的家具符合标准，保证任何原生木材、软木、竹子和藤条都来自合法和可持续管理的森林。有害物质的使用受到限制，任何装饰材料中的有害残留物都是有限的，而且产品的甲醛排放量很低。所有的产品都不含PVC，最终的涂层部件或整个家具产品的VOC排放符合规定的VOC排放标准。欧盟生态标签为消费者提供了一种识别环保产品的简便方法。</p>
    </div>
    <div class="two-pic">
      <figure><img src="~/assets/images/AAmobile/brand/pic12.jpg" alt=""></figure>
      <figure><img src="~/assets/images/AAmobile/brand/pic13.jpg" alt=""></figure>
    </div>
    <div class="indent">
      <h4>北欧天鹅生态标签 / NORDIC SWAN ECOLABLE</h4>
      <p>北欧天鹅生态标签是北欧地区的官方生态标签，欧盟生态标签是欧洲的官方生态标签。它们致力于减少生产和消费对环境的总体影响。为了确保对环境的最大影响，北欧天鹅生态标签和欧盟生态标签采用了整个生命周期的方法，并着眼于整个产品旅程。这意味着生态标签评估特定产品类型的环境影响，并对产品生命周期的所有相关阶段提出要求——从原材料、生产和使用，到废物、再利用和回收。</p>
      <p>北欧天鹅生态标签和欧盟生态标签都提倡循环经济，是确保可持续未来的有力工具。HAY通过开发可持续的、高质量的、经久耐用的产品来支持这一点。所有的构造都是以产品寿命结束后的拆卸和回收为重点。</p>
      <h4>生态运输 / ECO DELIVERY</h4>
      <p>货物运输在全球可持续发展中起着根本性的作用，这就是为什么它已经成为HAY的一个重点领域。在我们努力减少碳足迹的过程中，我们试图找到最环保的解决方案来运输我们的全球产品。这导致了与马士基ECO Delivery公司的新合作，该公司用可持续的低碳燃料ECO Delivery取代化石燃料，从而使HAY能够以更可持续的方式运输其货物。ECO Delivery使用的是经国际可持续发展和碳认证（ISCC）机构认证的低碳燃料，由回收的可持续生物质制造。展望未来，HAY将在我们的欧洲和亚太地区的海洋运输中使用ECO Delivery，我们认为这是我们迈向更可持续和负责任的经营方式的一个重要步骤。</p>
    </div>
    <div class="video-area" @click="playVideo()">
      <video
        ref="videoS"
        src="~/assets/video/ECO.mp4"
        paused="paused"
        width="100%"
        height="100%"
      />
      <img v-if="hiddenV" src="~/assets/images/brand/2.png" class="ver-video">
      <img v-if="videoB" src="~/assets/images/brand/play.png" class="play-button">
    </div>
    <div class="indent last">
      <h4>五年质保 / 5 YEAR WARRANTY</h4>
      <p>HAY 设计和家具生产均基于 HAY 商标。HAY 致力于设计和生产经久耐用的家具，同时 HAY 致力于实用高质量的生产材料，来确保产品的使用周期。</p>
      <p>HAY 为特定产品提供5年产品保修，包括家具设计和室内装潢材料及工艺制品。保修范围包括购买时有损坏，或由于购买时存在缺陷而发生的故障。保修期为5年，请以原始发票上的日期开始为准。</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'HaySustainable',
  data () {
    return {
      hiddenV: true,
      videoB: true
    }
  },
  mounted () {
  },
  methods: {
    playVideo () {
      this.hiddenV = false
      this.videoB = false
      console.log(this.$refs.videoS.paused, 'wwwwwwwwwwwwwwwwwwww')
      if (this.$refs.videoS.paused === true) {
        this.videoB = false
        this.$refs.videoS.play()
      } else {
        this.videoB = true
        this.$refs.videoS.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
