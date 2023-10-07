<template>
  <div class="dialogList_box">
    <template v-if="listType=='product'">
      <div class="DialogProduct">
        <label class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
          <div class="select_box">
            <input type="checkbox">
          </div>
        </label>
        <div class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
        </div>
        <div class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
        </div>
        <div class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
        </div>
        <div class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
        </div>
        <div class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
        </div>
        <div class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
        </div>
        <div class="product_item">
          <img
            src="~/assets/images/icon/add.png"
            alt=""
          >
        </div>
      </div>
    </template>
    <template v-else-if="listType=='article'">
      <div class="dialogArticle">
        <label class="dialogArticle_item">
          <div class="dialogArticle_item_left">
            <div class="dialogArticle_img">
              <img
                src="~/assets/images/img/img1.png"
                alt=""
              >
            </div>
            <div class="dialogArticle_desc">
              <h3>特别“出色”的Flowerpot</h3>
              <p>穿过半个多世纪，持续为光延续生命力。</p>
            </div>
          </div>
          <div class="dialogArticle_item_right">
            <div class="dialogArticle_checkbox">
              <input type="checkbox">
            </div>
          </div>
        </label>
        <label class="dialogArticle_item">
          <div class="dialogArticle_item_left">
            <div class="dialogArticle_img">
              <img
                src="~/assets/images/img/img1.png"
                alt=""
              >
            </div>
            <div class="dialogArticle_desc">
              <h3>特别“出色”的Flowerpot</h3>
              <p>穿过半个多世纪，持续为光延续生命力。</p>
            </div>
          </div>
          <div class="dialogArticle_item_right">
            <div class="dialogArticle_checkbox">
              <input type="checkbox">
            </div>
          </div>
        </label>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DialogListComponent',
  props: {
    listType: {
      type: String,
      default: 'article'
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.DialogProduct {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > .product_item {
    width: calc((100% - 30px) / 7);
    margin-right: 5px;
    margin-bottom: 5px;
    background: #ddd;
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    img {
      width: 100%;
      object-fit: contain;
    }
    > .select_box {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
  > .product_item:nth-child(7n) {
    margin-right: 0;
  }
  > .product_item:hover {
    border: 1px solid #000;
  }
}
.dialogArticle {
  width: 100%;
  .dialogArticle_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 40px;
    background: #f4f4f4;
    cursor: pointer;
    .dialogArticle_item_left {
      display: flex;
      align-items: center;
      .dialogArticle_img {
        width: 80px;
        height: 80px;
        border-radius: 19px;
        overflow: hidden;
        margin-right: 29px;
      }
      > .dialogArticle_desc {
        h3 {
          font-size: 18px;
          line-height: 27px;
        }
        p {
          margin-top: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }
    > .dialogArticle_item_right {
      input[type="checkbox"] {
        background: none;
        zoom: 1;
        outline: none;
        -webkit-appearance: none; /*去除默认样式*/
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        -ms-appearance: none;
      }
      input[type="checkbox"]::after {
        width: 24px;
        height: 24px;
        content: " ";
        color: #fff;
        display: inline-block;
        visibility: visible;
        border-radius: 2px;
        padding: 2px 6px;
        box-sizing: border-box;
        background-color: none;
        border-radius: 50%;
        border: none;
      }
      input[type="checkbox"]:checked::after {
        content: "\2713";
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        background-color: #000;
      }
    }
  }
  > .dialogArticle_item:not(first-child) {
    margin-top: 10px;
  }
}
</style>
