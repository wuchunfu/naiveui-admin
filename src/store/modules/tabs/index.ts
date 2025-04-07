import { PageRoute } from "@/types/route";
import { defineStore } from "pinia";
import { constantRoutes } from "@/router/common";
import { RouteRecordRaw } from "vue-router";
import { SecureStorage } from "@/store/plugins";

// 定义 state 的类型
interface TabState {
  tabList: PageRoute[]
}

export const useTabsStore = defineStore('app-tabs', () => {

  const initState: TabState = {
    tabList: []
  };

  const state = reactive<TabState>({ ...initState });

  // 添加标签页
  const addTab = (route: PageRoute) => {
    // 排除固定路由
    if (constantRoutes.some((item: RouteRecordRaw) => {
      if (item.name === route.name) {
        return true;
      }
      // 递归子路由
      if (item.children?.some((child: RouteRecordRaw) => child.name === route.name)) {
        return true;
      }
    })) {
      return;
    }
    const isExists = state.tabList.some((item: PageRoute) => item.name === route.name);
    if (!isExists) {
      state.tabList.push(route);
    }
  };

  // 关闭左侧
  const closeLeftTabs = (route: PageRoute) => {
    const index = state.tabList.findIndex((item: PageRoute) => item.name === route.name);
    state.tabList = state.tabList.filter((item: PageRoute, i: number) => i >= index || (item?.meta?.affix ?? false));
  };

  // 关闭右侧
  const closeRightTabs = (route: PageRoute) => {
    const index = state.tabList.findIndex((item: PageRoute) => item.name === route.name);
    state.tabList = state.tabList.filter((item: PageRoute, i: number) => i <= index || (item?.meta?.affix ?? false));
  };

  // 关闭其他
  const closeOtherTabs = (route: PageRoute) => {
    state.tabList = state.tabList.filter(
      (item: PageRoute) => item.name === route.name || (item?.meta?.affix ?? false)
    );
  };

  // 关闭当前页
  const closeCurrentTab = (route: PageRoute) => {
    const index = state.tabList.findIndex((item: PageRoute) => item.name === route.name);
    state.tabList.splice(index, 1);
  };

  // 关闭全部
  const closeAllTabs = () => {
    // 保留固定路由
    state.tabList = state.tabList.filter((item: PageRoute) => item?.meta?.affix ?? false);
  };

  // 使用 toRefs 将 state 转换为 ref 对象
  const stateRefs = toRefs(state);

  return {
    ...stateRefs,
    addTab,
    closeLeftTabs,
    closeRightTabs,
    closeOtherTabs,
    closeCurrentTab,
    closeAllTabs
  };
}, {
  persist: {
    // 持久化存储 使用加密的存储方式
    storage: SecureStorage
  }
});
