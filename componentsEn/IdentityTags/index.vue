<template>
  <div class="tag-box">
    <p v-if="getIdentity.includes('1') && getIdentity.length===1" class="tag common">
      General user
    </p>
    <p v-if="getIdentity.includes('2')" class="tag designer">
      Designer
    </p>
    <p v-if="getIdentity.includes('3')" class="tag firend">
      Partners
    </p>
    <p v-if="getIdentity.includes('4')" class="tag kol">
      KOL
    </p>
    <p v-if="getIdentity.includes('5')" class="tag media">
      Journalists
    </p>
    <p v-if="getIdentity.includes('6')" class="tag staff">
      Staff
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
  height: vw(32);
  border-radius: vw(16);
  display: inline-block;
  text-align: center;
  min-width: vw(100);
  line-height: vw(30);
  padding: 0 vw(15);
  margin: 0;
  color: #fff;
  font-size: rem(18);
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
