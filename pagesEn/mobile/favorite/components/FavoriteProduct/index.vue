<template>
  <div class="FavoriteProduct-list">
    <template v-if="favoriteList.length">
      <nuxt-link
        v-for="item in favoriteList"
        v-show="!edit"
        :key="item.alias"
        :to="`/en/product/detail?id=${item.pid}&sku=${item.alias}`"
      >
        <div @click="tracking({event:'view_product', label:item.title_en, items:[{CMSId:item.alias,source:'Favorite'}]})">
          <figure><img :src="item.thumbnail" :alt="item.title_en"></figure>
        </div>
      </nuxt-link>
      <div v-show="edit" class="edit-box">
        <div class="edit-list">
          <article v-for="item in favoriteList" :key="item.alias" class="edit-article" @click="selectedItem(item.alias)">
            <figure :class="{ close: selectedList.includes(item.alias) }">
              <img :src="item.thumbnail" :alt="item.title_en">
            </figure>
          </article>
        </div>
        <edit-control
          :selected-number="selectedList.length"
          @delete="removeFavorite"
          @cancel="eventCancel"
        />
      </div>
    </template>
    <template v-else>
      <div class="none-list">
        <figure>
          <img src="~/assets/images/AAmobile/empty.png" alt="">
        </figure>
        <span>No Data</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditControl from '../EditControl/index.vue'
export default {
  name: 'FavoriteProduct',
  components: {
    EditControl
  },
  model: {
    prop: 'edit',
    event: 'update:edit'
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedList: []
    }
  },
  computed: {
    ...mapGetters({
      favoriteList: 'favorite/getGoodsList'
    })
  },
  created () {},
  mounted () {
    this.$store.dispatch('favorite/useGetGoodsList')
  },
  methods: {
    selectedItem (id) {
      const itemIndex = this.selectedList.indexOf(id)
      if (itemIndex > -1) {
        this.selectedList.splice(itemIndex, 1)
      } else {
        this.selectedList.push(id)
      }
    },
    eventDelete () {
      console.log('删除按钮', this.selectedList)
    },
    eventCancel () {
      this.selectedList.length = 0
      this.$emit('update:edit', false)
    },
    async removeFavorite () {
      this.$store.commit('site/setLoading', true)
      await this.$store.dispatch('favorite/removeFavorite', this.selectedList.join(','))
      this.$store.commit('site/setLoading', false)
      this.eventCancel()
    },
    tracking ({ event, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Profile-Favorite', event, mode: 'Products', label, items })
    }
  }
}
</script>

<style lang="scss" scoped>
.FavoriteProduct-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: mvw(24);
}
article,a {
  width: mvw(122);
  height: mvw(122);
  margin: 0 mvw(4) mvw(5) 0;

  &:nth-child(3n){
    margin-right: 0;
  }

  figure {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #f9f9f9;
    img {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  h4 {
    color: #333;
    font-size: mrem(30);
    font-weight: 500;
    margin: mvw(5) 0;
  }
  p {
    color: #999;
    font-size: mrem(24);
  }
}
p.none {
  text-align: center;
  width: 100%;
}
.edit-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .edit-article {
    width: mvw(122);
    figure, img {
      width: 100%;
    }
    figure {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: mvw(16);
        height: mvw(16);
        border-radius: mvw(8);
        right: mvw(8);
        top: mvw(8);
        border: mvw(2) solid #aaa;
      }
      &.close:after {
        border: none;
        background: {
          image: url('~/assets/images/AAmobile/favorite/selected.png');
          size: 100%;
        };
      }
    }
  }
}
.none-list {
  padding-top: mvw(150);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  figure {
    width: mvw(200);
    text-align: center;
    img {
      width: mvw(120);
    }
  }
  span {
    color: #999;
    font-size: mrem(26);
    margin-top: mvw(5);
  }
}
</style>
