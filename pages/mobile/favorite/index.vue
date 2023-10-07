<template>
  <div>
    <content-tab v-model="activeKey" title="收藏夹" :disabled="edit">
      <tab-pane value="1" label="">
        <favorite-product v-model="edit" />
      </tab-pane>
      <template v-if="!edit" slot="header-control">
        <v-btn @click.native="handleEdit">
          编辑
        </v-btn>
      </template>
    </content-tab>
  </div>
</template>

<script>
import FavoriteProduct from './components/FavoriteProduct/index.vue'
import ContentTab from '~/components/AAMobile/ContentTab/index.vue'
import TabPane from '~/components/AAMobile/ContentTab/tabPane.vue'

export default {
  name: 'FavoritePage',
  components: {
    ContentTab,
    TabPane,
    FavoriteProduct
  },
  data () {
    return {
      edit: false,
      activeKey: '1',
      hasFavorite: false
    }
  },
  methods: {
    handleEdit () {
      this.edit = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/favorite.scss';

:deep(.ContentTab) {
  padding: 0;

  header {
    padding: mvw(24) mvw(24) 0;
  }

  .nav-list {
    padding-left: mvw(24);
    padding-right: mvw(24);
  }

  .pane-box {
    padding-top: 0;
  }
}
:deep(.ContentTab nav p) {
  height: 0;
}
</style>
