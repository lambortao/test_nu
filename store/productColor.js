/** 产品品牌的数据 */

// 颜色

export const state = () => ({
  value: [],
  colorList: [
    // {
    //   name: '黑色',
    //   name_en: 'Black',
    //   image: require('~/assets/images/product/color/img1.png')
    // },
    // {
    //   name: '灰色',
    //   name_en: 'Grey',
    //   image: require('~/assets/images/product/color/img2.png')
    // },
    // {
    //   name: '白色',
    //   name_en: 'White',
    //   image: require('~/assets/images/product/color/img3.png')
    // },
    // {
    //   name: '米色',
    //   name_en: 'Beige',
    //   image: require('~/assets/images/product/color/img4.png')
    // },
    // {
    //   name: '红色',
    //   name_en: 'Red',
    //   image: require('~/assets/images/product/color/img5.png')
    // },
    // {
    //   name: '棕色',
    //   name_en: 'Brown',
    //   image: require('~/assets/images/product/color/img6.png')
    // },
    // {
    //   name: '粉色',
    //   name_en: 'Pink',
    //   image: require('~/assets/images/product/color/img7.png')
    // },
    // {
    //   name: '橙色',
    //   name_en: 'Orange',
    //   image: require('~/assets/images/product/color/img8.png')
    // },
    // {
    //   name: '黄色',
    //   name_en: 'Yellow',
    //   image: require('~/assets/images/product/color/img9.png')
    // },
    // {
    //   name: '绿色',
    //   name_en: 'Green',
    //   image: require('~/assets/images/product/color/img10.png')
    // },
    // {
    //   name: '蓝色',
    //   name_en: 'Blue',
    //   image: require('~/assets/images/product/color/img11.png')
    // },
    // {
    //   name: '紫色',
    //   name_en: 'Purple',
    //   image: require('~/assets/images/product/color/img12.png')
    // },
    // {
    //   name: '金色',
    //   name_en: 'Gold',
    //   image: require('~/assets/images/product/color/img13.png')
    // },
    // {
    //   name: '银色',
    //   name_en: 'Silver',
    //   image: require('~/assets/images/product/color/img14.png')
    // },
    // {
    //   name: '透明',
    //   name_en: 'Clear',
    //   image: require('~/assets/images/product/color/img15.png')
    // },
    // {
    //   name: '多色',
    //   name_en: 'Mixed',
    //   image: require('~/assets/images/product/color/img16.png')
    // }
  ]
})

export const mutations = {
  USECOLOR (state, data) {
    state.value = data
  },
  // 修改颜色数据
  setColorList (state, data) {
    if (data.data.length > 0) {
      // 颜色模板列表
      const colorListMain = [
        {
          name: '黑色',
          name_en: 'Black',
          image: require('~/assets/images/product/color/img1.png')
        },
        {
          name: '灰色',
          name_en: 'Grey',
          image: require('~/assets/images/product/color/img2.png')
        },
        {
          name: '白色',
          name_en: 'White',
          image: require('~/assets/images/product/color/img3.png')
        },
        {
          name: '米色',
          name_en: 'Beige',
          image: require('~/assets/images/product/color/img4.png')
        },
        {
          name: '红色',
          name_en: 'Red',
          image: require('~/assets/images/product/color/img5.png')
        },
        {
          name: '棕色',
          name_en: 'Brown',
          image: require('~/assets/images/product/color/img6.png')
        },
        {
          name: '粉色',
          name_en: 'Pink',
          image: require('~/assets/images/product/color/img7.png')
        },
        {
          name: '橙色',
          name_en: 'Orange',
          image: require('~/assets/images/product/color/img8.png')
        },
        {
          name: '黄色',
          name_en: 'Yellow',
          image: require('~/assets/images/product/color/img9.png')
        },
        {
          name: '绿色',
          name_en: 'Green',
          image: require('~/assets/images/product/color/img10.png')
        },
        {
          name: '蓝色',
          name_en: 'Blue',
          image: require('~/assets/images/product/color/img11.png')
        },
        {
          name: '紫色',
          name_en: 'Purple',
          image: require('~/assets/images/product/color/img12.png')
        },
        {
          name: '金色',
          name_en: 'Gold',
          image: require('~/assets/images/product/color/img13.png')
        },
        {
          name: '银色',
          name_en: 'Silver',
          image: require('~/assets/images/product/color/img14.png')
        },
        {
          name: '透明',
          name_en: 'Clear',
          image: require('~/assets/images/product/color/img15.png')
        },
        {
          name: '多色',
          name_en: 'Mixed',
          image: require('~/assets/images/product/color/img16.png')
        }
      ]
      // 筛选出当前的颜色
      const newArr = []
      colorListMain.forEach((el) => {
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
      state.colorList = [...newArr]
    } else {
      state.colorList = []
    }
  }
}

export const actions = {
  useColor ({ commit }, data) {
    commit('USECOLOR', data)
  }
}

export const getters = {

}
