<template>
  <div class="news-hot">
    <article
      v-for="item in articleList"
      :key="item.id"
    >
      <figure><img src="~/assets/images/AAmobile/news.jpg" :alt="item.title"></figure>
      <s-tags :tags="item.tags" />
      <div class="content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
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
