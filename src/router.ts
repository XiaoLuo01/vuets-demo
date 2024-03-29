import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/Index.vue'
import jwt_decode from 'jwt-decode';

Vue.use(Router)

/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
  }
**/

export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    hidden: true,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'fa fa-home'
        },
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    hidden: true,
    meta: {
      title: '数据管理',
      icon: 'fa fa-database'
    },
    redirect: '/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: {
          title: '表格管理',
          icon: 'fa fa-table'
        },
        component: () => import("@/views/DataManage/TableData.vue")
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: {
          title: '图表管理',
          icon: 'fa fa-bar-chart'
        },
        component: () => import("@/views/DataManage/ChartsData.vue")
      },
      {
        path: '/formData',
        name: 'formData',
        meta: {
          title: '表单管理',
          icon: 'fa fa-file-text-o',
          roles: ["admin", "editor"]
        },
        component: () => import("@/views/DataManage/FormData.vue")
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    hidden: true,
    redirect: '/accountData',
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: {
          title: '账户管理',
          icon: 'fa fa-user-plus',
          roles: ["admin"]
        },
        component: () => import("@/views/UserManage/AccountData.vue")
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: false,
    redirect: '/userInfo',
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          title: '个人中心'
        },
        component: () => import("@/views/UserManage/UserInfo.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: false,
    meta: { title: '系统登录' },
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: '/password',
    name: 'password',
    hidden: false,
    meta: { title: '找回密码' },
    component: () => import("@/views/Login/Password.vue")
  },
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404'},
    component: () => import("@/views/404.vue")
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router: any = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})

// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == '/login' || to.path == '/password') {
    next();
  } else {
    if (isLogin) {
      const decoded: any = jwt_decode(localStorage.tsToken);
      const { key } = decoded;
      // 权限判断
      if (hasPermission(key, to)) {
        next();
      } else {
        next('/404'); // 没有权限进入
      }
    } else {
      next('/login')
    }
  }
})


/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPermission(roles: string, route: any) {
  if (route.meta && route.meta.roles) {
    // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
    return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
  } else {
    // 默认不设置有权限
    return true;
  }
}

export default router