<script setup lang="ts">
import { System } from "@/types/system";
import type { MenuInst } from 'naive-ui';
import { LayoutEnum } from "@/enums/LayoutEnum.ts";

defineOptions({
  name: 'GlobalMenu'
});

// 类型定义
interface Props {
  collapsed?: boolean;
  mode?: LayoutEnum.VERTICAL | LayoutEnum.HORIZONTAL;
  inverted?: boolean;
  collapsedWidth?: number;
  activeKey?: string;
  menuOptions?: System.GlobalMenu[];
}

// props 定义
const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  mode: LayoutEnum.VERTICAL,
  inverted: false,
  collapsedWidth: 64,
  activeKey: '',
  menuOptions: () => []
});

const route = useRoute();

const menuRef = ref<MenuInst | null>(null)
const expandedKeys = ref<string[]>([]);

// 菜单展开处理
const menuExpanded = (keys: string[]) => {
  expandedKeys.value = keys;
}

// 获取激活菜单路径
const getActiveKeyPathsOfMenus = (activeKey: string, menus: System.GlobalMenu[]): string[] => {
  if (!activeKey || !menus?.length) {
    return [];
  }

  for (const menu of menus) {
    if (menu.key === activeKey) {
      return [activeKey];
    }

    if (menu.children?.length) {
      const childPaths = getActiveKeyPathsOfMenus(activeKey, menu.children);
      if (childPaths.length) {
        return [menu.key, ...childPaths];
      }
    }
  }

  return [];
};

const emits = defineEmits<{
  (e: 'clickMenuItem', key: string, item: System.GlobalMenu): void;
}>();

// 菜单点击
const clickMenuItem = (key: string, item: System.GlobalMenu) => {
  emits('clickMenuItem', key, item);
};

// 监听路由变化
watch(() => route.name, () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(props.activeKey, props.menuOptions);
  }, {
    immediate: true
  }
);
</script>

<template>
  <n-menu
    ref="menuRef"
    accordion
    responsive
    :mode="props.mode"
    :indent="24"
    :inverted="props.inverted"
    :collapsed-icon-size="24"
    :collapsed="props.collapsed"
    :collapsed-width="props.collapsedWidth"
    :options="menuOptions"
    :value="activeKey"
    @update:value="clickMenuItem"
    :expanded-keys="expandedKeys"
    @update:expanded-keys="menuExpanded"
  />
</template>

<style scoped lang="scss">
</style>
