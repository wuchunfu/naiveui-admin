import { RouteRecordRaw } from "vue-router";
import { RouterEnum } from "@/enums/RouterEnum";

const { VITE_ROUTE_HOME_PATH } = import.meta.env;

export const basicLayout = () => import('@/layouts/index.vue')
export const blankLayout = () => import('@/layouts/blank.vue')
export const iframeLayout = () => import('@/layouts/iframe.vue')

/**
 * 公共路由
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: RouterEnum.INDEX,
    redirect: VITE_ROUTE_HOME_PATH,
    meta: {
      title: 'Root'
    }
  },
  {
    name: 'login',
    path: RouterEnum.LOGIN,
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    },
  },
  {
    name: 'error',
    path: RouterEnum.ERROR,
    component: () => basicLayout(),
    meta: {
      title: '错误'
    },
    children: [
      {
        name: '404',
        path: RouterEnum.ERROR_404,
        component: () => import('@/views/exception/404/index.vue'),
        meta: {
          title: '404'
        },
      }
    ]
  },
  {
    name: '403',
    path: RouterEnum.ERROR_403,
    component: () => import('@/views/exception/403/index.vue'),
    meta: {
      title: '403'
    },
  },
  {
    name: 'not-found',
    path: RouterEnum.NOT_FOUND,
    meta: {
      title: '未找到'
    },
    component: () => import('@/views/exception/404/index.vue')
  }
]
