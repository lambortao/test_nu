<template>
  <div v-if="cookiePopupVisible" class="cookie-main">
    <div>
      <figure class="logo">
        <img src="~assets/images/home/logo-cookie.png" alt="LOGO">
      </figure>
      <p>
        NINE UNITED uses cookies to improve your user experience on our website and to help us make ongoing improvements in the content and functions you encouter on our website. Please read our
        <a href="javascript:;" @click="goPage">Privacy Policy</a>
        to know more details.
      </p>
      <div class="button">
        <button @click="checkBtn(false)">
          I Do Not Accept
        </button><button @click="checkBtn(true)">
          Allow all cookies
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetCookie',
  computed: {
    cookiePopupVisible () { return this.$store.state.site.cookieVisible }
  },
  mounted () {
    const cookieVisible = window.localStorage.getItem('AcceptCookie')
    this.setCookiePopup(!cookieVisible)
    this.$store.commit('login/setAgreeStatus', !!cookieVisible)
  },
  methods: {
    checkBtn (result) {
      this.setCookiePopup(false)
      console.log(result)
      if (result) {
        // 勾选
        this.$store.commit('login/setAgreeStatus', true)
        window.localStorage.setItem('AcceptCookie', true)
      }
    },
    goPage () {
      this.setCookiePopup(false)
      this.$router.push('/en/policy')
    },
    setCookiePopup (visible) {
      this.$store.commit('site/setCookiePopupVisible', visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.cookie-main {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba($color: #000000, $alpha: 0.34);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'WorkSans-Regular';

  > div {
    background-color: #fff;
    width: 500px;
    text-align: center;
    padding: 40px;

    figure {
      width: 214px;
      margin: 0 auto;

      @include media ('<750px') {
        width: mvw(160);
      }

      img {
        width: 100%;
      }
    }
    p {
      margin: 24px 0 40px;
      line-height: 1.75;
      color: #555;
      font-family: 'WorkSans-Regular';

      a {
        text-decoration: underline;
        color: #00253D;
        font-size: 18px;
        font-weight: bold;
        font-family: 'WorkSans-Regular';
      }

      @include media ('<750px') {
        font-size: mrem(24);

        a {
          font-size: mrem(30);
        }
      }
    }

    @include media ('<750px') {
      width: mvw(295);
      padding: mvw(24);
    }
  }

  button {
    width: 200px;
    height: 48px;
    margin: 0 5px;
    border: 1px solid #000;
    cursor: pointer;
    font-weight: bold;
    font-family: 'WorkSans-Regular';

    &:first-child {
      background-color: #fff;
      color: #000;
    }
    &:last-child {
      background-color: #000;
      color: #fff;
    }

    @include media ('<750px') {
      margin: mvw(5) 0;
      width: 100%;
      height: mvw(40);
    }
  }
}
</style>
