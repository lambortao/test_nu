<template>
  <div class="inspiration-container">
    <header>
      <h3>{{ inspiration.title }}</h3>
      <p>{{ inspiration.step.title[inspiration.step.index] }}</p>
    </header>
    <created-name v-if="inspiration.step.index === 0" v-model="inspiration.data" />
    <created-product v-if="inspiration.step.index === 1" v-model="inspiration.data.product" />
    <created-article v-if="inspiration.step.index === 2" v-model="inspiration.data.article" />
    <created-video v-if="inspiration.step.index === 3" v-model="inspiration.data.video" />
    <created-case v-if="inspiration.step.index === 4" v-model="inspiration.data.case" />
    <footer-control>
      <button v-if="skipBtnVisible" class="w-btn" @click="skipEvent">
        {{ inspiration.step.index === 4 ? '跳过直接创建' : '跳过' }}
      </button>
      <button :class="['b-btn', { disabled: !nexuStepDisabled }]" @click="nextStep">
        {{ inspiration.step.index === 4 ? '完成' : '下一步' }}
      </button>
    </footer-control>
  </div>
</template>

<script>
import CreatedName from './name.vue'
import CreatedProduct from './product.vue'
import CreatedArticle from './article.vue'
import CreatedVideo from './video.vue'
import CreatedCase from './case.vue'

export default {
  name: 'InspirationCreatedIndex',
  components: {
    CreatedName,
    CreatedProduct,
    CreatedArticle,
    CreatedVideo,
    CreatedCase
  },
  data () {
    return {
      inspiration: {
        // 当前状态，是新增还是更新
        title: '创建灵感簿',
        // 步骤
        step: {
          // 步骤下标，当前第几步
          index: 0,
          // 每一步对应的名称
          title: ['请输入灵感薄的名称', '请选择要添加的产品', '请选择要添加的文章', '请选择要添加的视频', '请选择要添加的案例']
        },
        // 数据
        data: {
          title: 'sdfsdf',
          desc: 'asdfasdfa',
          product: [],
          article: [],
          video: [],
          case: []
        }
      }
    }
  },
  computed: {
    // 跳过按钮的显示与隐藏
    skipBtnVisible () {
      return [2, 3, 4].includes(this.inspiration.step.index)
    },
    nexuStepDisabled () {
      console.log(this.inspiration.data.product)
      switch (this.inspiration.step.index) {
        case 0:
          return this.inspiration.data.title !== '' && this.inspiration.data.title !== ''
        case 1:
          console.log(!!this.inspiration.data.product.length)
          return !!this.inspiration.data.product.length
        case 2:
          return !!this.inspiration.data.article.length
        case 3:
          return !!this.inspiration.data.video.length
        case 4:
          return !!this.inspiration.data.case.length
        default:
          return true
      }
    }
  },
  methods: {
    nextStep () {
      this.inspiration.step.index = this.inspiration.step.index + 1
    },
    skipEvent () {
      if (this.inspiration.step.index === 4) {
        console.log('创建')
        this.$router.replace({
          name: 'inspirationDetail'
        })
      } else {
        this.nextStep()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/favorite.scss';
.inspiration-container {
  header {
    height: mvw(110);
    padding: mvw(24) mvw(24) 0;
    border-bottom: mvw(1) solid #eee;

    h3 {
      font-size: mrem(40);
      margin-bottom: mvw(8);
    }
    p {
      font-size: mrem(28);
      color: rgba($color: #000000, $alpha: 0.6);
    }
  }
}
</style>
