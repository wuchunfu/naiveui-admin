<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({
  name: 'NaiveUIConfig'
});

const themeStore = useThemeStore();
</script>

<template>
  <n-divider><p>naive-ui配置</p></n-divider>
  <div class="flex items-center justify-between">
    <p class="text-16px ">全局圆角</p>
    <n-input-number
        class="w-120px text-center"
        v-model:value="themeStore.naive.borderRadius"
        :min="0"
    />
  </div>
</template>

<style scoped lang="scss"></style>
