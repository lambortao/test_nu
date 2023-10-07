<template>
  <div>
    <div v-for="item in storeList" :key="item.alias" class="store-item">
      <figure v-if="item.thumbnail" class="big-figure">
        <img :src="item.thumbnail" :alt="item.title">
      </figure>
      <div :class="['store-item-box', { tall: item.thumbnail }]">
        <div>
          <h3 class="title">
            {{ item.title_en }}
          </h3>
          <div class="store-item-info">
            <p class="store-address">
              {{ item.address_en }}
            </p>
            <div class="store-contact">
              <p>Store Hours：{{ item.content_en[0].value }}</p>
              <p>Tel：{{ item.mobile }}</p>
            </div>
          </div>
        </div>
        <div class="store-item-brand">
          <div
            :class="['store-brand-list', item.thumbnail ? 'right one' : 'left']"
          >
            <span v-for="brand in item.brandids" :key="brand">{{ brand }}</span>
          </div>
          <div
            v-if="false && item.online && Array.isArray(item.online) && item.online.length"
            class="store-line-store-list"
          >
            <div v-for="store in item.online" :key="store.key">
              <template v-if="store.options && store.options.length">
                <div v-for="Lstore in store.options" :key="Lstore.link" class="store-line-store-singin">
                  <a :href="Lstore.link" target="_black">
                    <figure v-if="store.key === '淘宝'">
                      <img src="~/assets/images/AAmobile/store/taobao.png" alt="淘宝旗舰店">
                    </figure>
                    <figure v-else-if="store.key === '天猫'">
                      <img src="~/assets/images/AAmobile/store/online.png" alt="天猫旗舰店">
                    </figure>
                    <figure v-else-if="store.key === '京东'">
                      <img src="~/assets/images/AAmobile/store/jingdong.png" alt="京东旗舰店">
                    </figure>
                    <p>{{ Lstore.name }}</p>
                  </a>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    storeList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
.store-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  border-bottom: 1px solid #ddd;

  p, span {
    font-size: 14px;
  }

  .big-figure {
    width: 320px;
    height: 200px;
    margin-right: 24px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .store-item-box {
    flex: 1;

    .store-item-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: 12px 0;

      .store-contact {
        font-size: 14px;
        color: #b3b3b3;
        text-align: right;
        white-space: nowrap;
        p{
          white-space: nowrap;
        }
      }
    }

    .store-item-brand {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .store-brand-list {
        display: flex;

        &.one {
          flex: 1;
        }

        span {
          padding: 0px 8px;
          color: #000;
          font-size: 12px;
          background-color: #eee;
        }

        &.left {
          justify-content: flex-start;

          span {
            margin-right: 18px;
          }
        }
        &.right {
          justify-content: flex-end;

          span {
            margin-left: 18px;
          }
        }
      }

      .store-line-store-list, .store-line-store-list > div {
        // flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        a {
          margin-left: 16px;
          display: flex;
          justify-content: flex-start;
          figure {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            img {
              width: 100%;
            }
          }
          p {
            font-size: 13px;
          }
        }
      }
    }
  }
  .tall {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 15px;
    box-sizing: border-box;
  }
}
</style>
