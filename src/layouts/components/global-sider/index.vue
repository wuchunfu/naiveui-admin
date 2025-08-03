<script setup lang="ts">
import { useThemeStore } from "@/store";
import { System } from "@/types/system";
import { LayoutEnum } from "@/enums/LayoutEnum.ts";
import GlobalMenu from "@/layouts/components/global-menu/index.vue";

defineOptions({
  name: 'GlobalSider'
});

// 类型定义
interface Props {
  mode?: LayoutEnum.VERTICAL | LayoutEnum.HORIZONTAL;
  activeKey?: string;
  menuOptions?: System.GlobalMenu[];
}

// props 定义
const props = withDefaults(defineProps<Props>(), {
  mode: LayoutEnum.VERTICAL,
  activeKey: '',
  menuOptions: () => []
});

const theme = useThemeStore();

const emits = defineEmits<{
  (e: 'clickMenuItem', key: string, item: System.GlobalMenu): void;
}>();

// 菜单点击
const clickMenuItem = (key: string, item: System.GlobalMenu) => {
  emits('clickMenuItem', key, item);
};

const setCollapsed = (collapsed: boolean) => {
  theme.setSidebarCollapsed(collapsed)
}
</script>

<template>
  <n-layout-sider
    class="layout-side"
    collapse-mode="width"
    :native-scrollbar="false"
    :width="theme.sidebar.width"
    :collapsed-width="theme.sidebar.collapsedWidth"
    :collapsed="theme.sidebar.collapsed"
    :inverted="theme.sidebar.inverted"
    :show-trigger="theme.sidebar.showCollapse ? 'bar' : false"
    @collapse="setCollapsed(true)"
    @expand="setCollapsed(false)"
  >
    <GlobalLogo/>
    <GlobalMenu
      class="menu"
      :mode="mode"
      :style="{ top: `${theme.menu.headerHeight}px` }"
      :collapsed="theme.sidebar.collapsed"
      :collapsed-width="theme.sidebar.collapsedWidth"
      :inverted="theme.sidebar.inverted"
      :active-key="activeKey"
      :menu-options="menuOptions"
      @click-menu-item="clickMenuItem"
    />
  </n-layout-sider>
</template>

<style scoped lang="scss">
.layout-side {
  z-index: 99;
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
  position: relative;

  & .menu {
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>
