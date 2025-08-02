<script setup lang="ts">
import { useThemeStore } from "@/store";

defineOptions({
  name: 'GlobalFooter'
});

const theme = useThemeStore();

// 是否展示底部
const show = computed(() => theme.footer.show);
// 底部高度
const height = computed(() => theme.footer.height);
</script>

<template>
  <n-layout-footer
    position="absolute"
    class="bg-container! flex-col"
    :style="{height:`${height}px`}"
    v-if="show"
  >
    <div class="flex-1 flex items-center justify-center text-14px transition-300">
      <a> Copyright (c) 2025 Vue </a>
    </div>
  </n-layout-footer>
</template>

<style scoped lang="scss">
</style>
