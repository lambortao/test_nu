<template>
  <div>
    <div class="default-width site-is-default">
      <div class="marketing_container">
        <div v-if="false" class="back">
          <NuxtLink :to=" selectedSubId ? `/Marketing?categories=${selectedSubId}&tag=${selectedThirdId}` : '/Marketing'">
            营销工具包
          </NuxtLink>  >  {{ materialDetail.title }}
        </div>
        <template v-if="materialDetail">
          <div class="header_wrap">
            <div class="list_tmb_box">
              <img :src="materialDetail.list_tmb" alt="" class="tmb_icon">
            </div>
            <div class="list_info_wrap">
              <div class="info_title">
                <div class="title">
                  {{ materialDetail.title }}
                </div>
                <div class="time">
                  {{ materialDetail.start_time }}
                </div>
              </div>
              <template v-if="materialDetail.file">
                <div class="info_pdf">
                  <div class="pdf_wrap">
                    <img src="~/assets/images/marketing/pdf.png" alt="">
                  </div>
                  <div class="pdf_name">
                    {{ materialDetail.file.name }}
                  </div>
                </div>
                <div class="btn_box">
                  <div class="preview_file" @click="previewPdfEvent(materialDetail.file)">
                    预览
                  </div>
                  <a v-if="materialDetail.file" class="down_file" :href="materialDetail.file.url" download target="_blank">
                    <span @click="downloadEvent()">下载</span>
                  </a>
                </div>
              </template>
            </div>
          </div>
          <div v-if="materialDetail.content" class="desc_text_wrap">
            <div class="txt">
              物料描述
            </div>
            <div class="content">
              <p v-html="materialDetail.content" />
            </div>
          </div>
        </template>
        <!-- <template v-else>
          暂无数据
        </template> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'MarketingDetailPage',
  components: {},
  data: () => ({
    materialId: ''
  }),
  async fetch () {
    const materialId = this.$route.query.id
    this.materialId = materialId
    this.$store.commit('marketingDetail/setRequestDetailData', {
      resources_id: materialId
    })
    await this.getMaterialDetail()
  },
  computed: {
    ...mapState({
      materialDetail: state => state.marketingDetail.materialDetail,
      selectedThirdId: state => state.marketing.selectedThirdId,
      selectedSubId: state => state.marketing.selectedSubId
    })
  },
  watch: {
    '$route.query': '$fetch'
  },
  mounted () {},
  methods: {
    ...mapActions({
      getMaterialDetail: 'marketingDetail/getMaterialDetail'
    }),
    previewPdfEvent ({ url }) {
      window.open(url, '_blank')
      this.macketTracking({ event: 'file_preview', label: this.materialDetail.title })
    },
    downloadEvent (file) {
      this.macketTracking({ event: 'file_download', label: this.materialDetail.title })
    },
    macketTracking ({ event, label }) {
      this.$store.dispatch('site/tracker', { page: 'MarketingHub-detail', event, mode: 'MarketingHub', label })
    }

  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/marketing-detail.scss";
</style>
