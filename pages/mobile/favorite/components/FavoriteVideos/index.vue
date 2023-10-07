<template>
  <div class="FavoriteProduct-list">
    <article
      v-for="item in list"
      v-show="!edit"
      :key="item.id"
    >
      <figure><img src="~/assets/images/AAmobile/news-placeholder.jpg" alt=""></figure>
      <div class="content">
        <h4>{{ item.title }}</h4>
        <p>{{ item.desc }}</p>
      </div>
    </article>
    <div v-show="edit" class="edit-box">
      <div class="edit-list">
        <div v-for="item in list" :key="item.id" class="edit-article" @click="selectedItem(item.id)">
          <figure :class="{ close: selectedList.includes(item.id) }">
            <img src="~/assets/images/AAmobile/news-placeholder.jpg" alt="">
          </figure>
        </div>
      </div>
      <edit-control
        :selected-number="selectedList.length"
        @delete="eventDelete"
        @cancel="eventCancel"
      />
    </div>
  </div>
</template>

<script>
import EditControl from '../EditControl/index.vue'
export default {
  name: 'FavoriteVideos',
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
      selectedList: [],
      list: [{
        id: '1',
        img: '',
        title: 'BF20 pendant.',
        desc: 'Design by Benny Frandsen'
      }, {
        id: '2',
        img: '',
        title: 'BF20 pendant.',
        desc: 'Design by Benny Frandsen'
      }, {
        id: '3',
        img: '',
        title: 'BF20 pendant.',
        desc: 'Design by Benny Frandsen'
      }, {
        id: '4',
        img: '',
        title: 'BF20 pendant.',
        desc: 'Design by Benny Frandsen'
      }]
    }
  },
  created () {},
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
    }
  }
}
</script>

<style lang="scss" scoped>

.FavoriteProduct-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #F6F6F6;
  padding: mvw(24) mvw(24) 0;
}
article {
  width: mvw(327);
  margin-bottom: mvw(24);
  background-color: #fff;

  figure {
    margin: 0;
    img {
      width: 100%;
      display: block;
    }
  }
  .content {
    padding: mvw(16);
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
.edit-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .edit-article {
    width: 32%;
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
</style>
