<template>
  <div :class="['upload-img', { disabled }]">
    <article
      v-for="(item, index) in imgList"
      :key="item"
    >
      <figure>
        <img src="~/assets/images/login/upload.png" alt="">
        <span class="close" @click="delEvent(index)">删除</span>
      </figure>
    </article>
    <article class="upload-main">
      <input
        type="file"
        multiple
        accept="image/*,.pdf"
        @change="uploadEvent"
      >
      <div class="upload-style">
        <img
          class="add"
          src="~/assets/images/login/plus.png"
          alt=""
        >
      </div>
    </article>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UploadImg',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgList: []
    }
  },
  watch: {
    imgList: {
      handler (val) {
        this.$emit('update:value', val.join(','))
      },
      deep: true
    }
  },
  mounted () {
    if (this.value) {
      this.imgList = this.value.split(',')
    }
  },
  methods: {
    async uploadEvent (e) {
      const data = e.target.files
      const formData = new FormData()
      formData.append('type', 'base')
      Array.from(data).forEach((file) => {
        formData.append('files[]', file)
      })

      try {
        const result = await axios({
          method: 'post',
          url: '/api/upload',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
        if (result.status === 200) {
          if (result.data.code !== 0) {
            throw new Error(result.data.msg)
          } else {
            console.log(result.data.data.map(item => item.path))
            this.imgList = this.imgList.concat(result.data.data.map(item => item.path))
          }
        } else {
          throw new Error('网络错误')
        }
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    delEvent (index) {
      this.imgList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img {
  display: flex;
  justify-content: flex-start;

  article {
    width: 120px;
    height: 120px;
    margin: 0 20px 10px 0;
    background-color: #D8D8D8;
    position: relative;

    > figure {
      width: 120px;
      height: 120px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      span.close {
        position: absolute;
        height: 30px;
        bottom: -30px;
        width: 100%;
        text-align: center;
        transition: bottom 300ms ease;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;

        &::before {
          content: '';
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 5px;
          background: {
            image: url('~/assets/images/icon/close.png');
            size: 100%;
          };
        }
      }

      img {
        width: 70px;
      }
    }

    figure:hover {
      span.close {
        bottom: 0;
      }
    }

    > p {
      font-size: 14px;
      text-align: center;
      margin: 10px 0 20px;
    }
  }

  .upload-main {
    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }
    input, .upload-style {
      width: 100%;
      height: 100%;
    }
    .upload-style {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 24px;
      }
    }
  }
}
</style>
