import { defineStore } from "pinia";
import { routeModuleList, router } from "@/router";
import { useAuthStore } from "@/store";
import { PageRoute } from "@/types/route";
import {
  dynamicGenerateMenus,
  dynamicGenerateRoutes,
  getCacheRoutes,
  groupDynamicMenu,
  staticPageRouteGenerateRoutes
} from "@/utils";
import { System } from "@/types/system";
import { nextTick } from "vue";

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

export const useRouteStore = defineStore({
  id: 'app-route',
  state: (): RouteState => ({
    routeMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitRoute: false,
    routeHomeName: import.meta.env.VITE_ROUTE_HOME_PATH,
    menus: [],
    cacheRoutes: [],
    dynamicRoutes: [],
    reloadFlag: true
  }),
  actions: {
    /** 重置路由的store */
    resetRouteStore() {
      // this.resetRoutes();
      this.$reset();
    },
    /** 重置路由数据，保留固定路由 */
    resetRoutes() {
      // 模块路由
      this.dynamicRoutes?.forEach((route: any) => {
        router.removeRoute(route.name);
      });
    },
    handleRoute(routes: PageRoute[]) {
      routes.forEach((route: any) => {
        router.addRoute(route)
      })
    },
    // 初始化动态路由
    async initDynamicRoute() {
      const authStore = useAuthStore()
      if (authStore.isLogin) {
        // 获取动态路由
        const menuList = []
        Object.assign(menuList, authStore?.getMenus)
        // 处理菜单
        if (!menuList.length) {
          console.warn("没有菜单")
          return
        }
        // 生成路由
        if (menuList.length > 0) {
          this.dynamicRoutes = dynamicGenerateRoutes(menuList)
          this.menus = dynamicGenerateMenus(this.dynamicRoutes)
        }
        // const menuItems: IMenus[] = groupDynamicMenu(menuList)
        // // 生成路由
        // if (menuItems.length > 0) {
        //   this.dynamicRoutes = dynamicGenerateRoutes(menuItems)
        //   this.menus = dynamicGenerateMenus(this.dynamicRoutes)
        // }
      }
    },
    // 初始化静态路由
    async initStaticRoute() {
      const authStore = useAuthStore()
      this.dynamicRoutes = staticPageRouteGenerateRoutes(routeModuleList, authStore.getAuthRouterName)
      // 添加菜单
      this.menus = dynamicGenerateMenus(this.dynamicRoutes)
    },
    /**
     * 初始化路由
     */
    async initRoute() {
      if (this.routeMode === 'static') {
        await this.initStaticRoute()
      } else {
        await this.initDynamicRoute()
      }
      // 添加路由
      this.handleRoute(this.dynamicRoutes)
      this.isInitRoute = true;
      // 缓存路由名称
      this.cacheRoutes = getCacheRoutes(this.dynamicRoutes)
    },
    /**
     * 刷新页面
     */
    async reloadPage() {
      this.reloadFlag = false
      await nextTick(() => {
        this.reloadFlag = true
      })
    }
  }
})
