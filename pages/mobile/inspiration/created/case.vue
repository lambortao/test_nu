<template>
  <div class="container">
    <div class="article-list">
      <article
        v-for="item in articleList"
        :key="item.id"
        :class="{ close: selectedList.includes(item.id) }"
        @click="selectedItem(item.id)"
      >
        <span />
        <div class="bg" />
        <div class="content">
          <p>{{ item.title }}</p>
          <h3>{{ item.desc }}</h3>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import mixinSelectedItem from '../mixin/selectedItem'
export default {
  name: 'InspirationCreatedCase',
  mixins: [mixinSelectedItem],
  data () {
    return {
      articleList: [{
        id: '1',
        img: '',
        title: '上海宝格丽公寓',
        desc: '意式华丽与东方意象的灵感碰撞',
        tags: ['&tradition', 'Collection']
      }, {
        id: '2',
        img: '',
        title: '上海宝格丽公寓',
        desc: '意式华丽与东方意象的灵感碰撞',
        tags: ['&tradition', 'Collection']
      }, {
        id: '3',
        img: '',
        title: '上海宝格丽公寓',
        desc: '意式华丽与东方意象的灵感碰撞',
        tags: ['&tradition', 'Collection']
      }, {
        id: '4',
        img: '',
        title: '上海宝格丽公寓',
        desc: '意式华丽与东方意象的灵感碰撞',
        tags: ['&tradition', 'Collection']
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 60vw);
  padding: mvw(24) 0 mvw(100);
  background-color: #f6f6f6;

  article {
    width: mvw(327);
    height: mvw(80);
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: mvw(16) mvw(12);
    margin: 0 auto mvw(16);

    span {
      width: mvw(16);
      height: mvw(16);
      border-radius: mvw(8);
      border: mvw(2) solid #aaa;
    }
    &.close span {
      border: none;
      background: {
        image: url('~/assets/images/AAmobile/favorite/selected.png');
        size: 100%;
      };
    }
    div.bg {
      width: mvw(48);
      height: mvw(48);
      border: 1px solid #eee;
      margin: 0 mvw(10);
      background: {
        image: url('~/assets/images/AAmobile/news.jpg');
        size: auto 100%;
        position: center;
      };
    }
    .content {
      h3 {
        font-size: mrem(28);
      }
      p {
        font-size: mrem(24);
      }
    }
  }
}
</style>
