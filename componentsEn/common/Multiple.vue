<template>
  <div class="multiple_box">
    <template v-if="isSingle == true">
      <div
        v-for="(item,index) in selectList"
        :key="item"
        :class="selsetId == index ? 'active' : '' "
        :style="newStyle"
        @click="singleSelect(index)"
      >
        {{ item }}
      </div>
    </template>
    <template v-else>
      <div
        v-for="(item,index) in muliList"
        :key="item.name"
        :class="item.isSelect ? 'active' : '' "
        :style="newStyle"
        @click="mulSelect(index)"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'MultipleComponent',
  props: {
    selectList: {
      type: [Object, Array],
      required: true
    },
    isSingle: {
      type: Boolean
    },
    newStyle: {
      type: String,
      default: 'width:195px'
    }
  },
  data: () => ({
    selsetId: null,
    muliList: null
  }),
  mounted () {
    if (this.isSingle) {
      // console.log(this.selectList)
    } else {
      const brandArray = _.cloneDeep(this.selectList)
      this.muliList = brandArray.map((item) => {
        item.isSelect = false
        return item
      })
    }
  },
  methods: {
    singleSelect (indx) {
      this.selsetId = indx
      this.$emit('singleSelect', this.selsetId)
    },
    mulSelect (index) {
      let muliString = ''
      this.muliList[index].isSelect = !this.muliList[index].isSelect
      muliString = this.muliList.filter(item => item.isSelect === true).map((item) => {
        return item.alias
      }).join(',')
      this.$emit('mulSelect', muliString)
    }
  }
}
</script>

<style lang="scss" scoped>
.multiple_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    width: 195px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    cursor: pointer;
  }
  .active {
    border: 2px solid #000;
    color: #000;
    font-weight: bold;
  }
}
</style>
