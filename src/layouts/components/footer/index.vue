<script setup lang="ts">
defineOptions({
  name: 'Footer'
});

const props = defineProps({
  height: {
    type: Number,
    default: 44
  }
})
</script>

<template>
  <n-layout-footer
    position="absolute"
    class="bg-container! flex-col"
    :style="{height:`${props.height}px`}"
  >
    <div class="flex-1 flex items-center justify-center text-14px transition-300">
      <a> Copyright (c) 2025 Vue </a>
    </div>
  </n-layout-footer>
</template>

<style scoped lang="scss">
</style>
