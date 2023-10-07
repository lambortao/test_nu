<template>
  <div
    v-if="showDialog"
    class="dialog_box"
  >
    <div class="dialog">
      <div
        class="closx_box"
        @click="closeDialog()"
      >
        <img
          src="~/assets/images/icon/close.png"
          alt=""
        >
      </div>
      <div class="dialog_title">
        <h2>{{ dialogTitle }}</h2>
        <p v-if="subTitle">
          请输入灵感薄的名称
        </p>
      </div>
      <div class="dialog_content">
        <slot name="content" />
      </div>
      <div
        v-if="okBtn&&cancelBtn"
        class="button_box"
      >
        <div
          v-if="cancelBtn && cancelBtn!==''"
          class="cancel_btn"
          @click="closeDialog"
        >
          <button>{{ cancelBtn }}</button>
        </div>
        <div
          v-if="okBtn"
          class="ok_btn"
          @click="closeDialog"
        >
          <button>{{ okBtn }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogComponent',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    cancelBtn: {
      type: String,
      default: null
    },
    okBtn: {
      type: String,
      default: null
    },
    dialogTitle: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    }
  },
  data: () => ({
    title: '111',
    Subtitle: '111',
    ok_btn: '创建'
  }),
  methods: {
    closeDialog () {
      this.$props.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog_box {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  padding-top: calc((100vh - 760px) / 2);
  position: fixed;
  top: 0;
  left: 0;
  > .dialog {
    width: 1200px;
    min-height: 760px;
    box-sizing: border-box;
    background: #fff;
    margin: 0 auto;
    padding: 54px 0;
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
    .dialog_title {
      padding: 0 60px;
      h2 {
        font-size: 30px;
        line-height: 54px;
      }
      p {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
        margin-top: 3px;
      }
    }
    > .dialog_content {
      height: calc(100% - 200px);
      overflow-x: hidden;
      margin-top: 40px;
      padding: 0 60px;
      > slot {
        overflow-y: scroll;
      }
    }
    > .button_box {
      position: absolute;
      right: 60px;
      bottom: 50px;
      display: flex;
      > .cancel_btn {
        width: 305px;
        height: 50px;
        background: #fff;
        border: 1px solid #000;
        margin-right: 10px;
      }
      > .ok_btn {
        width: 305px;
        height: 50px;
        background: #000;
        border: 1px solid #000;
        > button {
          color: #fff;
        }
      }
      button {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
