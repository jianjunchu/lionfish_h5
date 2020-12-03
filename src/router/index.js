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
    component: () => import('@/lionfish_comshop/pages/login/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }

  },
  {
    name: '/regist',
    path: '/regist',
    component: () => import('@/lionfish_comshop/pages/regist/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/t2',
    path: '/t2',
    component: () => import('@/lionfish_comshop/pages/check/template2-button'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/home',
    path: '/home',
    component: () => import('@/lionfish_comshop/pages/check/home'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/hometest',
    path: '/hometest',
    component: () => import('@/lionfish_comshop/pages/check/hometest'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/t3',
    path: '/t3',
    component: () => import('@/lionfish_comshop/pages/check/template3-button'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/userInfo',
    path: '/userInfo',
    component: () => import('@/lionfish_comshop/pages/regist/userInfo'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/privatepolic',
    path: '/privatepolic',
    component: () => import('@/lionfish_comshop/pages/regist/privatepolic'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/index/index',
    path: '',
    component: () => import('@/lionfish_comshop/pages/index/index'),
    hidden: true,
    meta: {
      keepAlive: true,
      scrollTop: 0
    }
  },
  {
    name: '/lionfish_comshop/pages/index/index',
    path: '/lionfish_comshop/pages/index/index',
    component: () => import('@/lionfish_comshop/pages/index/index'),
    hidden: true,
    meta: {
      keepAlive: true,
      scrollTop: 0
    }
  },
  {
    name: '/lionfish_comshop/pages/type/index',
    path: '/lionfish_comshop/pages/type/index',
    component: () => import('@/lionfish_comshop/pages/type/index'),
    hidden: true,
    meta: {
      keepAlive: true
    }
  },
  {
    name: '/lionfish_comshop/pages/order/index',
    path: '/lionfish_comshop/pages/order/index',
    component: () => import('@/lionfish_comshop/pages/order/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  }, {
    name: '/lionfish_comshop/pages/order/order',
    path: '/lionfish_comshop/pages/order/order',
    component: () => import('@/lionfish_comshop/pages/order/order'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/user/me',
    path: '/lionfish_comshop/pages/user/me',
    component: () => import('@/lionfish_comshop/pages/user/me'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/user/articleProtocol',
    path: '/lionfish_comshop/pages/user/articleProtocol',
    component: () => import('@/lionfish_comshop/pages/user/articleProtocol'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/user/protocol',
    path: '/lionfish_comshop/pages/user/protocol',
    component: () => import('@/lionfish_comshop/pages/user/protocol'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/user/coupon',
    path: '/lionfish_comshop/pages/user/coupon',
    component: () => import('@/lionfish_comshop/pages/user/coupon'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/goods/goodsDetail',
    path: '/lionfish_comshop/pages/goods/goodsDetail',
    component: () => import('@/lionfish_comshop/pages/goods/goodsDetail'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/goods/comment',
    path: '/lionfish_comshop/pages/goods/comment',
    component: () => import('@/lionfish_comshop/pages/goods/comment'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/goods/buyRecords',
    path: '/lionfish_comshop/pages/goods/buyRecords',
    component: () => import('@/lionfish_comshop/pages/goods/buyRecords'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/index',
    path: '/lionfish_comshop/pages/groupCenter/index',
    component: () => import('@/lionfish_comshop/pages/groupCenter/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/groupList',
    path: '/lionfish_comshop/pages/groupCenter/groupList',
    component: () => import('@/lionfish_comshop/pages/groupCenter/groupList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/groupDetail',
    path: '/lionfish_comshop/pages/groupCenter/groupDetail',
    component: () => import('@/lionfish_comshop/pages/groupCenter/groupDetail'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/apply',
    path: '/lionfish_comshop/pages/groupCenter/apply',
    component: () => import('@/lionfish_comshop/pages/groupCenter/apply'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/recruit',
    path: '/lionfish_comshop/pages/groupCenter/recruit',
    component: () => import('@/lionfish_comshop/pages/groupCenter/recruit'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/groupTime',
    path: '/lionfish_comshop/pages/groupCenter/groupTime',
    component: () => import('@/lionfish_comshop/pages/groupCenter/groupTime'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/distributionList',
    path: '/lionfish_comshop/pages/groupCenter/distributionList',
    component: () => import('@/lionfish_comshop/pages/groupCenter/distributionList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/wallet',
    path: '/lionfish_comshop/pages/groupCenter/wallet',
    component: () => import('@/lionfish_comshop/pages/groupCenter/wallet'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/editInfo',
    path: '/lionfish_comshop/pages/groupCenter/editInfo',
    component: () => import('@/lionfish_comshop/pages/groupCenter/editInfo'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/detailsList',
    path: '/lionfish_comshop/pages/groupCenter/detailsList',
    component: () => import('@/lionfish_comshop/pages/groupCenter/detailsList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/groupCenter/cashList',
    path: '/lionfish_comshop/pages/groupCenter/cashList',
    component: () => import('@/lionfish_comshop/pages/groupCenter/cashList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/order/evaluate',
    path: '/lionfish_comshop/pages/order/evaluate',
    component: () => import('@/lionfish_comshop/pages/order/evaluate'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/order/shopCart',
    path: '/lionfish_comshop/pages/order/shopCart',
    component: () => import('@/lionfish_comshop/pages/order/shopCart'),
    hidden: true,
    meta: {
      keepAlive: true
    }
  },
  {
    name: '/lionfish_comshop/pages/order/placeOrder',
    path: '/lionfish_comshop/pages/order/placeOrder',
    component: () => import('@/lionfish_comshop/pages/order/placeOrder'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/position/community',
    path: '/lionfish_comshop/pages/position/community',
    component: () => import('@/lionfish_comshop/pages/position/community'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/404',
    path: '/404',
    component: () => import('@/lionfish_comshop/pages/404'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },

  {
    name: '/lionfish_comshop/pages/type/result',
    path: '/lionfish_comshop/pages/type/result',
    component: () => import('@/lionfish_comshop/pages/type/result'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/position/search',
    path: '/lionfish_comshop/pages/position/search',
    component: () => import('@/lionfish_comshop/pages/position/search'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/refund/refundList',
    path: '/lionfish_comshop/pages/refund/refundList',
    component: () => import('@/lionfish_comshop/pages/refund/refundList'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/order/refund',
    path: '/lionfish_comshop/pages/order/refund',
    component: () => import('@/lionfish_comshop/pages/order/refund'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/order/refunddetail',
    path: '/lionfish_comshop/pages/order/refunddetail',
    component: () => import('@/lionfish_comshop/pages/order/refunddetail'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/type/details',
    path: '/lionfish_comshop/pages/type/details',
    component: () => import('@/lionfish_comshop/pages/type/details'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/web-view',
    path: '/lionfish_comshop/pages/web-view',
    component: () => import('@/lionfish_comshop/pages/web-view'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/user/rechargeDetails',
    path: '/lionfish_comshop/pages/user/rechargeDetails',
    component: () => import('@/lionfish_comshop/pages/user/rechargeDetails'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    name: '/lionfish_comshop/pages/user/charge',
    path: '/lionfish_comshop/pages/user/charge',
    component: () => import('@/lionfish_comshop/pages/user/charge'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
{
    name: '/lottery',
    path: '/lottery',
    component: () => import('@//lionfish_comshop/pages/lottery/lottery'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
{
    name: '/lottery_record',
    path: '/lottery_record',
    component: () => import('@//lionfish_comshop/pages/lottery/lottery_record'),
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
