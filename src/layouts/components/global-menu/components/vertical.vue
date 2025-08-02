<script setup lang="ts">
import { useRouteStore } from "@/store";
import { System } from "@/types/system";
import { LayoutEnum } from "@/enums/LayoutEnum.ts";

defineOptions({
  name: "GlobalVertical"
});

const routeStore = useRouteStore();
const route = useRoute();
const router = useRouter();

// 获取菜单
const menuOptions = computed(() => routeStore.menus as System.GlobalMenu[]);

// 获取当前激活的菜单
const activeKey = computed(() =>
  (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
);

// 菜单点击处理
const clickMenuItem = (key: string, item: System.GlobalMenu) => {
  if (router.currentRoute.value.name !== key) {
    router.push({ path: item.routePath })
  }
};
</script>

<template>
  <n-layout has-sider class="bg-layout layout">
    <GlobalSider
      :mode="LayoutEnum.VERTICAL"
      :active-key="activeKey"
      :menu-options="menuOptions"
      @click-menu-item="clickMenuItem"
    />
    <n-layout style="height: 100vh" class="bg-layout">
      <GlobalHeader/>
      <GlobalContent/>
      <GlobalFooter/>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
</style>
