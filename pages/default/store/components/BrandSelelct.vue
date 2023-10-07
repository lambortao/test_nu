<template>
  <div class="select-singin">
    <span class="label">{{ label }}</span>
    <div class="select-drow">
      <span @click.stop="dropVisible = !dropVisible">{{ itemName }}</span>
      <div v-if="dropVisible" class="select-drow-options">
        <p
          :class="[{ active: value.length === list.length }]"
          @click.stop="selectedAll"
        >
          全部
        </p>
        <p
          v-for="item in list"
          :key="item.value"
          :value="item.value"
          :class="[{ active: value.includes(item.value) }]"
          @click.stop="handleOptions(item.value)"
        >
          {{ item.label }}
        </p>
      </div>
    </div>
    <span class="icon" @click.stop="clear()" />
  </div>
</template>

<script>
export default {
  name: 'SinginSelect',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [Array, String],
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dropVisible: false
    }
  },
  computed: {
    itemName () {
      return (this.value.length > 0 && this.value.length < this.list.length) ? this.value.join(',') : '全部'
    }
  },
  methods: {
    handleOptions (key) {
      const data = [...this.value]
      const valueIndex = data.indexOf(key)
      if (valueIndex > -1) {
        data.splice(valueIndex, 1)
      } else {
        data.push(key)
        this.$emit('tracking', { event: 'filter_store', mode: 'Store', label: key, filterLabel: 'Brands' })
      }
      this.$emit('update:value', data)
    },
    selectedAll () {
      /** 选中的 */
      const data = [...this.value]
      const allList = this.list.map(item => item.value)
      if (!data.length) {
        this.$emit('update:value', [...allList])
        this.$emit('tracking', { event: 'filter_store', moede: 'Store', label: '全部', filterLabel: 'Brands' })
      } else if (data.length === allList.length) {
        this.$emit('update:value', [])
      } else {
        const result = allList.filter(i => !data.includes(i))
        this.$emit('update:value', [...result, ...data])
      }
    },
    clear () {
      this.$emit('update:value', [])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/default/fun";

.select-singin {
  height: vw(42);
  width: 270px;
  margin-right: vw(32);
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: rem(18);
  .label {
    color: #999;
  }
  .select-drow {
    flex: 1;
    height: 100%;
    padding: 0 vw(14);
    color: #000;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 100%;
      line-height: vw(42);
    }
    .select-drow-options {
      position: absolute;
      top: vw(42);
      left: 0;
      width: 100%;
      max-height: vw(400);
      overflow: hidden;
      overflow-y: auto;
      border: 1px solid #d9d9d9;
      background-color: #fff;
      padding: 0 vw(14);

      p {
        width: 100%;
        height: vw(32);
        line-height: vw(32);
        border-bottom: vw(1) solid #f9f9f9;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: rem(18);
        &::before {
          content: '';
          width: vw(15);
          height: vw(15);
          margin-right: vw(8);
          display: block;
          background: {
            image: url('~/assets/images/store/unselect.png');
            size: 100%;
          };
        }

        &.active {
          &::before {
            background-image: url('~/assets/images/store/select.png');
          }
        }
      }

      @include media('<1500px') {
        p {
          font-size: rem(14);
          height: vw(40);
          line-height: vw(40);
        }
      }
    }
  }
  span.icon {
    cursor: pointer;
    content: '';
    width: vw(16);
    height: vw(16);
    position: absolute;
    right: 0;
    top: vw(13);
    background: {
      image: url('~/assets/images/store/arrow-bottom.png');
      size: 100%;
    };
  }
  &:hover {
    span.icon {
      width: vw(18);
      height: vw(18);
      top: vw(12);
      background-image: url('~/assets/images/store/close.png');
    }
  }
}
 @include media('<1500px') {
    .select-singin {
      font-size: rem(14);
      width: 200px;
      span.icon {
        width: vw(30);
        height: vw(30);
        top: vw(6);
      }
      &:hover {
        span.icon {
          width: vw(30);
          height: vw(30);
          top: vw(6);
        }
      }
    }

  }
  @include media('>1500px') {
    .select-singin {
      font-size: rem(18);
    }
  }
</style>
