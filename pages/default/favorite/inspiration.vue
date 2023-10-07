<template>
  <div>
    <div class="container site-is-default">
      <div class="NewsList_box default-width">
        <div class="title">
          <h1>{{ title }}</h1>
          <div>
            <p>共 2 篇内容</p>
          </div>
        </div>
        <div class="content">
          <div class="tab_content_box">
            <InspirList :is-empty="true" :list-type="listType" @showDialog="createEvent" />
          </div>
        </div>
      </div>
      <Dialog :show-dialog="showDialog" list-type="product">
        <div
          slot="content"
          class="dialog_slot_box"
        >
          <dialogList />
        </div>
      </Dialog>
    </div>
    <mobile-inspiration class="site-is-mobile" />
  </div>
</template>

<script>
import InspirList from '~/components/common/List/inspirList.vue'
import Dialog from '~/components/common/Dialog/Dialog.vue'
import dialogList from '~/components/common/List/dialogList.vue'
import MobileInspiration from '~/pages/mobile/inspiration/index.vue'
export default {
  name: 'InspirationPage',
  components: {
    InspirList,
    Dialog,
    dialogList,
    MobileInspiration
  },
  data: () => ({
    title: '灵感簿',
    activeIndex: 0,
    listType: '',
    tabList: ['产品', '文章', '视频', '案例'],
    showDialog: false
  }),
  methods: {
    tabChange (index) {
      this.activeIndex = index
      this.listType = index === 0 ? 'product' : index === 1 ? 'article' : ''
    },
    createEvent (event) {
      this.showDialog = event
      console.log('data', event)
    }
  }
}
</script>
<style lang="scss" scoped>
.NewsList_box {
  min-height: 500px;
  padding: 65px 20px 50px;
  > .title {
    border-bottom: 1px solid #ddd;
    h1 {
      font-weight: bolder;
      font-size: 36px;
      line-height: 42px;
    }
    div {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 30px;
    }
  }
  .content {
    > .tabs_box {
      width: 100%;
      padding-bottom: 20px;
      padding-right: 20px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .tab_list {
        display: flex;
        > .tab_pane {
          margin-right: 72px;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.4);
        }
        > .tab_pane:hover,
        .active {
          color: #000;
        }
      }
      .sort_box {
        cursor: pointer;
        user-select: none;
        > P {
          display: inline-block;
          font-size: 18px;
          color: #000;
          line-height: 27px;
          position: relative;

          padding: 9px 31px 9px 16px;
        }
        p::after {
          content: "";
          width: 7px;
          height: 5px;
          display: block;
          background: url("~/assets/images/icon/sort_icon.png") no-repeat;
          background-size: 100% 100%;
          transition: all 0.5s;
          position: absolute;
          right: 14px;
          top: 20px;
        }
        .active {
          background: #eee;
        }
        .active::after {
          transform: rotate(-180deg);
        }
      }
      .sort_menu {
        width: 240px;
        height: 150px;
        background: #fff;
        position: absolute;
        right: 0;
        bottom: -151px;
        box-shadow: 0px 0px 4px #dddddd;
        user-select: none;
        > div {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
        }
        > div:hover,
        .active {
          background: #f6f6f6;
          font-weight: bold;
        }
      }
    }
    > .tab_content_box {
      padding-top: 60px;
      .tab_content {
        display: none;
        &_item {
          width: calc((100% - 128px) / 3);
          margin-right: 64px;
          margin-bottom: 80px;
          cursor: pointer;
          img {
            width: 100%;
            object-fit: contain;
          }
          .news_box {
            .news_tag {
              margin-top: 20px;
              > p {
                background: #eee;
                display: inline-block;
                padding: 7px 13px 4px;
                border-radius: 18px;
                margin-right: 10px;
              }
            }
            .news_title {
              margin-top: 20px;
              > h3 {
                font-size: 18px;
                line-height: 27px;
                font-weight: bold;
              }
              > p {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
                margin-top: 20px;
              }
            }
          }
        }
        &_item:nth-child(3n) {
          margin-right: 0;
        }
      }
      .active {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
.dialog_slot_box {
  box-sizing: border-box;
  // padding-top: 50px;
  .dialog_input_item {
    margin-bottom: 76px;
    > p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.6);
    }
    > div {
      border-bottom: 1px solid #000;
      width: 430px;
      input {
        padding: 10px 0;
        width: 100%;
        color: #000;
        border: none;
        font-size: 24px;
      }
      input::placeholder {
        font-size: 24px;
      }
      input:focus {
        outline: 0;
      }
    }
  }
}
</style>
