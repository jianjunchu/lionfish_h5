import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true,
 meta: {
      keepAlive: false
    }                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    name: '/login',
    path: '/login',
    component: () => import('@/ulink_comshop/pages/login/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }

  },
  {
    name: '/regist',
    path: '/regist',
    component: () => import('@/ulink_comshop/pages/regist/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/userInfo',
    path: '/userInfo',
    component: () => import('@/ulink_comshop/pages/regist/userInfo'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/privatepolic',
    path: '/privatepolic',
    component: () => import('@/ulink_comshop/pages/regist/privatepolic'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/index/index',
    path: '',
    component: () => import('@/ulink_comshop/pages/index/index'),
    hidden: true,
    meta: {
      keepAlive: true,
      scrollTop: 0
    }
  },
  {
    name: '/ulink_comshop/pages/index/index',
    path: '/ulink_comshop/pages/index/index',
    component: () => import('@/ulink_comshop/pages/index/index'),
    hidden: true,
    meta: {
      keepAlive: true,
      scrollTop: 0
    }
  },
  {
    name: '/ulink_comshop/pages/type/index',
    path: '/ulink_comshop/pages/type/index',
    component: () => import('@/ulink_comshop/pages/type/index'),
    hidden: true,
    meta: {
      keepAlive: true
    }
  },
  {
    name: '/ulink_comshop/pages/order/index',
    path: '/ulink_comshop/pages/order/index',
    component: () => import('@/ulink_comshop/pages/order/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  }, {
    name: '/ulink_comshop/pages/order/order',
    path: '/ulink_comshop/pages/order/order',
    component: () => import('@/ulink_comshop/pages/order/order'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/user/me',
    path: '/ulink_comshop/pages/user/me',
    component: () => import('@/ulink_comshop/pages/user/me'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/user/articleProtocol',
    path: '/ulink_comshop/pages/user/articleProtocol',
    component: () => import('@/ulink_comshop/pages/user/articleProtocol'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/user/protocol',
    path: '/ulink_comshop/pages/user/protocol',
    component: () => import('@/ulink_comshop/pages/user/protocol'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/user/coupon',
    path: '/ulink_comshop/pages/user/coupon',
    component: () => import('@/ulink_comshop/pages/user/coupon'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/goods/goodsDetail',
    path: '/ulink_comshop/pages/goods/goodsDetail',
    component: () => import('@/ulink_comshop/pages/goods/goodsDetail'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/goods/comment',
    path: '/ulink_comshop/pages/goods/comment',
    component: () => import('@/ulink_comshop/pages/goods/comment'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/goods/buyRecords',
    path: '/ulink_comshop/pages/goods/buyRecords',
    component: () => import('@/ulink_comshop/pages/goods/buyRecords'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/index',
    path: '/ulink_comshop/pages/groupCenter/index',
    component: () => import('@/ulink_comshop/pages/groupCenter/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/groupList',
    path: '/ulink_comshop/pages/groupCenter/groupList',
    component: () => import('@/ulink_comshop/pages/groupCenter/groupList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/groupDetail',
    path: '/ulink_comshop/pages/groupCenter/groupDetail',
    component: () => import('@/ulink_comshop/pages/groupCenter/groupDetail'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/apply',
    path: '/ulink_comshop/pages/groupCenter/apply',
    component: () => import('@/ulink_comshop/pages/groupCenter/apply'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/recruit',
    path: '/ulink_comshop/pages/groupCenter/recruit',
    component: () => import('@/ulink_comshop/pages/groupCenter/recruit'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/groupTime',
    path: '/ulink_comshop/pages/groupCenter/groupTime',
    component: () => import('@/ulink_comshop/pages/groupCenter/groupTime'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/distributionList',
    path: '/ulink_comshop/pages/groupCenter/distributionList',
    component: () => import('@/ulink_comshop/pages/groupCenter/distributionList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/wallet',
    path: '/ulink_comshop/pages/groupCenter/wallet',
    component: () => import('@/ulink_comshop/pages/groupCenter/wallet'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/editInfo',
    path: '/ulink_comshop/pages/groupCenter/editInfo',
    component: () => import('@/ulink_comshop/pages/groupCenter/editInfo'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/detailsList',
    path: '/ulink_comshop/pages/groupCenter/detailsList',
    component: () => import('@/ulink_comshop/pages/groupCenter/detailsList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/groupCenter/cashList',
    path: '/ulink_comshop/pages/groupCenter/cashList',
    component: () => import('@/ulink_comshop/pages/groupCenter/cashList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/order/evaluate',
    path: '/ulink_comshop/pages/order/evaluate',
    component: () => import('@/ulink_comshop/pages/order/evaluate'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/order/shopCart',
    path: '/ulink_comshop/pages/order/shopCart',
    component: () => import('@/ulink_comshop/pages/order/shopCart'),
    hidden: true,
    meta: {
      keepAlive: true
    }
  },
  {
    name: '/ulink_comshop/pages/order/placeOrder',
    path: '/ulink_comshop/pages/order/placeOrder',
    component: () => import('@/ulink_comshop/pages/order/placeOrder'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/position/community',
    path: '/ulink_comshop/pages/position/community',
    component: () => import('@/ulink_comshop/pages/position/community'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/404',
    path: '/404',
    component: () => import('@/ulink_comshop/pages/404'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },

  {
    name: '/ulink_comshop/pages/type/result',
    path: '/ulink_comshop/pages/type/result',
    component: () => import('@/ulink_comshop/pages/type/result'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/position/search',
    path: '/ulink_comshop/pages/position/search',
    component: () => import('@/ulink_comshop/pages/position/search'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/refund/refundList',
    path: '/ulink_comshop/pages/refund/refundList',
    component: () => import('@/ulink_comshop/pages/refund/refundList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/order/refund',
    path: '/ulink_comshop/pages/order/refund',
    component: () => import('@/ulink_comshop/pages/order/refund'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/order/refunddetail',
    path: '/ulink_comshop/pages/order/refunddetail',
    component: () => import('@/ulink_comshop/pages/order/refunddetail'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/type/details',
    path: '/ulink_comshop/pages/type/details',
    component: () => import('@/ulink_comshop/pages/type/details'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/web-view',
    path: '/ulink_comshop/pages/web-view',
    component: () => import('@/ulink_comshop/pages/web-view'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/user/rechargeDetails',
    path: '/ulink_comshop/pages/user/rechargeDetails',
    component: () => import('@/ulink_comshop/pages/user/rechargeDetails'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/user/charge',
    path: '/ulink_comshop/pages/user/charge',
    component: () => import('@/ulink_comshop/pages/user/charge'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/supply/recruit',
    path: '/ulink_comshop/pages/supply/recruit',
    component: () => import('@/ulink_comshop/pages/supply/recruit'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/supply/apply',
    path: '/ulink_comshop/pages/supply/apply',
    component: () => import('@/ulink_comshop/pages/supply/apply'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/supply/index',
    path: '/ulink_comshop/pages/supply/index',
    component: () => import('@/ulink_comshop/pages/supply/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/supply/home',
    path: '/ulink_comshop/pages/supply/home',
    component: () => import('@/ulink_comshop/pages/supply/home'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/supply/home',
    path: '/ulink_comshop/pages/supply/home',
    component: () => import('@/ulink_comshop/pages/supply/home'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/moduleA/score/signin',
    path: '/ulink_comshop/moduleA/score/signin',
    component: () => import('@/ulink_comshop/moduleA/score/signin'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/moduleA/score/scoreDetails',
    path: '/ulink_comshop/moduleA/score/scoreDetails',
    component: () => import('@/ulink_comshop/moduleA/score/scoreDetails'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/pages/user/rule',
    path: '/ulink_comshop/pages/user/rule',
    component: () => import('@/ulink_comshop/pages/user/rule'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/distributionCenter/pages/fans',
    path: '/ulink_comshop/distributionCenter/pages/fans',
    component: () => import('@/ulink_comshop/distributionCenter/pages/fans'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/distributionCenter/pages/me',
    path: '/ulink_comshop/distributionCenter/pages/me',
    component: () => import('@/ulink_comshop/distributionCenter/pages/me'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/distributionCenter/pages/member',
    path: '/ulink_comshop/distributionCenter/pages/member',
    component: () => import('@/ulink_comshop/distributionCenter/pages/member'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/distributionCenter/pages/excharge',
    path: '/ulink_comshop/distributionCenter/pages/excharge',
    component: () => import('@/ulink_comshop/distributionCenter/pages/excharge'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/distributionCenter/pages/exchargeRecord',
    path: '/ulink_comshop/distributionCenter/pages/exchargeRecord',
    component: () => import('@/ulink_comshop/distributionCenter/pages/exchargeRecord'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/ulink_comshop/distributionCenter/pages/goodsDetails',
    path: '/ulink_comshop/distributionCenter/pages/goodsDetails',
    component: () => import('@/ulink_comshop/distributionCenter/pages/goodsDetails'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  // 404 page must be placed at the end !!!
  {
    name: '/404',
    path: '*', redirect: '/404', hidden: true,
    meta: {
      keepAlive: false
    }
  }
]

const createRouter = () => new Router({
  /*mode: 'history', // require service support
  scrollBehavior: () => ({ y: 100 }),*/
  routes: constantRoutes

})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
