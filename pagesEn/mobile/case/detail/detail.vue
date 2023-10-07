<template>
  <div class="container">
    <div class="showimg">
      <div class="main">
        <div class="button">
          <div v-for="(items, ind) in group" :key="ind" class="icons" :class="index === ind ? 'active': '' " @click="getUrl(items.img,ind)">
            <img :src="items.img" class="img">
          </div>
        </div>
      </div>
      <div v-if="isShow" class="context">
        <div class="main-area">
          <div class="close" @click="close()">
            <img src="~/assets/images/AAmobile/case/vector.png">
          </div>
          <div class="picture">
            <img v-if="details.option.images" :src="details.option.images[0]" class="imgs">
          </div>
          <div class="title">
            <h3>{{ details.option.title }}</h3>
          </div>
          <div class="artlce">
            <p v-html="details.option.content" />
          </div>
          <div class="look">
            <div class="look-text">
              查看详情
            </div>
          </div>
        </div>
      </div>
      <img ref="anchor" :src="url" class="big">
      <div :style="{ width: `${anchorImgWidth}px` }" class="ar">
        <div v-for="(item, inds) in anchor" :key="inds" class="crile-area" :style="{ top: item.top, left: item.left }">
          <div class="big-cr" @click="showDescribe(item)">
            <div class="small-cr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailPage',
  data () {
    return {
      group: '',
      isShow: false,
      detailList: '',
      list: '',
      url: '',
      index: 0,
      top: '60.82353%',
      left: '60.3444%',
      anchor: '',
      newArr: '',
      details: '',
      anchorImgWidth: 0
    }
  },
  created () {
    this.getDetailList()
  },
  mounted () {
  },
  methods: {
    getImgWidth (url) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => {
          resolve(this.$refs.anchor.offsetWidth)
          console.log(this.$refs.anchor.offsetWidth, 'an')
        }
      })
    },
    async getDetailList () {
      const list = await this.$axios.$post('/getCaseItem', { method: this.$route.query.brandId })
      this.detailList = list
      this.url = this.$route.query.url
      this.anchorImgWidth = await this.getImgWidth(this.url)
      this.group = this.detailList.AnchorGroup
      for (let i = 0; i < this.group.length; i++) {
        if (this.url === this.group[i].img) {
          this.anchor = this.group[i].anchor
          this.index = i
        }
      }
      for (let x = 0; x < this.group.length; x++) {
        if (this.url === this.group[x].img) {
          this.newArr = this.group.slice(x, this.group.length + 1)
        }
      }
      this.group.splice(this.index, this.group.length - this.index)
      this.group = this.newArr.concat(this.group)
      for (let i = 0; i < this.group.length; i++) {
        if (this.url === this.group[i].img) {
          this.anchor = this.group[i].anchor
          this.index = i
        }
      }
    },
    async getUrl (url, index) {
      this.url = url
      this.anchorImgWidth = await this.getImgWidth(this.url)
      this.index = index
      this.anchor = this.group[index].anchor
    },
    showDescribe (item) {
      console.log(this.anchor, 'aaaa')
      console.log(item, 'items')
      this.details = item
      this.isShow = true
    },
    close () {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand-detail.scss';
img {
    width: 100%;
    object-fit: contain;
}
</style>
