<template>
  <div class="news-hot">
    <article
      v-for="item in articleList"
      :key="item.id"
      @click="goNewsDetail(item.id)"
    >
      <figure><img src="~/assets/images/AAmobile/news.jpg" :alt="item.title"></figure>
      <div class="tags-list">
        <span
          v-for="tag in item.tags"
          :key="tag"
        >{{ tag }}</span>
      </div>
      <div class="content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'NewsHots',
  data () {
    return {
      articleList: [{
        id: '1',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }, {
        id: '2',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }, {
        id: '3',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }, {
        id: '4',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }]
    }
  },
  methods: {
    goNewsDetail (id) {
      this.$router.push(`/news/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.news-hot {
  width: 100%;

  article {
    margin-bottom: mvw(40);

    &:last-child {
      margin-bottom: 0;
    }
  }
  figure, img {
    width: 100%;
  }
  figure {
    margin-bottom: mvw(16);
  }
  div.tags-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: mvw(16);

    span {
      margin-right: mvw(8);
      padding: 0 mvw(10);
      height: mvw(20);
      line-height: mvw(20);
      background-color: #F6F7FB;
      border-radius: mvw(10);
      font-size: mrem(24);
      overflow: hidden;
      color: #333;
    }
  }
  .content {
    h3 {
      font-size: mrem(36);
      margin-bottom: mvw(6);
    }
    p {
      font-size: mrem(28);
      color: #999;
    }
  }
}
</style>
