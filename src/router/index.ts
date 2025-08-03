import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "@/router/common";
import { createRouterGuard } from "@/router/permissions";
import { PageRoute } from "@/types/route";

const basePath = import.meta.env.VITE_BASE_PATH;

/**
 * 创建路由实例
 */
export const router = createRouter({
  history: createWebHistory(basePath),
  routes: constantRoutes,
  strict: true,
  // 刷新时，滚动条位置还原
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition || { left: 0, top: 0 };
  }
})

/**
 * 安装路由
 *
 * @param app Vue应用实例
 */
export const setupRouter = async (app: App) => {
  app.use(router);
  await createRouterGuard(router);
  await router.isReady();
}

// 自动加载路由模块
const modules = import.meta.glob<any>('./modules/**/*.ts', { eager: true });
/**
 * 路由模块列表
 */
export const routeModuleList: PageRoute[] = Object.keys(modules).reduce<PageRoute[]>((list: PageRoute[], key: string) => {
  const mod: PageRoute | PageRoute[] = modules[key].default ?? {};
  const modList = Array.isArray(mod) ? mod : [mod];
  return list.concat(modList);
}, []);
