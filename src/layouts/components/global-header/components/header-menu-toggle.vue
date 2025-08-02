<script setup lang="ts">
import { $t } from '@/locales';
import { useThemeStore } from "@/store";

defineOptions({
  name: 'HeaderMenuToggle'
});

interface Props {
  /** Show collapsed icon */
  collapsed?: boolean;
  /** Arrow style icon */
  arrowIcon?: boolean;
  zIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  arrowIcon: false,
  zIndex: 98
});

const theme = useThemeStore();

// 是否开启折叠
const collapsed = computed(() => theme.sidebar.collapsed);
// 是否显示折叠按钮
const showCollapsed = computed(() => theme.menu.showCollapse);
// 是否折叠
const handleCollapsed = () => {
  theme.sidebar.collapsed = !theme.sidebar.collapsed;
};

// 类型别名用于图标映射
type IconType = 'menu' | 'arrow';
type CollapseState = 'expanded' | 'collapsed';

// 图标映射表
const iconMap: Record<IconType, Record<CollapseState, string>> = {
  menu: {
    expanded: 'line-md:menu-fold-left',
    collapsed: 'line-md:menu-fold-right'
  },
  arrow: {
    expanded: 'ph:caret-double-left-bold',
    collapsed: 'ph:caret-double-right-bold'
  }
};

const icon = computed(() => {
  const iconType: IconType = props.arrowIcon ? 'arrow' : 'menu';
  const state: CollapseState = props.collapsed ? 'collapsed' : 'expanded';
  return iconMap[iconType][state];
});
</script>

<template>
  <div
    class="flex-center w-48px text-24px"
    v-if="showCollapsed"
  >
    <ButtonIcon
      :icon="icon"
      :tooltip-content="collapsed ? $t('icon.expand') : $t('icon.collapse')"
      tooltip-placement="bottom-start"
      :z-index="zIndex"
      @click="handleCollapsed"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
