<template>
  <div v-if="!created" class="container">
    <div v-if="!list.length" class="none">
      <figure><img src="~/assets/images/AAmobile/favorite/empty-inspiration.png" alt="灵感簿"></figure>
      <div class="content">
        <h4>您可以创建不同主题的灵感簿。</h4>
        <p>并将收藏夹中收录的产品、文章、视频选择添<br>加其中，形成属于您的家居设计灵感剪藏本。</p>
        <p>并可分享给您的家人或朋友，<br>或生成产品清单。</p>
        <button class="b-btn">
          创建第一个灵感簿
        </button>
      </div>
    </div>
    <div v-else class="list">
      <section v-for="item in list" :key="item.id">
        <header>
          <h4>{{ item.title }}</h4>
          <p>{{ createdSubtitle(item) }}</p>
        </header>
        <div class="product-img-list">
          <div :style="{ width: `${item.product.length * 20}vw` }">
            <figure v-for="img in item.product" :key="img">
              <img src="~/assets/images/AAmobile/favorite/p1.jpg" alt="">
            </figure>
          </div>
          <span v-if="item.product.length > 4">+{{ item.product.length }}</span>
        </div>
      </section>
    </div>
    <div class="favorite-btn">
      <figure><img src="~/assets/images/AAmobile/favorite.png" alt="灵感簿"></figure>
      <p @click="created = true">
        创建灵感簿
      </p>
    </div>
  </div>
  <created-inspiration v-else />
</template>

<script>
import CreatedInspiration from './created/index.vue'
export default {
  name: 'InspirationPage',
  components: {
    CreatedInspiration
  },
  data () {
    return {
      list: [{
        id: '1',
        title: 'Meiko的客厅',
        product: ['12', '12', '12'],
        article: 2,
        videos: 2,
        case: 1
      }, {
        id: '2',
        title: 'Meiko的客厅',
        product: ['12', '12', '12', '12', '12'],
        article: 2,
        videos: 2,
        case: 1
      }],
      created: false
    }
  },
  methods: {
    createdSubtitle (data) {
      let subTitle = ''
      if (data.product && data.product.length) {
        subTitle += `${data.product.length}个产品`
      }
      if (parseInt(data.article)) { subTitle += `，${data.article}篇文章` }
      if (parseInt(data.videos)) { subTitle += `，${data.videos}个视频` }
      if (parseInt(data.case)) { subTitle += `，${data.case}个案例` }
      return subTitle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/favorite.scss';
.container {
  min-height: calc(100vh - 34vw);
  background-color: #f6f6f6;
}
.none {
  width: 100%;
  height: 100%;

  figure {
    width: mvw(178);
    margin: mvw(150) auto mvw(50);
    img {
      width: 100%;
    }
  }
  .content {
    text-align: center;
    font-size: mrem(28);
    h3 {
      color: #333;
      opacity: 0.8;
    }
    p {
      margin: mvw(16) 0;
      color: #333;
      opacity: 0.8;
    }
    button {
      width: mvw(200);
      height: mvw(48);
      margin-top: mvw(50);
    }
  }
}
.list {
  padding: mvw(24);

  section {
    background-color: #fff;
    margin-bottom: mvw(20);
    padding: mvw(24) mvw(16) mvw(16);
    text-align: center;

    header {
      margin-bottom: mvw(24);
      h4 {
        font-size: mrem(36);
        margin-bottom: mvw(5);
      }
      p {
        font-size: mrem(24);
        color: #555;
      }
    }
    .product-img-list {
      width: 100%;
      height: mvw(67);
      position: relative;
      overflow: hidden;
      // overflow-x: auto;

      > div {
        display: flex;
        justify-content: flex-start;
      }
      figure {
        width: mvw(67);
        height: mvw(67);
        margin-right: mvw(8);
        img {
          display: block;
        }
      }
      > span {
        width: mvw(36);
        height: mvw(67);
        position: absolute;
        right: 0;
        top: 0;
        background-color: rgba($color: #000000, $alpha: 0.2);
        text-align: center;
        line-height: mvw(67);
        color: #fff;
        font-size: mrem(32);
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
