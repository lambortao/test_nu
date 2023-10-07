<template>
  <div class="user-edit">
    <h3>Edit Birthday</h3>
    <header>
      <input v-model="newBirthday" class="full-input" type="date">
    </header>
    <button :class="['confirm', { disabled: !disabled }]" @click="confirm">
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
    newBirthday: {
      set (value) { this.$store.commit('users/setEnNewData', { key: 'birthday', value }) },
      get () { return this.$store.getters['users/getNewEnData'].birthday }
    }
  },
  methods: {
    async confirm () {
      try {
        await this.$store.dispatch('users/setEnUserInfo')
        await this.$store.dispatch('login/useGetMemberDataEn')
        this.$store.commit('users/setEnNewData', { key: 'birthday', value: '' })
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
