<template>
  <div class="user-edit">
    <h3>Account infomation</h3>
    <header>
      <div class="head">
        <figure><img :src="memberData.headimgurl" alt="头像"></figure>
        <input id="" type="file" name="" accept="image/*" @change="value => confirm(value)">
      </div>
      <input v-model="newName" placeholder="Edit your user name" class="full-input" type="text">
    </header>
    <button :class="['confirm', { disabled: !disabled }]" @click="() => confirm(null)">
      {{ $store.state.users.submit.enText }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EditUser',
  computed: {
    ...mapGetters({
      memberData: 'login/getMember',
      newData: 'users/getNewEnData',
      disabled: 'users/getEnSubmitDisabled'
    }),
    newName: {
      set (value) { this.$store.commit('users/setEnNewData', { key: 'fullname', value }) },
      get () { return this.$store.getters['users/getNewEnData'].fullname }
    }
  },
  methods: {
    async confirm (data = null) {
      try {
        await this.$store.dispatch('users/setEnUserInfo', data)
        await this.$store.dispatch('login/useGetMemberDataEn')
        this.$store.commit('users/setNewData', { key: 'fullname', value: '' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/users.scss';
header {
  margin-top: mvw(46);

  .head {
    position: relative;
    margin-bottom: mvw(20);
  }

  figure {
    position: relative;
    overflow: inherit;
    margin-bottom: mvw(50);

    img {
      overflow: hidden;
    }

    &::after {
      content: '';
      width: mvw(24);
      height: mvw(24);
      position: absolute;
      bottom: mvw(-8);
      right: mvw(-8);
      background: {
        image: url('~/assets/images/AAmobile/main/camera.png');
        size: 100% 100%;
      };
    }
  }
}
button.confirm {
  display: block;
  margin: mvw(150) auto 0;
}
</style>
