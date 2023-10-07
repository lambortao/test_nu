<template>
  <div class="newsLetter-box">
    <div
      v-if="newsLetterStatus!=='open'"
      class="collapse"
      @click="openLetterClick"
    >
      <p>
        Sign up for our newsletter
      </p>
    </div>
    <div
      v-else
      class="Expand"
    >
      <div
        class="close"
        @click="closeLetter"
      >
        <img
          src="~assets/images/icon/close.png"
          alt=""
        >
      </div>
      <div
        v-if="isLeave"
        class="title_box"
      >
        <p>Thank you!</p>
      </div>
      <div
        v-else
        class="leave_box"
      >
        <div class="title">
          Stay up-to-date with Nine United news, stories, and more!
        </div>
        <div class="input_box">
          <input
            v-model="name"
            placeholder="Full Name"
            type="text"
          >
          <input
            v-model="email"
            placeholder="E-mail"
            type="email"
          >
        </div>
        <div class="private_box">
          <!-- <p>Private</p> -->
          <div
            class="checkbox_box"
            @click="agreeClick"
          >
            <div :class="['checkbox' , {isAgree}]">
              <img
                src="~/assets/images/icon/checkbox_active.png"
                alt=""
              >
            </div>
            <p>
              I have read the <nuxt-link to="/en/policy">
                Privacy Policy
              </nuxt-link>
            </p>
          </div>
          <pc-button
            type="newsletter"
            :disabled="name==='' || email==='' || !isAgree"
            @click="handlePost"
          >
            Subscribe
          </pc-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    isExpand: true,
    isAgree: false,
    isLeave: false
  }),
  computed: {
    ...mapState({
      resultStatus: state => state.newsLetter.result,
      newsLetterStatus: state => state.site.newsLetterStatus
    }),
    name: {
      get () { return this.$store.state.newsLetter.postData.name },
      set (value) { this.$store.commit('newsLetter/setPostData', { key: 'name', value }) }
    },
    email: {
      get () { return this.$store.state.newsLetter.postData.email },
      set (value) { this.$store.commit('newsLetter/setPostData', { key: 'email', value }) }
    }
  },
  methods: {
    ...mapActions({
      leaveInfo: 'newsLetter/leaveInfo'
    }),
    async handlePost () {
      try {
        await this.leaveInfo()
        if (this.resultStatus) {
          // this.isExpand = false
          this.isAgree = false
          this.name = ''
          this.email = ''
          this.isLeave = true
        }
      } catch (error) {
        // this.$store.commit('site/setNewsLetterStatus', false)
      }
    },
    openLetterClick () {
      this.isExpand = true
      this.$store.commit('site/setNewsLetterStatus', 'open')
    },
    closeLetter () {
      // this.isExpand = false
      this.$store.commit('site/setNewsLetterStatus', 'close')
      this.isLeave = false
    },
    agreeClick () {
      this.isAgree = !this.isAgree
    }
  }
}
</script>

<style lang="scss" scoped>
.newsLetter-box {
  position: fixed;
  right: vw(40);
  bottom: vw(10);
  z-index: 1;
  .collapse {
    background: #f5f5f5;
    box-shadow: 0px 0px 4px 0px rgba(213, 213, 213, 0.5);
    border-radius: 2px;
    padding: 10px 20px;
    cursor: pointer;
    p {
      font-size: vw(16);
      font-weight: 500;
      color: #333333;
      line-height: 28px;
      user-select: none;
      font-family: "WorkSans-Medium";
    }
  }
  .Expand {
    width: vw(500);
    min-width: 450px;
    height: vw(370);
    min-height: 340px;
    background: #f5f5f5;
    box-shadow: 4px 4px 6px 0px rgba(213, 213, 213, 0.5);
    border-radius: 2px;
    padding: 40px;
    position: relative;
    > .close {
      position: absolute;
      top: 32px;
      right: 32px;
      width: 24px;
      height: 24px;
      opacity: 0.6;
      cursor: pointer;
      img {
        @include imgContain;
      }
    }
    .leave_box {
      > .title {
        width: 350px;
        margin-bottom: 20px;
        font-family: "WorkSans-Medium";
        font-size: rem(20);
        line-height: 28px;
      }
      > .input_box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: vw(112);
        min-height: 96px;
        margin-bottom: vw(26);
        input {
          width: 100%;
          height: vw(48);
          min-height: 40px;
          padding: 0 vw(24);
          border: 1px solid rgba(0, 0, 0, 0.2);
          font-size: rem(16);
        }
      }
      > .private_box {
        > p {
          color: #333333;
          font-size: rem(16);
          margin-bottom: vw(10);
        }
        > .checkbox_box {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          cursor: pointer;
          > .checkbox {
            width: 14px;
            height: 14px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            background: #fff;
            margin-right: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.5s;
            img {
              @include imgContain;
            }
            &.isAgree {
              background: #000;
              border: 1px solid rgba(0, 0, 0);
            }
          }
          > p {
            font-size: rem(16);
            a {
              text-decoration: underline;
              font-family: "WorkSans-Medium";
            }
          }
        }
      }
    }
    .title_box {
      height: 290px;
      // max-height: 290px;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
@include media(">maxW") {
  .newsLetter-box {
    position: fixed;
    right: 40px;
    bottom: 10px;
    z-index: 1;
    .collapse {
      p {
        font-size: 16px;
        line-height: 28px;
      }
    }
    .Expand {
      width: 500px;
      height: 370px;
      .leave_box {
        > .title {
          font-size: 20px;
        }
        > .input_box {
          height:112px;
          margin-bottom: 26px;
          input {
            height: 48px;
            padding: 0 24px;
            font-size:16px;
          }
        }
        > .private_box {
          > p {
            font-size: 16px;
            margin-bottom:10px;
          }
          > .checkbox_box {
            > p {
              font-size:16px;
            }
          }
        }
      }
      .title_box {
        height: 290px;
        font-size: 24px;
      }
    }
  }
}
</style>
