<script setup lang="ts">
import { useRouteStore } from "@/store";
import { System } from "@/types/system";
import { LayoutEnum } from "@/enums/LayoutEnum.ts";

defineOptions({
  name: "GlobalHorizontalMix"
});

const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();

// 获取菜单
const menuOptions = computed(() => routeStore.menus as System.GlobalMenu[]);

// 获取当前激活的左侧菜单
const leftActiveKey = computed(() =>
  (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
);

// 左侧菜单点击处理
const leftClickMenuItem = (key: string, item: System.GlobalMenu) => {
  if (router.currentRoute.value.name !== key) {
    router.push({ path: item.routePath })
  }
}

// 获取当前激活的一级菜单的子菜单，如果没有子菜单则返回一级菜单
const leftMenuOptions = computed(() => {
  if (!leftActiveKey.value || !menuOptions.value?.length) {
    return [];
  }

  // 查找当前激活的一级菜单项
  const activeMenu = menuOptions.value.find(menu =>
    menu.key === leftActiveKey.value ||
    (menu.children?.some(child => child.key === leftActiveKey.value))
  );

  // 如果找到了一级菜单且有子菜单，则返回子菜单
  if (activeMenu && activeMenu.children?.length) {
    return activeMenu.children;
  }

  // 如果没有子菜单，则返回一级菜单作为导航菜单
  if (activeMenu) {
    return [activeMenu];
  }

  // 否则返回空数组
  return [];
});

// 获取当前的一级菜单
const topMenuOptions = computed(() => {
  if (!leftActiveKey.value || !menuOptions.value?.length) {
    return [];
  }

  // 返回所有一级菜单项，但不包含子菜单
  return menuOptions.value.map(menu => {
    // 使用解构赋值创建新对象，排除 children 属性
    const { children, ...topMenu } = menu;
    return topMenu;
  });
});

// 获取当前激活的一级菜单key
const topActiveKey = computed(() => {
  if (!leftActiveKey.value || !menuOptions.value?.length) {
    return '';
  }

  const activeMenu = menuOptions.value.find(menu =>
    menu.key === leftActiveKey.value ||
    (menu.children?.some(child => child.key === leftActiveKey.value))
  );

  return activeMenu?.key || '';
});

// 一级菜单点击处理
const topClickMenuItem = (key: string) => {
  // 点击一级菜单时，跳转到该菜单的第一个子菜单或本身
  const topMenu = menuOptions.value.find(menu => menu.key === key);
  if (topMenu) {
    if (topMenu.children?.length) {
      router.push({ path: topMenu.children[0].routePath });
    } else {
      router.push({ path: topMenu.routePath });
    }
  }
}
</script>

<template>
  <n-layout has-sider class="bg-layout layout">
    <GlobalSider
      :mode="LayoutEnum.VERTICAL"
      :active-key="leftActiveKey"
      :menu-options="leftMenuOptions"
      @click-menu-item="leftClickMenuItem"
    />
    <n-layout style="height: 100vh" class="bg-layout">
      <GlobalHeader
        :active-key="topActiveKey"
        :menu-options="topMenuOptions"
        @click-menu-item="topClickMenuItem"
      />
      <GlobalContent/>
      <GlobalFooter/>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
</style>
