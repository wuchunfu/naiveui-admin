import { Router } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useAuthStore, useRouteStore } from '@/store';
import { RouterEnum } from '@/enums/RouterEnum';

const whiteList: string[] = [RouterEnum.LOGIN, RouterEnum.REGISTER];

export const getPageTitle = (pageTitle: string): string => {
  const title = import.meta.env.VITE_APP_TITLE;
  if (pageTitle) {
    // 拼接每个路由页面的名称显示在浏览器
    return `${ pageTitle } - ${ title }`;
  }
  return title;
};

NProgress.configure({ showSpinner: false });

export const createRouterGuard = async (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    // 判断是否是外链，如果是直接打开网页并拦截跳转
    if (typeof to.meta.href === 'string') {
      window.open(to.meta.href);
      // 取消当前导航
      return next(false);
    }

    NProgress.start();
    //@ts-ignore
    window.$loadingBar?.start();
    document.title = getPageTitle(typeof to.meta.title === 'string' ? to.meta.title : '');

    const authStore = useAuthStore();
    const routeStore = useRouteStore();

    // 判断是否已经登录
    if (authStore.token) {
      // 已登录，访问登录页或注册页，则直接进入首页
      if (to.path === RouterEnum.LOGIN || to.path === RouterEnum.REGISTER) {
        return next({ path: RouterEnum.INDEX });
      }

      // 已登录，判断是否在白名单，如果在则直接进入
      if (whiteList.includes(to.path)) {
        return next();
      }

      // 判断路由是否加载，未加载则加载
      if (!routeStore.isInitRoute) {
        await routeStore.initRoute();

        if (to.name === 'not-found') {
          // 等待权限路由加载好了，回到之前的路由,否则404
          const path = to.redirectedFrom?.name === 'root' ? RouterEnum.INDEX : to.fullPath;
          return next({
            path: path,
            replace: true,
            query: to.query,
            hash: to.hash,
          });
        }

        return next();
      }

      return next();
    }

    // 未登录，判断是否在白名单，如果在则直接进入
    if (whiteList.includes(to.path)) {
      return next();
    }

    // 未登录，全部重定向到登录页
    const redirect = encodeURIComponent(to.fullPath || RouterEnum.INDEX);
    return next({
      path: RouterEnum.LOGIN,
      query: {
        redirect: redirect
      }
    });
  });

  router.afterEach((to, from) => {
    document.title = getPageTitle(typeof to.meta.title === 'string' ? to.meta.title : '');
    NProgress.done();
    //@ts-ignore
    window.$loadingBar?.finish();
  });

  router.onError((error) => {
    console.error('Router error:', error);
    NProgress.done();
    //@ts-ignore
    window.$loadingBar?.error();
  })
};
