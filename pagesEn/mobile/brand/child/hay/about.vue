<template>
  <article class="brand-content">
    <h3>About HAY</h3>
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
    <p>In 2002, HAY was established as a new kind of design company in Denmark. Motivated by the certainty that good design is everyone’s right, HAY set out to innovate new ways to answer the ever-evolving needs of the modern world – but at a more accessible price point than industry standards.</p>
    <p>Co-founders and Creative Directors Mette and Rolf Hay committed to working with their generation’s best designers from all over the world to create high-quality products that would be available to a wide audience. This founding principle has always been HAY’s DNA, and it remains at the core of the company’s culture today.</p>
    <p>In 2003, HAY’s first furniture collection launched at IMM Cologne, and the first HAY shop opened in Copenhagen.</p>
    <p>Today, there are about 30 HAY stores throughout Europe, Asia, and USA.</p>
    <a class="brank_link" href="https://hay.dk/country-selector" target="_blank">www.hay.dk</a>
    <figure><img src="~/assets/images/AAmobile/brand/pic1.jpg" alt=""></figure>
    <h3>WHAT WE DO</h3>
    <p>HAY is motivated and inspired by the realities of life today, in which traditional divides between personal and professional space have become more fluid.</p>
    <p>To satisfy those conditions, our products span the realms of furniture, lighting, and accessories, and they are always flexible and adaptable, versatile and varied. That means they can be used in any environment and suit any need, from a living room to an office, hotel lounge, or cafe.</p>
    <p>In keeping with that spirit, HAY embraces the beauty of quotidian life by creating fresh takes on a wide range of products that are part of our everyday, from a toothbrush to a paper bin to a sofa. No object is too common, no detail too minute: HAY pays attention to the small moments that make up our lives.</p>
    <div class="two-pic">
      <figure><img src="~/assets/images/AAmobile/brand/pic2.jpg" alt=""></figure>
      <figure><img src="~/assets/images/AAmobile/brand/pic3.jpg" alt=""></figure>
    </div>
    <h3>HOW WE WORK</h3>
    <p>Every HAY product is developed in close collaboration between HAY’s Creative Directors Mette and Rolf Hay, their in-house designers and product- development teams in the Copenhagen office, and a loyal roster of contemporary designers based all around the world.</p>
    <p>We insist on creating products that are relevant, original, and, perhaps most of all, needed, so we care a lot about the idea and the vision behind everything we make. We believe that a clear starting point for every object — whether that be a new technology, a new material, or simply our feeling that this item is missing from the world — leads to a more fluid development process and a better, long-lasting end product.</p>
    <figure><img src="~/assets/images/AAmobile/brand/pic4.jpg" alt=""></figure>
    <h3>OUR BRAND</h3>
    <p>
      At HAY, we work with the world’s leading designers in a sustainable and democratic context that draws from three primary sources of inspiration: art, architecture, and fashion.
    </p>
    <p>We have always paid close attention to and been inspired by our surroundings, and putting our finger on the pulse of contemporary culture is how we keep pace with the world around us.</p>
    <i class="article-text">‘What I admire about art is the unexpected, the originality; architecture is of course the context and the home of what we make, and fashion has a wonderful dynamism to it, reflecting the spirit of the time and what’s happening right now. I would say that the best products we have done, they may exist somewhere in between these three environments, drawing from a little bit of everything.’— Rolf Hay</i>
    <figure><img src="~/assets/images/AAmobile/brand/pic5.jpg" alt=""></figure>
    <h3>OUR DNA</h3>
    <p>Four essential values at the core of HAY continue to shape and motivate the company today:PASSION, FUNCTION, COMMUNITY, RESPONSIBILITY.</p>
    <p>From Furniture to Accessories and Lighting, HAY’s in-house product development teams, our international designers, and of course our founding visionaries Mette and Rolf Hay eternally strive to maintain these values.No matter what product you are interested in, from a HAY pillow to a HAY dining table, HAY customers can feel confident that each of these values is behind every single one.</p>
    <figure><img src="~/assets/images/AAmobile/brand/pic6.jpg" alt=""></figure>
    <div class="indent">
      <h4>PASSION</h4>
      <p class="p-detail">
        At HAY, we are motivated by a love of design and a commitment to constant innovation. We are always challenging ourselves to create products that elevate the modest moments in peoples’ lives. This means thinking about everyday items in new, original ways, using the most cutting-edge materials, methods, tools, and technologies available.
      </p>
      <h4>FUNCTION</h4>
      <p class="p-detail">
        At HAY, form will always follow function. Our products are beautiful, sleek, fresh, and stylish — but we believe that use and comfort should come first. Our designs are prioritize the essential: we believe the simplest solution is usually the best solution.
      </p>
      <h4>COMMUNITY</h4>
      <p class="p-detail">
        HAY is an international company: HAY design crosses borders. From our designers to our suppliers to our in-house product-development teams, collaboration is fundamental to HAY. We believe we are stronger for our partnerships: the synergy achieved by numerous minds, skill sets, tools, and hands working in harmony is what drives and motivates us every day.
      </p>
      <h4>RESPONSIBILITY</h4>
      <p class="p-detail">
        High-quality means thoughtfully designed, well crafted, and built to last. At HAY, we strive to minimize our footstep on the planet while making durable products that we hope will live with you for a long time. We always hold ourselves to high standards, so each of our product categories has its own team of designers, technicians, and engineers who ensure that every product has been considered from every angle, and has withstood quality-control checks on all fronts.
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
  methods: {
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
