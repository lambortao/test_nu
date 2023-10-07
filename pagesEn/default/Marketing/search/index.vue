<template>
  <div>
    <div class="default-width site-is-default">
      <div class="marketing_container">
        <search-header
          :input-search="inputValue"
          is-search-page="yes"
        />

        <div
          class="
          material_list_content"
        >
          <v-placeholder v-if="$fetchState.pending" mode="loading" />
          <v-placeholder v-else-if="$fetchState.error" mode="error" />
          <div>
            <material-list v-if="materialListData.list.length" pagedifferent="search" :material-list="materialListData" @tracking="marketingTracking" />
            <p v-else>
              No Data
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import materialList from '../components/materialList.vue'
import searchHeader from '../components/SearchHeader.vue'
export default {
  name: 'MarketingSearchPage',
  components: {
    materialList,
    searchHeader
  },
  data: () => ({
    inputValue: ''
  }),
  fetch () {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    // console.log(query, 'query搜索页参数')
    this.inputValue = query.search
    this.$store.commit('marketingList/setkeyswords', query.search)
    this.$store.commit('marketingList/setPagination', query.page)
    this.$nextTick(async () => {
      await this.getMaterialList({ local: true, query })
    })
  },
  computed: {
    ...mapState({
      materialListData: state => state.marketingList.materialList
    })
  },
  watch: {
    '$route.query': '$fetch'
  },
  mounted () {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    this.inputValue = query.search
  },
  methods: {
    ...mapActions({
      handlePagination: 'marketingList/handlePagination',
      getMaterialList: 'marketingList/getMaterialList',
      useRouteParam: 'marketingList/useRequestParam'
    }),
    marketingTracking ({ event, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'MarketingHub-search', event, mode: 'MarketingHub', label, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/marketing-search.scss";
</style>
