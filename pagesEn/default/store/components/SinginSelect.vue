<template>
  <div ref="selectRef" :class="['select-singin', className]">
    <span class="label">{{ label }}</span>
    <div class="select-drow">
      <span @click.stop="dropVisible = !dropVisible">{{ value || 'ALL' }}</span>
      <div
        v-if="dropVisible"
        class="select-drow-options"
      >
        <p
          v-for="item in list"
          :key="item.value"
          :value="item.value"
          @click.stop="handleOptions(item.value)"
        >
          {{ item.label }}
        </p>
      </div>
    </div>
    <span class="icon" @click.stop="handleOptions('')" />
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
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dropVisible: false
    }
  },
  methods: {
    handleOptions (key) {
      this.dropVisible = false
      this.$emit('update:value', key)
      this.$emit('ctiySelectFn', key)
      console.log('key', this.label)
      this.$emit('tracking', { event: 'filter_store', mode: 'Store', label: key, filterLabel: this.label })
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
  justify-content: flex-start !important;
  align-items: center;
  position: relative;
  .label {
    color: #999;
  }
  .select-drow {
    width: 90%;
    height: 100%;
    padding: 0 vw(14);
    color: #000;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 100%;
      line-height: vw(42);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
        font-size: rem(18);
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

  .country {
    width: 200px;
  }
  .select-singin{
    width: 200px;
  }
}
@include media('>1500px') {
  .select-singin {
    font-size: rem(18);
  }
}

@include media('<1100px') {
  .country {
    width: 200px;
  }
  .city {
    width: 200px;
  }
}
</style>
