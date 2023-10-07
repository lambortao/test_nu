<template>
  <article class="brand-content">
    <h3>关于 & Tradition</h3>
    <div class="indent">
      <figure><img src="~/assets/images/AAmobile/brand/tradition.jpg" alt=""></figure>
      <p>&Tradition 成立于2010年,是一家将传统与创新相结合的丹麦设计公司。我们独特的家具和灯具设计组合从20世纪30年代到现在,涵盖了国际一流设计师的著名设计作品。</p>
      <p>&Tradition旨在将北欧传统融入当代设计,承前启后，创造出具有永恒魅力的家具、灯具和饰品。</p>
      <p>通过与国际知名设计师合作，将昔日大师们的标志性设计重新定义为当代的创新经典。功能与外观相辅、工艺与创意相成，塑造出具有实用性的精心设计。</p>
      <p>满怀崇敬，持之以恒。</p>
      <a class="brank_link" href="https://www.andtradition.com" target="_blank">www.andtradition.com</a>
      <div class="two-pic">
        <figure><img src="~/assets/images/AAmobile/brand/trad-left.png" alt=""></figure>
        <figure><img src="~/assets/images/AAmobile/brand/trad-right.png" alt=""></figure>
      </div>
    </div>
    <h3 class="trad">
      经典设计，跨越百年
    </h3>
    <div class="indent">
      <figure><img src="~/assets/images/AAmobile/brand/trad-tion.png" alt=""></figure>
      <p>
        &Tradition旨在将北欧传统融入当代设计,承前启后,
        创造出具有永恒魅力的家具、灯具和饰品。通过与国
        际知名设计师合作，将昔日大师们的标志性设计重
        新定义为当代的创新经典。功能与外观相辅、工艺与创意相成，塑造出具有实用性的精心设计。
      </p>
      <figure><img src="~/assets/images/AAmobile/brand/trad-one.png" alt=""></figure>
      <div class="auth">
        Boomerang Lounge Chair 手绘稿
      </div>
      <figure><img src="~/assets/images/AAmobile/brand/trad-two.png" alt=""></figure>
      <div class="auth">
        Drop Leaf Table 手绘稿
      </div>
      <figure><img src="~/assets/images/AAmobile/brand/trad-three.png" alt=""></figure>
      <div class="auth">
        Little Petra Lounge Chair 手绘稿
      </div>
      <figure><img src="~/assets/images/AAmobile/brand/trad-four.png" alt=""></figure>
      <div class="auth">
        Rely Chair 手绘稿
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
              andtrandition
            </div>
          </div>
          <div class="copy" @click="copyText('ANDTRANDITION')">
            <span class="copy-text">复制</span>
          </div>
        </div>
        <div class="contact-info">
          <div class="contact-icon">
            <div class="con-icon">
              <img src="~/assets/images/AAmobile/brand/red.jpg">
            </div>
            <div class="con-text">
              andtrandition
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
              andtrandition
            </div>
          </div>
          <div class="copy" @click="redBook()">
            <span class="copy-text">关注</span>
          </div>
        </div>
        <div class="contact-info">
          <div class="contact-icon">
            <div class="con-icon">
              <img src="~/assets/images/AAmobile/brand/danmai.jpg">
            </div>
            <div class="con-text">
              andtrandition
            </div>
          </div>
          <div class="copy" @click="goodHome()">
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
      this.brandTracking({ label: '公众号' })
      return res
    },
    weibo () {
      window.open('https://weibo.com/n/andtradition')
      this.brandTracking({ label: '微博' })
    },
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5f192584000000000101d1f4?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663126152')
      this.brandTracking({ label: '小红书' })
    },
    goodHome () {
      window.open('https://m.haohaozhu.cn/user/azI0OU9FMjIzRnluL0NXVis2Q1MrQT09OjM3NTE0ZDEyNmFmOGVlOWZhMTY0MzkzZWUxN2I0ZWUz.html?is_share_activity=1&?is_share_activity=1&&hz_dev=ios&hz_share_plfm=link&hz_share_uid=d2RRQUYxZG5xOGVTcXFUdEIvY3N6UT09OmU5NzRmNzM1YWY0N2EzNjQ5MzE3Y2QzOTVjMDk1MWZi')
      this.brandTracking({ label: '好好住' })
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
