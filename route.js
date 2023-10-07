const cnPage = resolve => ({
  path: '/',
  component: resolve(__dirname, 'pages/App.vue'),
  children: [{
    path: '',
    component: resolve(__dirname, 'pages/default/layout'),
    children: [
      {
        path: '',
        name: 'homeIndex',
        meta: {
          name: '首页'
        },
        component: resolve(__dirname, 'pages/default/home')
      },
      {
        path: 'product',
        name: 'productIndex',
        component: resolve(__dirname, 'pages/default/product')
      },
      {
        path: 'product/:id',
        name: 'productDetail',
        component: resolve(__dirname, 'pages/default/product/detail/index.vue')
      },
      {
        path: 'news',
        name: 'newsIndex',
        meta: {
          name: '新闻列表'
        },
        component: resolve(__dirname, 'pages/default/news')
      },
      {
        path: 'news/:id',
        name: 'newsDetailIndex',
        meta: {
          name: '新闻详情'
        },
        component: resolve(__dirname, 'pages/default/news/detail/index.vue')
      },
      {
        path: 'active',
        name: 'activeIndex',
        meta: {
          name: '活动详情'
        },
        component: resolve(__dirname, 'pages/default/active')
      },
      {
        path: 'case',
        name: 'caseIndex',
        meta: {
          name: '案例列表'
        },
        component: resolve(__dirname, 'pages/default/case')
      },
      {
        path: 'casedetail',
        name: 'caseDetailIndex',
        meta: {
          name: '案例详情'
        },
        component: resolve(__dirname, 'pages/default/case/detail/index.vue')
      },
      {
        path: 'branddetail',
        name: 'branddetailIndex',
        meta: {
          name: '案例列表'
        },
        component: resolve(__dirname, 'pages/default/case/detail/detail.vue')
      },
      {
        path: 'store',
        name: 'storeIndex',
        meta: {
          name: '门店页'
        },
        component: resolve(__dirname, 'pages/default/store')
      },
      {
        path: 'storedetail',
        name: 'usersIn',
        meta: {
          name: '门店详情页'
        },
        component: resolve(__dirname, 'pages/mobile/store/detail')
      },
      {
        path: 'favorite',
        name: 'FavoritePage',
        meta: {
          name: '收藏夹页面'
        },
        component: resolve(__dirname, 'pages/default/favorite')
      }, {
        path: 'marketing',
        name: 'MarketingPage',
        meta: {
          name: '营销工具页面'
        },
        component: resolve(__dirname, 'pages/default/Marketing')
      },
      {
        path: 'marketing/detail',
        name: 'MarketingDetailPage',
        meta: {
          name: '营销工具详情页面'
        },
        component: resolve(__dirname, 'pages/default/Marketing/detail')
      },
      {
        path: 'marketing/series',
        name: 'MarketingSeriesPage',
        meta: {
          name: '营销工系列页面'
        },
        component: resolve(__dirname, 'pages/default/Marketing/series')
      },
      {
        path: 'marketing/search',
        name: 'MarketingSearchPage',
        meta: {
          name: '营销工具搜索页面'
        },
        component: resolve(__dirname, 'pages/default/Marketing/search')
      },
      {
        path: 'inspiration',
        name: 'inspirationIndex',
        meta: {
          name: '灵感簿'
        },
        component: resolve(__dirname, 'pages/default/favorite/inspiration')
      },
      {
        path: 'inspiration/detail/:id',
        name: 'inspirationDetail',
        meta: {
          name: '灵感簿详情页'
        },
        component: resolve(__dirname, 'pages/mobile/inspiration/detail.vue')
      },
      {
        path: 'brand',
        name: 'brandIndex',
        meta: {
          name: '品牌'
        },
        component: resolve(__dirname, 'pages/default/brand'),
        redirect: 'brand/hay',
        children: [{
          path: 'hay',
          component: resolve(__dirname, 'pages/default/brand/child/hay.vue')
        }, {
          path: 'frandsen',
          component: resolve(__dirname, 'pages/default/brand/child/frandsen.vue')
        }, {
          path: 'verpan',
          component: resolve(__dirname, 'pages/default/brand/child/verpan.vue')
        }, {
          path: 'tradition',
          component: resolve(__dirname, 'pages/default/brand/child/tradition.vue')
        }, {
          path: 'studio',
          component: resolve(__dirname, 'pages/default/brand/child/studio.vue')
        },
        {
          path: 'nine',
          component: resolve(__dirname, 'pages/default/brand/child/nine.vue')
        }]
      },
      {
        path: 'stylist',
        name: 'stylistIndex',
        meta: {
          name: '设计师详情页'
        },
        component: resolve(__dirname, 'pages/default/brand/stylist.vue')
      },
      {
        path: 'search',
        name: 'searchIndex',
        meta: {
          name: '搜索页'
        },
        component: resolve(__dirname, 'pages/default/search')
      },
      {
        path: 'user',
        name: 'userIndex',
        meta: {
          name: '搜索页'
        },
        component: resolve(__dirname, 'pages/default/user')
      },
      {
        path: 'storesearch',
        name: 'usersIndex',
        meta: {
          name: '门店搜索页'
        },
        component: resolve(__dirname, 'pages/default/store/detail')
      },
      {
        path: 'clause',
        name: 'clauseIndex',
        meta: {
          name: '使用条款'
        },
        component: resolve(__dirname, 'pages/default/clause')
      }, {
        path: 'policy',
        name: 'policyIndex',
        meta: {
          name: '保护政策'
        },
        component: resolve(__dirname, 'pages/default/clause/policy.vue')
      }, {
        path: 'contactus',
        name: 'contactUs',
        meta: {
          name: '联系我们'
        },
        component: resolve(__dirname, 'pages/default/contactus/index.vue')
      }
    ]
  }, {
    path: '/login',
    meta: {
      name: '登录注册'
    },
    component: resolve(__dirname, 'pages/default/login')
  },
  {
    path: '/login/wechat',
    meta: {
      name: '手机号绑定页面'
    },
    component: resolve(__dirname, 'pages/default/login/wechat')
  }]
})

const enPage = resolve => ({
  path: '/en',
  component: resolve(__dirname, 'pagesEn/App.vue'),
  children: [{
    path: '',
    component: resolve(__dirname, 'pagesEn/default/layout'),
    children: [
      {
        path: '/',
        name: 'homeIndexEN',
        meta: {
          name: '首页'
        },
        component: resolve(__dirname, 'pagesEn/default/home')
      },
      {
        path: '/en/product',
        name: 'productIndexEN',
        component: resolve(__dirname, 'pagesEn/default/product')
      },
      {
        path: '/en/product/:id',
        name: 'productDetailEN',
        component: resolve(__dirname, 'pagesEn/default/product/detail/index.vue')
      },
      {
        path: '/en/news',
        name: 'newsIndexEN',
        meta: {
          name: '新闻列表'
        },
        component: resolve(__dirname, 'pagesEn/default/news')
      },
      {
        path: '/en/news/:id',
        name: 'newsDetailIndexEN',
        meta: {
          name: '新闻详情'
        },
        component: resolve(__dirname, 'pagesEn/default/news/detail/index.vue')
      },
      {
        path: '/en/active',
        name: 'activeIndexEN',
        meta: {
          name: '活动详情'
        },
        component: resolve(__dirname, 'pagesEn/default/active')
      },
      {
        path: '/en/case',
        name: 'caseIndexEN',
        meta: {
          name: '案例列表'
        },
        component: resolve(__dirname, 'pagesEn/default/case')
      },
      {
        path: '/en/casedetail',
        name: 'caseDetailIndexEN',
        meta: {
          name: '案例详情'
        },
        component: resolve(__dirname, 'pagesEn/default/case/detail/index.vue')
      },
      {
        path: '/en/branddetail',
        name: 'branddetailIndexEN',
        meta: {
          name: '案例列表'
        },
        component: resolve(__dirname, 'pagesEn/default/case/detail/detail.vue')
      },
      {
        path: '/en/store',
        name: 'storeIndexEN',
        meta: {
          name: '门店页'
        },
        component: resolve(__dirname, 'pagesEn/default/store')
      },
      {
        path: '/en/storedetail',
        name: 'usersInEN',
        meta: {
          name: '门店详情页'
        },
        component: resolve(__dirname, 'pagesEn/mobile/store/detail')
      },
      {
        path: '/en/favorite',
        name: 'FavoritePageEN',
        meta: {
          name: '收藏夹页面'
        },
        component: resolve(__dirname, 'pagesEn/default/favorite')
      }, {
        path: '/en/marketing',
        name: 'MarketingPageEN',
        meta: {
          name: '营销工具页面'
        },
        component: resolve(__dirname, 'pagesEn/default/Marketing')
      },
      {
        path: '/en/marketing/detail',
        name: 'MarketingDetailPageEN',
        meta: {
          name: '营销工具详情页面'
        },
        component: resolve(__dirname, 'pagesEn/default/Marketing/detail')
      },
      {
        path: '/en/marketing/series',
        name: 'MarketingSeriesPageEN',
        meta: {
          name: '营销工系列页面'
        },
        component: resolve(__dirname, 'pagesEn/default/Marketing/series')
      },
      {
        path: '/en/marketing/search',
        name: 'MarketingSearchPageEN',
        meta: {
          name: '营销工具搜索页面'
        },
        component: resolve(__dirname, 'pagesEn/default/Marketing/search')
      },
      {
        path: '/en/inspiration',
        name: 'inspirationIndexEN',
        meta: {
          name: '灵感簿'
        },
        component: resolve(__dirname, 'pagesEn/default/favorite/inspiration')
      },
      {
        path: '/en/inspiration/detail/:id',
        name: 'inspirationDetailEN',
        meta: {
          name: '灵感簿详情页'
        },
        component: resolve(__dirname, 'pagesEn/mobile/inspiration/detail.vue')
      },
      {
        path: '/en/brand',
        name: 'brandIndexEN',
        meta: {
          name: '品牌'
        },
        component: resolve(__dirname, 'pagesEn/default/brand'),
        redirect: '/en/brand/hay',
        children: [{
          path: 'hay',
          component: resolve(__dirname, 'pagesEn/default/brand/child/hay.vue')
        }, {
          path: 'frandsen',
          component: resolve(__dirname, 'pagesEn/default/brand/child/frandsen.vue')
        }, {
          path: 'verpan',
          component: resolve(__dirname, 'pagesEn/default/brand/child/verpan.vue')
        }, {
          path: 'tradition',
          component: resolve(__dirname, 'pagesEn/default/brand/child/tradition.vue')
        }, {
          path: 'studio',
          component: resolve(__dirname, 'pagesEn/default/brand/child/studio.vue')
        }, {
          path: 'nine',
          component: resolve(__dirname, 'pagesEn/default/brand/child/nine.vue')
        }]
      },
      {
        path: '/en/stylist',
        name: 'stylistIndexEN',
        meta: {
          name: '设计师详情页'
        },
        component: resolve(__dirname, 'pagesEn/default/brand/stylist.vue')
      },
      {
        path: '/en/search',
        name: 'searchIndexEN',
        meta: {
          name: '搜索页'
        },
        component: resolve(__dirname, 'pagesEn/default/search')
      },
      {
        path: '/en/user',
        name: 'userIndexEN',
        meta: {
          name: '搜索页'
        },
        component: resolve(__dirname, 'pagesEn/default/user')
      },
      {
        path: '/en/storesearch',
        name: 'usersIndexEN',
        meta: {
          name: '门店搜索页'
        },
        component: resolve(__dirname, 'pagesEn/default/store/detail')
      },
      {
        path: '/en/clause',
        name: 'clauseIndexEN',
        meta: {
          name: '使用条款'
        },
        component: resolve(__dirname, 'pagesEn/default/clause')
      }, {
        path: '/en/policy',
        name: 'policyIndexEN',
        meta: {
          name: '保护政策'
        },
        component: resolve(__dirname, 'pagesEn/default/clause/policy.vue')
      }, {
        path: '/en/contactus',
        name: 'contactUsEN',
        meta: {
          name: '联系我们'
        },
        component: resolve(__dirname, 'pagesEn/default/contactus/index.vue')
      }
    ]
  }, {
    path: '/en/login',
    meta: {
      name: '登录注册'
    },
    component: resolve(__dirname, 'pagesEn/default/login')
  }]
})

export default (routes, resolve) => {
  return [cnPage(resolve), enPage(resolve)]
}
