<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({
  name: 'SiderConfig'
});

const themeStore = useThemeStore();
</script>

<template>
  <n-divider><p>侧边栏配置</p></n-divider>
  <div class="flex items-center justify-between">
    <p class="text-16px ">侧边栏深色</p>
    <n-switch v-model:value="themeStore.sidebar.inverted"/>
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px ">侧边栏折叠</p>
    <n-switch v-model:value="themeStore.sidebar.collapsed"/>
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px">折叠宽度</p>
    <n-input-number
        class="w-120px text-center"
        v-model:value="themeStore.sidebar.collapsedWidth"
        :min="64"
    />
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px ">展开宽度</p>
    <n-input-number
        class="w-120px text-center"
        v-model:value="themeStore.sidebar.width"
        :min="200"
    />
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px ">显示折叠操作条</p>
    <n-switch v-model:value="themeStore.sidebar.showCollapse"/>
  </div>
</template>

<style scoped lang="scss"></style>
