<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({
  name: 'MenuConfig'
});

const themeStore = useThemeStore();

const menuLayoutOptions = [
  { label: '基本布局', value: 'base' },
  { label: '应用布局', value: 'app' }
]
</script>

<template>
  <n-divider><p>菜单配置</p></n-divider>
  <div class="flex items-center justify-between">
    <p class="text-16px">菜单布局</p>
    <n-select
        class="w-120px text-center"
        v-model:value="themeStore.menu.layout"
        :options="menuLayoutOptions"
        placeholder="选择布局"
    />
  </div>
  <template v-if="themeStore.menu.layout === 'base'">
    <div class="flex items-center justify-between mt-12px">
      <p class="text-16px ">显示面包屑</p>
      <n-switch v-model:value="themeStore.menu.showBreadcrumb"/>
    </div>
    <div class="flex items-center justify-between mt-12px">
      <p class="text-16px ">显示面包屑图标</p>
      <n-switch v-model:value="themeStore.menu.showBreadcrumbIcon"/>
    </div>
  </template>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px">头部高度</p>
    <n-input-number
        class="w-120px text-center"
        v-model:value="themeStore.menu.headerHeight"
        :min="44"
    />
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px ">显示标签栏</p>
    <n-switch v-model:value="themeStore.menu.showTabs"/>
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px">标签栏高度</p>
    <n-input-number
        class="w-120px text-center"
        v-model:value="themeStore.menu.tabsHeight"
        :min="32"
    />
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px ">显示折叠</p>
    <n-switch v-model:value="themeStore.menu.showCollapse"/>
  </div>
</template>

<style scoped lang="scss"></style>
