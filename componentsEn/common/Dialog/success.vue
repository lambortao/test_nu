<template>
  <div
    v-if="showDialog"
    class="success_box"
  >
    <div class="dialog_box">
      <div
        class="closx_box"
        @click="closeDialog()"
      >
        <img
          src="~/assets/images/icon/close.png"
          alt=""
        >
      </div>
      <div class="success_content">
        <figure>
          <img
            src="~/assets/images/icon/done.png"
            alt=""
          >
        </figure>
        <div>
          <h3>{{ done_text }}</h3>
          <p v-if="remark">
            {{ remark }} {{ countDownNumber }}s...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SuccessDialogComponent',
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    done_text: {
      type: String,
      default: null
    },
    remark: {
      type: String,
      default: null
    }
  },
  data: () => ({
    showDialog: true,
    countDownNumber: 5
  }),
  created () {
    this.countDownFunc()
  },
  methods: {
    countDownFunc () {
      const down = () => {
        setTimeout(() => {
          if (this.countDownNumber > 0) {
            this.countDownNumber = this.countDownNumber - 1
            down()
          } else {
            this.timeOut()
          }
        }, 1000)
      }
      down()
    },
    timeOut () {
      this.$emit('done')
      console.log('倒计时结束')
    },
    closeDialog () {
      this.showDialog = false
    }
  }
}
</script>
<style lang="scss">
.success_box {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  .dialog_box {
    width: 480px;
    min-height: 320px;
    box-sizing: border-box;
    background: #fff;
    margin: 0 auto;
    padding: 54px 20px;
    position: relative;
    > .closx_box {
      width: 23px;
      position: absolute;
      right: 27px;
      top: 27px;
      cursor: pointer;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    > .success_content {
      padding-top: 36px;
      figure {
        width: 56px;
        height: 56px;
        margin: 0 auto;
        img {
          width: 100%;
          object-fit: contain;
        }
      }
      > div {
        text-align: center;
        margin-top: 24px;
        h3 {
          font-size: 32px;
          line-height: 48px;
        }
        p {
          margin-top: 12px;
          line-height: 24px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
}
</style>
