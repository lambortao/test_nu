<template>
  <div class="tag-box">
    <p v-if="getIdentity.includes('1')" class="tag common">
      普通会员
    </p>
    <p v-if="getIdentity.includes('2')" class="tag designer">
      设计师
    </p>
    <p v-if="getIdentity.includes('3')" class="tag firend">
      合作伙伴
    </p>
    <p v-if="getIdentity.includes('4')" class="tag kol">
      博主
    </p>
    <p v-if="getIdentity.includes('5')" class="tag media">
      媒体
    </p>
    <p v-if="getIdentity.includes('6')" class="tag staff">
      员工
    </p>
  </div>
</template>

<script>
export default {
  name: 'IdentityTags',
  computed: {
    getIdentity () {
      return this.$store.getters['login/getIdentity']
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  height: vw(30);
  border-radius: vw(16);
  display: inline-block;
  text-align: center;
  min-width: vw(100);
  line-height: vw(30);
  padding: 0 vw(10);
  margin: 0;
  color: #fff;
  // font-size: rem(18);
  font-size: vw(16);
  font-weight: 400;

  &.common {
    color: #bbb;
    border: 1px solid #bbb;
  }
  &.staff {
    background-color: #9AAE99;
    color: #fff;
  }
  &.firend {
    background-color: #BCAF9F;
    color: #fff;
  }
  &.kol {
    background-color: #6E8FA0;
    color: #fff;
  }
  &.media {
    background-color: #6E8FA0;
    color: #fff;
  }
  &.designer {
    background-color: #9F8998;
    color: #fff;
  }
}
</style>
