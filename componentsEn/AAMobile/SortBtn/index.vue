<template>
  <div :class="['sort-btn', { active: visible }]">
    <div class="btn" @click="visible = !visible">
      <figure><img src="~/assets/images/AAmobile/main/setting.png" alt="排序"></figure>
      <p>{{ btnText }}</p>
    </div>
    <div class="sort-list">
      <p
        v-for="item in sortList"
        :key="item.value"
        :class="[{ active: selected === item.value }]"
        @click="handleSort(item)"
      >
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortBtn',
  model: {
    prop: 'selected',
    event: 'update:selected'
  },
  props: {
    defaultText: {
      type: String,
      default: '排序'
    },
    selected: {
      type: [Number, String],
      default: null
    },
    sortList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      btnText: ''
    }
  },
  watch: {
    selected () {
      this.selectedText()
    }
  },
  mounted () {
    this.selectedText()
  },
  methods: {
    handleSort (item) {
      console.log(item)
      this.$emit('update:selected', item.value)
      this.visible = false
    },
    selectedText () {
      this.btnText = this.selected == null ? this.defaultText : this.sortList.filter(item => item.value === this.selected)[0].label
    }
  }
}
</script>

<style lang="scss" scoped>

.sort-btn {
  height: mvw(32);
  position: relative;

  > div.btn {
    width: 100%;
    height: 100%;
    padding: 0 mvw(8) 0 mvw(4);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  figure {
    width: mvw(24);
    height: mvw(24);
    margin-right: mvw(5);

    img {
      width: 100%;
    }
  }

  .sort-list {
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    position: absolute;
    right: 0;
    top: mvw(42);
    opacity: 0;
    pointer-events: none;
    transition: opacity 300ms ease;
    p {
      width: mvw(120);
      height: mvw(40);
      text-align: center;
      line-height: mvw(40);

      &.active {
        background-color: #F6F6F6;
      }
    }
  }

  &.active {
    background-color: #f6f6f6;

    .sort-list {
      pointer-events: all;
      opacity: 1;
    }
  }
}
</style>
