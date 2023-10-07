<template>
  <div class="agreement_box">
    <div
      class="agreement"
      @click="agreeClick"
    >
      <div :class="['checkBox',{isAgreeCheck}]">
        <img
          src="~/assets/images/icon/checkbox_active.png"
          alt=""
        >
      </div>
      <p v-if="language==='cn'">
        同意并接受 <nuxt-link
          class="link"
          to="/policy"
        >
          隐私条款
        </nuxt-link>
      </p>
      <p v-else>
        I have read the <nuxt-link
          class="link"
          to="/en/policy"
        >
          Privacy Policy
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AgreementComponent',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    language: {
      type: String,
      default: 'cn'
    }
  },
  computed: {
    ...mapState('login', {
      isAgreeCheck: state => state.isAgreeCheck
    })
  },
  methods: {
    agreeClick () {
      this.$store.commit('login/setAgreeStatus', !this.isAgreeCheck)
    }
  }
}
</script>

<style lang="scss" scoped>
.agreement {
  display: flex;
  align-items: center;
  cursor: pointer;
  .checkBox {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background: #fff;
    margin-right: vw(8);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    img {
      @include imgCover;
    }
    &.isAgreeCheck {
      background: #000;
    }
  }
  p {
    font-size: vw(16);
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    line-height: 24px;
    user-select: none;
    .link {
      text-decoration: underline;
      color: #000;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
}
@include media(">maxW") {
  .agreement {
    display: flex;
    align-items: center;
    cursor: pointer;
    .checkBox {
      width: 16px;
      height: 16px;
      margin-right: 8px;
      &.isAgreeCheck {
        background: #000;
      }
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      line-height: 24px;
      user-select: none;
      .link {
        text-decoration: underline;
        color: #000;
        font-weight: 600;
      }
    }
  }
}
</style>
