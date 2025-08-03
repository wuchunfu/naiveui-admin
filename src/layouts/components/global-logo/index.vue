<script setup lang="ts">
import { useThemeStore } from "@/store";

defineOptions({
  name: 'GlobalLogo'
});

// 从环境变量获取应用标题
const { VITE_APP_TITLE } = import.meta.env;

const theme = useThemeStore();

// 侧边栏是否折叠
const collapsed = computed(() => theme.sidebar.collapsed);
// Logo 区域高度
const headerHeight = computed(() => theme.menu.headerHeight);
</script>

<template>
  <div
    class="flex-center nowrap-hidden text-primary transition-all"
    :style="{ height: `${headerHeight}px` }"
  >
    <SvgIcon
      local-icon="logo"
      class="mr-1"
      :style="{ fontSize: `${headerHeight/2}px` }"
    />
    <h2 v-show="!collapsed" class="text-xl font-semibold">
      {{ VITE_APP_TITLE }}
    </h2>
  </div>
</template>

<style scoped lang="scss">
</style>
