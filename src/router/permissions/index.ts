import { Router } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useAuthStore, useRouteStore } from '@/store';
import { RouterEnum } from '@/enums/RouterEnum';

NProgress.configure({ showSpinner: false });
const whiteList: string[] = [RouterEnum.LOGIN, RouterEnum.REGISTER]

export function getPageTitle(pageTitle: string | undefined) {
  const title = import.meta.env.VITE_APP_TITLE;
  if (pageTitle) {
    // 拼接每个路由页面的名称显示在浏览器
    return `${ pageTitle } - ${ title }`
  }
  return `${ title }`
}

export async function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    //@ts-ignore
    window.$loadingBar?.start();
    document.title = getPageTitle(to.meta.title);

    const authStore = useAuthStore();
    const routeStore = useRouteStore();

    if (authStore.isLogin) {
      if (to.path === RouterEnum.LOGIN) {
        return next({ path: RouterEnum.INDEX });
      } else if (whiteList.includes(to.path as string)) {
        // 在免登录白名单，直接进入
        return next();
      } else {
        if (!routeStore.isInitRoute) {
          // 权限路由未加载，先加载权限路由
          await routeStore.initRoute();
          return next({ ...to, replace: true });
        } else {
          if (to.name === 'not-found') {
            const path = to.redirectedFrom?.name === 'root' ? '/' : to.fullPath;
            return next({
              path,
              replace: true,
              query: to.query,
              hash: to.hash
            });
          } else {
            return next();
          }
        }
      }
    } else {
      if (whiteList.includes(to.path as string)) {
        // 在免登录白名单，直接进入
        return next();
      } else {
        const redirect = encodeURIComponent(to.fullPath || RouterEnum.INDEX);
        // 否则全部重定向到登录页
        return next({
          path: RouterEnum.LOGIN,
          query: {
            redirect: redirect
          }
        });
      }
    }
  });

  router.afterEach((to) => {
    document.title = getPageTitle(to.meta.title);
    NProgress.done();
    //@ts-ignore
    window.$loadingBar?.finish();
  });

  router.onError((error) => {
    console.log(error);
    NProgress.done();
    //@ts-ignore
    window.$loadingBar?.finish();
  })
}
