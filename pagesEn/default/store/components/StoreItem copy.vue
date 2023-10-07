<template>
  <div>
    <div v-for="item in storeList" :key="item.alias" class="store-item">
      <div class="store-item-info">
        <figure v-if="item.thumbnail">
          <img :src="item.thumbnail" :alt="item.title">
        </figure>
        <div class="store-item-info-contant">
          <div class="title-box">
            <h3 class="title">
              {{ item.title_en }}
            </h3>
            <!-- <span v-if="item.title === 'HAY'" class="brand-title">Franchise store</span> -->
          </div>
          <p class="store-address">
            <span>{{ item.city_en }}</span><br>
            <span>{{ item.address_en }}</span>
          </p>
          <div v-if="!item.thumbnail" class="store-brand-list left">
            <span v-for="brand in item.brandids" :key="brand">{{ brand }}</span>
          </div>
          <!-- <div
            v-if="item.online && Array.isArray(item.online) && item.online.length"
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
          </div> -->
        </div>
      </div>
      <div class="store-item-contact">
        <p>Store Hours：{{ item.content_en[0].value }}</p>
        <p>Tel：{{ item.mobile }}</p>
        <div
          v-if="item.thumbnail"
          class="store-brand-list right"
        >
          <span v-for="brand in item.brandids" :key="brand">{{ brand }}</span>
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

  .store-item-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > figure {
      width: 320px;
      height: 200px;
      margin-right: 24px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .store-item-info-contant {
      flex: 1;
      .title-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span.brand-title {
          display: block;
          background-color: #000;
          font-size: 12px;
          margin-left: 16px;
          color: #fff;
          padding: 4px 16px;
        }
      }
      h3 {
        font-size: 18px;
      }
      p.store-address {
        font-size: 14px;
        margin: 12px 0;

        span:first-child {
          display: inline-block;
          margin-bottom: 8px;
        }
      }
    }
  }

  .store-item-contact {
    > p {
      font-size: 14px;
      color: #b3b3b3;
      text-align: right;

      &:nth-child(2) {
        margin: 12px 0;
      }
    }
  }

  .store-line-store-list, .store-line-store-list > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 12px;

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
  .store-brand-list {
    display: flex;

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
}
</style>
