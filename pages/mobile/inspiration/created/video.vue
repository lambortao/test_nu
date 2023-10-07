<template>
  <div class="container">
    <div v-for="item in list" :key="item.id" class="edit-article" @click="selectedItem(item.id)">
      <figure :class="{ close: selectedList.includes(item.id) }">
        <img src="~/assets/images/AAmobile/news-placeholder.jpg" alt="">
      </figure>
    </div>
  </div>
</template>

<script>
import mixinSelectedItem from '../mixin/selectedItem'
export default {
  name: 'InspirationCreatedVideo',
  mixins: [mixinSelectedItem],
  data () {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
  min-height: calc(100vh - 60vw);
  padding: mvw(24) 0 mvw(100);
  background-color: #f6f6f6;
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
