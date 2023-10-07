<template>
  <div class="input_box">
    <div class="upload_box">
      <div
        v-for="(item,index) in uploadList"
        :key="index"
        class="upload_item"
      >
        <div>
          <input
            type="file"
            disabled
          >
          <div class="upload_style">
            <!-- <img
          class="add"
          src="~/assets/images/login/plus.png"
          alt=""
        > -->
            <img
              class="success"
              :src="item.path"
              alt=""
            >
          </div>
        </div>
        <!-- <p>xxx营业执照.pdf</p> -->
      </div>
      <div class="upload_item">
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="uploadEvent"
          >
          <div class="upload_style">
            <img
              class="add"
              src="~/assets/images/login/plus.png"
              alt=""
            >
          </div>
        </div>
        <!-- <p>xxx营业执照.pdf</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadComponent',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    hasDrop: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  data: () => ({
    uploadList: null
  }),
  methods: {
    uploadEvent (e) {
      console.log(e)
      // const formData = new FormData()
      // const temporaryFileList = Array.from(e.target.files)
      const uploadString = ''
      // formData.append('type', 'base')
      // temporaryFileList.forEach((file) => {
      //   formData.append('files[]', file)
      // })
      // const uploadRes = await this.$axios.post('/upload', formData)
      // this.uploadList = uploadRes.data
      // // eslint-disable-next-line no-const-assign
      // uploadString = this.uploadList.map((item) => {
      //   return item.id
      // }).join(',')
      // console.log(uploadString)
      this.$emit('getUploadList', uploadString)
    }
  }
}
</script>

<style lang="scss" scoped>
.input_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .upload_box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .upload_item {
      margin-right: 20px;
      > div {
        width: 120px;
        height: 120px;
        position: relative;
        background: rgba(216, 216, 216, 0.3);
        input[type="file"] {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
          cursor: pointer;
        }
        .upload_style {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 9;
          display: flex;
          justify-content: center;
          align-items: center;
          .add {
            width: 25px;
            height: 25px;
            opacity: 0.4;
          }
          .success {
            width: 54px;
            object-fit: contain;
          }
        }
      }

      > p {
        width: 100%;
        text-align: center;
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
}
</style>
