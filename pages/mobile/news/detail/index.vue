<template>
  <div class="news-detail-container">
    <header>
      <h2>{{ title }}</h2>
      <small>{{ date }}</small>
      <s-tags :tags="tags" />
    </header>
    <article>
      <img src="~/assets/images/AAmobile/news-placeholder.jpg" alt="">
      <p>2021 3daysofdesign 丹麦三日设计节于9月16日-18日在哥本哈根举行，作为丹麦规模最大的设计盛会，以满城好设计盛邀设计爱好者们前来参与。</p>
      <p>VERPAN 以蓝色为主题，将 Verner Panton 的经典设计和新品带去现场，呈现极具创新性与挑战性的家具世界，充分表达了物件独立性以及空间融洽氛围感，进一步展现 Panton 早期对柔和、平静的理想生活的憧憬。</p>
    </article>
  </div>
</template>

<script>
export default {
  name: 'NewsDetailPage',
  data () {
    return {
      title: '再一次，与VERPAN一起重温经典',
      date: '2021-09-27',
      tags: ['Verpan', 'News']
    }
  }
}
</script>
<style lang="scss" scoped>

.news-detail-container {
  width: 100vw;
  padding: mvw(24);
}
header {
  margin-bottom: mvw(30);

  h2 {
    font-size: mrem(40);
    margin-bottom: mvw(10);
  }
  small {
    display: block;
    margin-bottom: mvw(20);
    color: rgba($color: #000000, $alpha: 0.5);
  }
}
img {
  max-width: 100%;
  margin-bottom: mvw(15);
}
p {
  margin-bottom: mvw(15);
  line-height: 1.75em;
  color: #333;
  font-size: mrem(28);
}
</style>
