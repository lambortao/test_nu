export default (path, resolve) => ({
  path: '/en',
  component: resolve(path, 'pagesEn/App.vue'),
  children: [{
    path: '',
    component: resolve(path, 'pagesEn/default/layout'),
    children: [
      {
        path: '',
        name: 'homeIndex',
        meta: {
          name: '首页'
        },
        component: resolve(path, 'pagesEn/default/home')
      },
      {
        path: 'product',
        name: 'productIndex',
        component: resolve(path, 'pagesEn/default/product')
      },
      {
        path: 'product/:id',
        name: 'productDetail',
        component: resolve(path, 'pagesEn/default/product/detail/index.vue')
      },
      {
        path: 'news',
        name: 'newsIndex',
        meta: {
          name: '新闻列表'
        },
        component: resolve(path, 'pagesEn/default/news')
      },
      {
        path: 'news/:id',
        name: 'newsDetailIndex',
        meta: {
          name: '新闻详情'
        },
        component: resolve(path, 'pagesEn/default/news/detail/index.vue')
      },
      {
        path: 'case',
        name: 'caseIndex',
        meta: {
          name: '案例列表'
        },
        component: resolve(path, 'pagesEn/default/case')
      },
      {
        path: 'casedetail',
        name: 'caseDetailIndex',
        meta: {
          name: '案例详情'
        },
        component: resolve(path, 'pagesEn/default/case/detail/index.vue')
      },
      {
        path: 'branddetail',
        name: 'branddetailIndex',
        meta: {
          name: '案例列表'
        },
        component: resolve(path, 'pagesEn/default/case/detail/detail.vue')
      },
      {
        path: 'store',
        name: 'storeIndex',
        meta: {
          name: '门店页'
        },
        component: resolve(path, 'pagesEn/default/store')
      },
      {
        path: 'storedetail',
        name: 'usersIn',
        meta: {
          name: '门店详情页'
        },
        component: resolve(path, 'pagesEn/mobile/store/detail')
      },
      {
        path: 'favorite',
        name: 'FavoritePage',
        meta: {
          name: '收藏夹页面'
        },
        component: resolve(path, 'pagesEn/default/favorite')
      }, {
        path: 'marketing',
        name: 'MarketingPage',
        meta: {
          name: '营销工具页面'
        },
        component: resolve(path, 'pagesEn/default/Marketing')
      },
      {
        path: 'marketing/detail',
        name: 'MarketingDetailPage',
        meta: {
          name: '营销工具详情页面'
        },
        component: resolve(path, 'pagesEn/default/Marketing/detail')
      }, {
        path: 'marketing/series',
        name: 'MarketingSeriesPage',
        meta: {
          name: '营销工具系列页面'
        },
        component: resolve(path, 'pagesEn/default/Marketing/series')
      },
      {
        path: 'marketing/search',
        name: 'MarketingSearchPage',
        meta: {
          name: '营销工具搜索页面'
        },
        component: resolve(path, 'pagesEn/default/Marketing/search')
      },
      {
        path: 'inspiration',
        name: 'inspirationIndex',
        meta: {
          name: '灵感簿'
        },
        component: resolve(path, 'pagesEn/default/favorite/inspiration')
      },
      {
        path: 'inspiration/detail/:id',
        name: 'inspirationDetail',
        meta: {
          name: '灵感簿详情页'
        },
        component: resolve(path, 'pagesEn/mobile/inspiration/detail.vue')
      },
      {
        path: 'brand',
        name: 'brandIndex',
        meta: {
          name: '品牌'
        },
        component: resolve(path, 'pagesEn/default/brand'),
        redirect: 'brand/hay',
        children: [{
          path: 'hay',
          component: resolve(path, 'pagesEn/default/brand/child/hay.vue')
        }, {
          path: 'frandsen',
          component: resolve(path, 'pagesEn/default/brand/child/frandsen.vue')
        }, {
          path: 'verpan',
          component: resolve(path, 'pagesEn/default/brand/child/verpan.vue')
        }, {
          path: 'tradition',
          component: resolve(path, 'pagesEn/default/brand/child/tradition.vue')
        }, {
          path: 'studio',
          component: resolve(path, 'pagesEn/default/brand/child/studio.vue')
        }]
      },
      {
        path: 'stylist',
        name: 'stylistIndex',
        meta: {
          name: '设计师详情页'
        },
        component: resolve(path, 'pagesEn/default/brand/stylist.vue')
      },
      {
        path: 'search',
        name: 'searchIndex',
        meta: {
          name: '搜索页'
        },
        component: resolve(path, 'pagesEn/default/search')
      },
      {
        path: 'user',
        name: 'userIndex',
        meta: {
          name: '搜索页'
        },
        component: resolve(path, 'pagesEn/default/user')
      },
      {
        path: 'storesearch',
        name: 'usersIndex',
        meta: {
          name: '门店搜索页'
        },
        component: resolve(path, 'pagesEn/default/store/detail')
      },
      {
        path: 'clause',
        name: 'clauseIndex',
        meta: {
          name: '使用条款'
        },
        component: resolve(path, 'pagesEn/default/clause')
      }, {
        path: 'policy',
        name: 'policyIndex',
        meta: {
          name: '保护政策'
        },
        component: resolve(path, 'pagesEn/default/clause/policy.vue')
      }, {
        path: 'contactus',
        name: 'contactUs',
        meta: {
          name: '联系我们'
        },
        component: resolve(path, 'pagesEn/default/contactus/index.vue')
      }
    ]
  }, {
    path: '/login',
    meta: {
      name: '登录注册'
    },
    component: resolve(path, 'pagesEn/default/login')
  }]
})
