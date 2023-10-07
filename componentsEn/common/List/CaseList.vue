<template>
  <div class="case_list_box">
    <div
      class="case_list_item"
    >
      <div
        v-for="(item,index) in caseList.lists"
        :key="index"
        class="case_item"
        :class="caseList.lists.pageTotal === 1? borders : ''"
      >
        <div class="items">
          <div v-if="item.thumbnail !== undefined" :style="{ backgroundImage: `url(${item.thumbnail})` }" class="case_icon" />
          <div class="item">
            <div class="brands">
              <div v-for="(items,ind) in item.brandids" :key="ind" class="brand-label">
                <div v-if="item.brandids.length > 0" class="label">
                  {{ items }}
                </div>
              </div>
            </div>
            <div class="case_title">
              <h5>
                {{ item.subtitle_en }}        {{ item.title_en }}
              </h5>
            </div>
            <div class="country">
              {{ item.city_en }}  {{ item.country_en }}
            </div>
            <div class="case_detail" @click="goDetail(item.alias)">
              <div class="case_text">
                <h5>
                  View All
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 文章或产品列表类型type :product article
// 显示排序或者创建灵感簿
export default {
  name: 'CaseListComponent',
  props: {
    caseList: {
      type: Object,
      default: null
    }
  },
  data: () => ({
  }),
  methods: {
    goDetail (brandId) {
      this.$router.push({ path: '/en/casedetail', query: { brandId } }, () => {}, () => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.case_list_box {
  margin: 0 auto;
}
.case_list_item {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  // margin: 0 160px;
  margin: 0 auto;
  margin-top: 64px;
}
.padds {
  padding-right: 64px;
}
.items {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.item {
  width: 400px;
}
.case_icon {
  width: 360px;
  height: 260px;
  margin-right: 40px;
  background: #D8D8D8;
  // margin-right: 40px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}
.brands {
  display: flex;
  flex-wrap: wrap;
}
.brand-label {
  background: #B2B2B2;
  color: #fff;
  font-size: 14px;
  margin-right: 20px;
}
.label {
  padding: 3px 10px;
}
.case_title {
  width: 304px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  line-height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 20px;
}
.country {
  font-size: 14px;
  font-weight: 400;
  color: #B2B2B2;
  line-height: 21px;
  margin-top: 12px;
}
.case_detail {
  width: 160px;
  height: 40px;
  border: 1px solid #000000;
  backdrop-filter: blur(3px);
  margin-top: 30px;
  text-align: center;
  cursor: pointer;
}
.case_text {
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  line-height: 40px;
}
.line {
  width: 100%;
  height: 1px;
  background: #DDDDDD;
  border-radius: 1px;
  margin-top: 64px;
}
.case_item {
  // width: 50%;
  width: calc(100% / 2);
  // width: 780px;
  padding-top:84px ;
  padding-bottom: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
}
.case_item:not(:nth-child(2n)){
padding-top: 64px;
}
.case_item:nth-last-child(3) ~ .case_item{
border: none;
}
.borders {
  border: none;
}
</style>
