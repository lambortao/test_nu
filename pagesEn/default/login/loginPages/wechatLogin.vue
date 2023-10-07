<template lang="html">
  <div class="wechat_container">
    <div class="wechat_title">
      <figure @click="$emit('backLogin')">
        <img src="~/assets/images/login/back.png" alt="">
      </figure>
      <h1>微信登录</h1>
    </div>
    <div class="wechat_content">
      <div class="wechat_code">
        <img src="~/assets/images/login/code.png" alt="">
      </div>
      <p>请使用微信扫描二维码登录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WechatLoginComponent',
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.wechat_container {
  padding-top: 10vh;
  .wechat_title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    figure {
      width: 24px;
      height: 24px;
      margin-right: 16px;
      cursor: pointer;
    }

    h1 {
      font-size: 24px;
      line-height: 56px;
      white-space: nowrap;
    }
  }

  .wechat_content {
    .wechat_code {
      width: 312px;
      height: 312px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 6px;
    }

    p {
      text-align: center;
      margin-top: 15px;
    }
  }
}
</style>
