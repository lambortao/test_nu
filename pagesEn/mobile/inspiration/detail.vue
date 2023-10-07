<template>
  <div class="container">
    <header>
      <div class="content">
        <h3>Meiko的客厅</h3>
        <p>世界只有黑白但是有香味</p>
      </div>
      <span class="edit" />
    </header>
    <content-tab v-model="activeKey">
      <tab-pane value="1" label="产品">
        <p>产品</p>
      </tab-pane>
      <tab-pane value="2" label="文章">
        <p>文章</p>
      </tab-pane>
      <tab-pane value="3" label="视频">
        <p>视频</p>
      </tab-pane>
      <tab-pane value="4" label="案例">
        <p>案例</p>
      </tab-pane>
      <template v-if="!edit" slot="header-control">
        <v-btn @click.native="handleEdit">
          编辑
        </v-btn>
      </template>
    </content-tab>
    <footer-control>
      <button class="w-btn" @click="importDetail">
        导出
      </button>
      <button :class="['w-btn']" @click="edit">
        编辑产品
      </button>
      <button :class="['b-btn']" @click="share">
        分享
      </button>
    </footer-control>
  </div>
</template>

<script>
import ContentTab from '~/componentsEn/AAMobile/ContentTab/index.vue'
import TabPane from '~/componentsEn/AAMobile/ContentTab/tabPane.vue'
export default {
  name: 'InspirationPageDetail',
  components: {
    ContentTab,
    TabPane
  },
  data () {
    return {
      activeKey: '1'
    }
  },
  methods: {
    importDetail () {},
    edit () {},
    share () {}
  }
}
</script>

<style lang="scss" scoped>

@import '~/assets/scss/mobile/favorite.scss';
.container {
  header {
    padding: mvw(24) mvw(24) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin-bottom: mvw(8);
      font-size: mrem(40);
    }

    span {
      width: mvw(32);
      height: mvw(32);
      border-radius: mvw(16);
      background: {
        image: url('~/assets/images/AAmobile/favorite/edit.png');
        size: mvw(16);
        position: center;
        repeat: no-repeat;
        color: #f5f5f5;
      };
    }
  }
}
:deep(.ContentTab) {
  padding: 0;
  .nav-list.hide-title {
    padding: mvw(14) mvw(24);
  }
  .pane-box {
    padding: mvw(24) mvw(24) mvw(100);
  }
}
</style>
