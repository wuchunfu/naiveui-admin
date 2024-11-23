<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({
  name: 'FooterConfig'
});

const themeStore = useThemeStore();
</script>

<template>
  <n-divider><p>底部配置</p></n-divider>
  <div class="flex items-center justify-between">
    <p class="text-16px ">显示底部</p>
    <n-switch v-model:value="themeStore.footer.show"/>
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px ">底部高度</p>
    <n-input-number
        class="w-120px text-center"
        v-model:value="themeStore.footer.height"
        :min="44"
    />
  </div>
</template>

<style scoped lang="scss"></style>
