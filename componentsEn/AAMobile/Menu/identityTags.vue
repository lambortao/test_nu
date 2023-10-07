<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="tag-box">
    <p v-if="getIdentity.includes('1') && getIdentity.length===1" class="tag common">General Member</p>
    <p v-if="getIdentity.includes('2')" class="tag designer">Designer</p>
    <p v-if="getIdentity.includes('3')" class="tag firend">Partners</p>
    <p v-if="getIdentity.includes('4')" class="tag kol">KOL</p>
    <p v-if="getIdentity.includes('5')" class="tag media">Journalists</p>
    <p v-if="getIdentity.includes('6')" class="tag staff">Staff</p>
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
.tag-box {
  margin-bottom: mvw(16);
}
.tag {
  height: mvw(24);
  border-radius: mvw(12);
  display: inline-block;
  line-height: mvw(24);
  padding: 0 mvw(15);
  margin: 0;
  color: #fff;
  font-size: mrem(24);
  font-weight: bold;

  &.common {
    color: #bbb;
    line-height: mvw(22);
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
