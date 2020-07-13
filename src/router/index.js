import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
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
    path: '/login',
    component: () => import('@/lionfish_comshop/pages/login/index'),
    hidden: true
  },
  {
    path: '/regist',
    component: () => import('@/lionfish_comshop/pages/regist/index'),
    hidden: true
  },
  {
    path: '/userInfo',
    component: () => import('@/lionfish_comshop/pages/regist/userInfo'),
    hidden: true
  },
  {
    path: '',
    component: () => import('@/lionfish_comshop/pages/index/index'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/index/index',
    component: () => import('@/lionfish_comshop/pages/index/index'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/type/index',
    component: () => import('@/lionfish_comshop/pages/type/index'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/order/index',
    component: () => import('@/lionfish_comshop/pages/order/index'),
    hidden: true
  }, {
    path: '/lionfish_comshop/pages/order/order',
    component: () => import('@/lionfish_comshop/pages/order/order'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/user/me',
    component: () => import('@/lionfish_comshop/pages/user/me'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/user/articleProtocol',
    component: () => import('@/lionfish_comshop/pages/user/articleProtocol'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/user/protocol',
    component: () => import('@/lionfish_comshop/pages/user/protocol'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/goods/goodsDetail',
    component: () => import('@/lionfish_comshop/pages/goods/goodsDetail'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/goods/comment',
    component: () => import('@/lionfish_comshop/pages/goods/comment'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/goods/buyRecords',
    component: () => import('@/lionfish_comshop/pages/goods/buyRecords'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/index',
    component: () => import('@/lionfish_comshop/pages/groupCenter/index'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/groupList',
    component: () => import('@/lionfish_comshop/pages/groupCenter/groupList'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/groupDetail',
    component: () => import('@/lionfish_comshop/pages/groupCenter/groupDetail'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/apply',
    component: () => import('@/lionfish_comshop/pages/groupCenter/apply'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/recruit',
    component: () => import('@/lionfish_comshop/pages/groupCenter/recruit'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/groupTime',
    component: () => import('@/lionfish_comshop/pages/groupCenter/groupTime'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/wallet',
    component: () => import('@/lionfish_comshop/pages/groupCenter/wallet'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/groupCenter/editInfo',
    component: () => import('@/lionfish_comshop/pages/groupCenter/editInfo'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/order/evaluate',
    component: () => import('@/lionfish_comshop/pages/order/evaluate'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/order/shopCart',
    component: () => import('@/lionfish_comshop/pages/order/shopCart'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/order/placeOrder',
    component: () => import('@/lionfish_comshop/pages/order/placeOrder'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/position/community',
    component: () => import('@/lionfish_comshop/pages/position/community'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/lionfish_comshop/pages/404'),
    hidden: true
  },

  {
    path: '/lionfish_comshop/pages/type/result',
    component: () => import('@/lionfish_comshop/pages/type/result'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/position/search',
    component: () => import('@/lionfish_comshop/pages/position/search'),
    hidden: true
  },
  {
    path: '/lionfish_comshop/pages/refund/refundList',
    component: () => import('@/lionfish_comshop/pages/refund/refundList'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
