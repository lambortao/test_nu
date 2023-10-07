<template>
  <div class="user-edit">
    <h3>编辑头像与昵称</h3>
    <header>
      <div class="head">
        <figure><img :src="memberData.headimgurl" alt="头像"></figure>
        <input id="" type="file" name="" accept="image/*" @change="uploadImg">
      </div>

      <input v-model="newName" placeholder="请输入新昵称" class="full-input" type="text">
    </header>
    <button :class="['confirm', { disabled: !disabled }]" @click="confirm">
      {{ $store.state.users.submit.text }}
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
      newData: 'users/getNewData',
      disabled: 'users/getSubmitDisabled'
    }),
    newName: {
      set (value) { this.$store.commit('users/setNewData', { key: 'nickname', value }) },
      get () { return this.$store.getters['users/getNewData'].nickname }
    }
  },
  methods: {
    async confirm () {
      try {
        await this.$store.dispatch('users/setUserInfo')
        await this.$store.dispatch('login/useGetMemberData')
        this.$store.commit('users/setNewData', { key: 'nickname', value: '' })
      } catch (error) {
        console.log(error)
      }
    },
    async uploadImg (value) {
      try {
        await this.$store.dispatch('users/uploadHeaderUrl', value)
        await this.$store.dispatch('login/useGetMemberData')
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
