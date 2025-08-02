<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({
  name: 'SettingColor'
});

const themeStore = useThemeStore();
</script>

<template>
  <n-divider>颜色色配置</n-divider>
  <div class="flex items-center justify-between">
    <p class="text-16px">主题色</p>
    <n-color-picker
      class="w-120px"
      v-model:value="themeStore.color.primary"
      :show-alpha="false"
      :swatches="themeStore.color.swatches"
    />
  </div>
  <div class="flex items-center justify-between">
    <p class="text-16px">信息色</p>
    <n-color-picker
      class="w-120px"
      v-model:value="themeStore.color.info"
      :show-alpha="false"
      :swatches="themeStore.color.swatches"
    />
  </div>
  <div class="flex items-center justify-between">
    <p class="text-16px">成功色</p>
    <n-color-picker
      class="w-120px"
      v-model:value="themeStore.color.success"
      :show-alpha="false"
      :swatches="themeStore.color.swatches"
    />
  </div>
  <div class="flex items-center justify-between">
    <p class="text-16px">警告色</p>
    <n-color-picker
      class="w-120px"
      v-model:value="themeStore.color.warning"
      :show-alpha="false"
      :swatches="themeStore.color.swatches"
    />
  </div>
  <div class="flex items-center justify-between">
    <p class="text-16px">错误色</p>
    <n-color-picker
      class="w-120px"
      v-model:value="themeStore.color.error"
      :show-alpha="false"
      :swatches="themeStore.color.swatches"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
