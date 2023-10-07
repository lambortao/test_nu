/** 产品品牌的数据 */

// 材质

export const state = () => ({
  value: [],
  textureList: [
    // {
    //   name: '木制',
    //   name_en: 'Wood',
    //   image: require('~/assets/images/product/texture/img1.png')
    // },
    // {
    //   name: '皮革',
    //   name_en: 'Leather',
    //   image: require('~/assets/images/product/texture/img2.png')
    // },
    // {
    //   name: '纺织',
    //   name_en: 'Textile',
    //   image: require('~/assets/images/product/texture/img3.png')
    // },
    // {
    //   name: '金属',
    //   name_en: 'Metal',
    //   image: require('~/assets/images/product/texture/img4.png')
    // },
    // {
    //   name: '玻璃',
    //   name_en: 'Glass',
    //   image: require('~/assets/images/product/texture/img5.png')
    // },
    // {
    //   name: '石材',
    //   name_en: 'Stone',
    //   image: require('~/assets/images/product/texture/img6.png')
    // },
    // {
    //   name: '塑料',
    //   name_en: 'Plastic',
    //   image: require('~/assets/images/product/texture/img7.png')
    // },
    // {
    //   name: '陶瓷',
    //   name_en: 'Ceramic',
    //   image: require('~/assets/images/product/texture/img8.png')
    // },
    // {
    //   name: '蜡质',
    //   name_en: 'Wax',
    //   image: require('~/assets/images/product/texture/img9.png')
    // },
    // {
    //   name: '纸制',
    //   name_en: 'Paper',
    //   image: require('~/assets/images/product/texture/img10.png')
    // },
    // {
    //   name: '竹子',
    //   name_en: 'Bamboo',
    //   image: require('~/assets/images/product/texture/img11.png')
    // }
  ]
})

export const mutations = {
  USETEXTURE (state, data) {
    state.value = data
  },
  // 修改材质数据
  setTextureList (state, data) {
    if (data.data.length > 0) {
      // 新数组
      const newArr = []
      // 材质模板列表
      const textureListMain = [
        {
          name: '木制',
          name_en: 'Wood',
          image: require('~/assets/images/product/texture/img1.png')
        },
        {
          name: '皮革',
          name_en: 'Leather',
          image: require('~/assets/images/product/texture/img2.png')
        },
        {
          name: '纺织',
          name_en: 'Textile',
          image: require('~/assets/images/product/texture/img3.png')
        },
        {
          name: '金属',
          name_en: 'Metal',
          image: require('~/assets/images/product/texture/img4.png')
        },
        {
          name: '玻璃',
          name_en: 'Glass',
          image: require('~/assets/images/product/texture/img5.png')
        },
        {
          name: '石材',
          name_en: 'Stone',
          image: require('~/assets/images/product/texture/img6.png')
        },
        {
          name: '塑料',
          name_en: 'Plastic',
          image: require('~/assets/images/product/texture/img7.png')
        },
        {
          name: '陶瓷',
          name_en: 'Ceramic',
          image: require('~/assets/images/product/texture/img8.png')
        },
        {
          name: '蜡质',
          name_en: 'Wax',
          image: require('~/assets/images/product/texture/img9.png')
        },
        {
          name: '纸制',
          name_en: 'Paper',
          image: require('~/assets/images/product/texture/img10.png')
        },
        {
          name: '竹子',
          name_en: 'Bamboo',
          image: require('~/assets/images/product/texture/img11.png')
        }
      ]
      // 筛选出目前已有的材质
      textureListMain.forEach((el) => {
        // 判断是否存在，存在就添加到新数组中
        data.data.forEach((name) => {
          // 判断是中文版还是英文版
          if (data.lang === 'cn') {
            if (name === el.name) {
              newArr.push(el)
            }
          } else if (data.lang === 'en') {
            if (name === el.name_en) {
              newArr.push(el)
            }
          }
        })
      })

      // // 筛选已选中的数据是否需要清除
      // const newValue = []
      // // 是否存在
      // let include = null
      // // 判断是否存在，存在就添加到新数组中
      // state.value.forEach((el) => {
      //   // 判断是中文版还是英文版
      //   if (data.lang === 'cn') {
      //     include = newArr.some((isName) => {
      //       return isName.name === el
      //     })
      //   } else if (data.lang === 'en') {
      //     include = newArr.some((isName) => {
      //       return isName.name_en === el
      //     })
      //   }

      //   if (include) {
      //     newValue.push(el)
      //   }
      // })
      // // 进行赋值
      // state.value = [...newValue]
      state.textureList = [...newArr]
    } else {
      state.textureList = []
    }
  }
}

export const actions = {
  useTexture ({ commit }, data) {
    commit('USETEXTURE', data)
  }
}

export const getters = {

}
