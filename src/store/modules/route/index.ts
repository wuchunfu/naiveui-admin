import { routeModuleList, router } from "@/router";
import { useAuthStore } from "@/store";
import { PageRoute } from "@/types/route";
import { dynamicGenerateMenus, dynamicGenerateRoutes, getCacheRoutes, staticPageRouteGenerateRoutes } from "@/utils";
import { System } from "@/types/system";

// 定义 state 的类型
interface RouteState {
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  routeMode: Env.ImportMeta['VITE_AUTH_ROUTE_MODE'];

  /** 是否初始化了权限路由 */
  isInitRoute: boolean;

  /** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
  routeHomeName: string;
  /** 菜单 */
  menus: System.GlobalMenu[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
  /** 动态路由 */
  dynamicRoutes: PageRoute[];
  /** 页面刷新的标识  用来刷新页面 true 才能显示*/
  reloadFlag: boolean;
}

export const useRouteStore = defineStore('app-route', () => {

  const initState: RouteState = {
    routeMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitRoute: false,
    routeHomeName: import.meta.env.VITE_ROUTE_HOME_PATH,
    menus: [],
    cacheRoutes: [],
    dynamicRoutes: [],
    reloadFlag: true
  };

  const state = reactive<RouteState>({ ...initState });

  // 重置路由的store
  const $reset = () => {
    resetRoutes();
    Object.assign(state, initState);
  };

  // 重置路由数据，保留固定路由
  const resetRoutes = () => {
    // 模块路由
    state.dynamicRoutes.forEach((route: PageRoute) => {
      router.removeRoute(route.name);
    });
  };

  const handleRoute = (routes: PageRoute[]) => {
    routes.forEach((route: any) => {
      router.addRoute(route);
    });
  };

  // 初始化动态路由
  const initDynamicRoute = async () => {
    const authStore = useAuthStore();
    const menuList = authStore.menus;

    if (menuList.length === 0) {
      console.warn("没有菜单");
      return;
    }

    // 生成路由
    state.dynamicRoutes = dynamicGenerateRoutes(menuList);
    // 生成菜单
    // @ts-ignore
    state.menus = dynamicGenerateMenus(state.dynamicRoutes);
  };

  // 初始化静态路由
  const initStaticRoute = async () => {
    const authStore = useAuthStore();
    // 生成路由
    state.dynamicRoutes = staticPageRouteGenerateRoutes(routeModuleList, authStore.permissions);
    // 生成菜单
    state.menus = dynamicGenerateMenus(state.dynamicRoutes);
  };

  // 初始化路由
  const initRoute = async () => {
    if (state.routeMode === 'static') {
      await initStaticRoute();
    } else {
      await initDynamicRoute();
    }
    // 添加路由
    handleRoute(state.dynamicRoutes);
    state.isInitRoute = true;
    // 缓存路由名称
    state.cacheRoutes = getCacheRoutes(state.dynamicRoutes);
  };

  // 刷新页面
  const reloadPage = async () => {
    state.reloadFlag = false;
    await nextTick(() => {
      state.reloadFlag = true;
    });
  };

  // 使用 toRefs 将 state 转换为 ref 对象
  const stateRefs = toRefs(state);

  return {
    ...stateRefs,
    $reset,
    resetRoutes,
    handleRoute,
    initDynamicRoute,
    initStaticRoute,
    initRoute,
    reloadPage
  };
});
