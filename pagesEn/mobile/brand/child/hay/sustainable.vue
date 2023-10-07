<template>
  <article class="brand-content">
    <h3>SUSTAINABILITY & CERTIFICATE</h3>
    <p>HAY focuses on developing long-lasting products that minimise our environmental impact. We optimise the use of sustainable materials such as recycled materials, FSC-certified wood and water-based lacquer, with a growing number of eco-certified products. We have strict regulatory requirements, and the majority of our products are tested to comply with international standards for strength, durability and safety.</p>
    <figure><img src="~/assets/images/AAmobile/brand/pic8.jpg" alt=""></figure>
    <div class="indent">
      <h4>WATER-BASED LACQUER</h4>
      <p>The majority of our wooden furniture collection is produced with a water-based lacquer, which has many advantages over normal PU lacquer. The low VOC (volatile organic compounds) content in the water-based variant emits significantly fewer pollutants, which makes it much more environmentally friendly, contributing to a healthier working environment and better indoor climate. Furthermore, water-based lacquer is often more durable than PU lacquer, so your wooden furniture can have a longer lifetime too.</p>
    </div>
    <figure><img src="~/assets/images/AAmobile/brand/pic9.jpg" alt=""></figure>
    <div class="indent">
      <h4>FSC®-certified (FSC-C153898)<br>CERTIFICATION</h4>
      <p>The majority of HAY’s wooden furniture is FSC®-certified (FSC-C153898). This means the products are made from FSC®-certified (FSC-C153898) wood sourced from sustainable forests with responsible management that reduces deforestation and ensures the forests’ future preservation. Certified products are your assurance that HAY’s wooden furniture has been produced in a socially, economically and environmentally responsibly way.</p>
    </div>
    <div>
      <figure><img src="~/assets/images/AAmobile/brand/pic_000.png" alt=""></figure>
      <!-- <figure><img src="~/assets/images/AAmobile/brand/pic10.jpg" alt=""></figure> -->
    </div>
    <div class="indent">
      <h4>EU ECOLABEL</h4>
      <p>The EU Ecolabel is the official European ecolabel of environmental excellence that is awarded to products and services meeting high environmental standards throughout their life cycle – from raw material extraction, to production, distribution and disposal – the products have a disassembly instruction. EU-Ecolabelled furniture meet criteria that guarantee that any virgin wood, cork, bamboo and rattan are sourced from legal and sustainably managed forests. The use of hazardous substances is restricted, harmful residues in any upholstery are limited, and the products have low formaldehyde emissions. All products are free from PVC, and the VOC emissions from the final coated component or entire furniture product meet defined VOC emission criteria. The EU Ecolabel offers the consumer an easy way to identify an environmentally-friendly product.</p>
    </div>
    <div class="two-pic">
      <figure><img src="~/assets/images/AAmobile/brand/pic12.jpg" alt=""></figure>
      <figure><img src="~/assets/images/AAmobile/brand/pic13.jpg" alt=""></figure>
    </div>
    <div class="indent">
      <h4>NORDIC SWAN ECOLABELS</h4>
      <p>The Nordic Swan Ecolabel is the official ecolabel in the Nordics and the EU Ecolabel is the official ecolabel in Europe. They work to reduce the overall environmental impact from production and consumption. To ensure maximum environmental impact, the Nordic Swan Ecolabel and the EU Ecolabel take an entire life cycle approach and look at the full product journey. This means that the ecolabels evaluate the environmental impact of the specific product type and set requirements in all relevant stages of the product life cycle – from raw materials, production and use, to waste, re-use and recycling.</p>
      <h4>ECO DELIVERY</h4>
      <p>Freight transportation plays a fundamental role in global sustainable development, which is why it has become a focus area for HAY. In our efforts to minimise our carbon footprint, we sought to find the most environmentally-friendly solution for transporting our products worldwide. This has resulted in a new partnership with Maersk ECO Delivery, which replaces fossil fuels with sustainable, low-carbon fuel, ECO Delivery, and thus enables HAY to transport its cargo in a more sustainable way. ECO Delivery uses a low-carbon fuel certified by the International Sustainability and Carbon Certification (ISCC) body and manufactured from recycled sustainable biomass. Looking forward, HAY will use ECO Delivery for our Europe and APAC ocean transport, and we see this as an important step in our journey towards a more sustainable and responsible way of running our business.</p>
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
      <h4>5 YEAR WARRANTY</h4>
      <p>HAY designs and manufactures furniture under the trademark HAY. HAY is dedicated to design and produce durable furniture which is designed to last. HAY puts great effort into choosing materials of high quality which help to secure the long life span of the products.</p>
      <p>HAY provides a 5-year product warranty, which covers materials and workmanship on our furniture frame and upholstery. The warranty covers faults which were present at the time of purchase or which have occurred as a result of defects present at the time of purchase. The warranty period of 5 years is calculated from the date on the original invoice.</p>
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
