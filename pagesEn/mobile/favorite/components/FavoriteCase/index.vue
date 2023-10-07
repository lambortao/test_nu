<template>
  <div class="news-hot">
    <article
      v-for="item in articleList"
      v-show="!edit"
      :key="item.id"
    >
      <figure><img src="~/assets/images/AAmobile/news.jpg" :alt="item.title"></figure>
      <div class="content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </article>
    <div v-show="edit" class="edit-box">
      <div class="article-list">
        <article
          v-for="item in articleList"
          :key="item.id"
          :class="{ close: selectedList.includes(item.id) }"
          @click="selectedItem(item.id)"
        >
          <span />
          <div class="bg" />
          <div class="content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </article>
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
  name: 'FavoriteCase',
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
      articleList: [{
        id: '1',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }, {
        id: '2',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }, {
        id: '3',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }, {
        id: '4',
        img: '',
        title: '特别“出色”的Flowerpot',
        desc: '穿过半个多世纪，持续为光延续生命力。',
        tags: ['&tradition', 'Collection']
      }]
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>

.news-hot {
  width: 100%;
  background-color: #F6F6F6;
  padding: mvw(24) mvw(24) mvw(50);

  article {
    background-color: #fff;
    margin-bottom: mvw(20);
    padding: mvw(16);

    &:last-child {
      margin-bottom: 0;
    }
  }
  figure, img {
    width: 100%;
  }
  figure {
    margin-bottom: mvw(16);
  }
  .content {
    h3 {
      font-size: mrem(36);
      margin-bottom: mvw(6);
    }
    p {
      font-size: mrem(28);
      color: #999;
    }
  }
}
.edit-box {
  article {
    width: mvw(327);
    height: mvw(80);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: mvw(16) mvw(12);
    margin-bottom: mvw(16);

    span {
      width: mvw(16);
      height: mvw(16);
      border-radius: mvw(8);
      border: mvw(2) solid #aaa;
    }
    &.close span {
      border: none;
      background: {
        image: url('~/assets/images/AAmobile/favorite/selected.png');
        size: 100%;
      };
    }
    div.bg {
      width: mvw(48);
      height: mvw(48);
      border: 1px solid #eee;
      margin: 0 mvw(10);
      background: {
        image: url('~/assets/images/AAmobile/news.jpg');
        size: auto 100%;
        position: center;
      };
    }
    .content {
      h3 {
        font-size: mrem(28);
      }
      p {
        font-size: mrem(24);
      }
    }
  }
}
</style>
