<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useRouteStore, useThemeStore } from "@/store";

defineOptions({
  name: 'GlobalContent'
});

// 类型定义
interface Props {
  showPadding?: boolean;
}

// props 定义
const props = withDefaults(defineProps<Props>(), {
  showPadding: false,
});

const theme = useThemeStore();
const route = useRoute();
const routeStore = useRouteStore();

const key = computed(() => route.fullPath);

const transitionName = computed(() => {
  return theme.animation.enable ? theme.animation.type : '';
});

const contentStyle = computed(() => {
  const PADDING = 12;

  // 计算顶部高度（包括padding）
  const top = theme.menu.showTabs
    ? theme.menu.headerHeight + theme.menu.tabsHeight
    : theme.menu.headerHeight;

  // 计算底部高度（包括padding）
  const bottom = theme.footer.show ? theme.footer.height : 0;

  return {
    top: `${ top + PADDING }px`,
    bottom: `${ bottom + PADDING }px`,
  };
});
</script>

<template>
  <n-layout
    position="absolute"
    :native-scrollbar="false"
    :style="[contentStyle]"
    class="bg-layout wh-full flex-col"
  >
    <div
      class="flex-1 flex-col h-full page-content mx-12px"
      :class="[`rounded-${theme.naive.borderRadius}px`]"
    >
      <router-view v-slot="{ Component, route }" :key="key">
        <transition
          :name="transitionName"
          mode="out-in"
          :appear="true"
        >
          <keep-alive :include="routeStore.cacheRoutes">
            <component
              :is="Component"
              :key="route.fullPath"
              :class="{ 'p-16px': showPadding }"
              class="bg-layout transition-300"
              v-if="routeStore.reloadFlag"
            />
          </keep-alive>
        </transition>
      </router-view>
      <n-back-top :right="30" class="z100"/>
    </div>
  </n-layout>
</template>

<style scoped lang="scss">
</style>
