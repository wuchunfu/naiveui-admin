<template>
  <n-layout-footer
      position="absolute"
      :class="[props.isCard&&'mx-12px']"
      class="bg-container! flex-col"
      :style="{height:`${props.height}px`,...borderStyle}"
  >
    <div class="flex-1 flex items-center justify-center text-14px transition-300">
      <a> Copyright (c) 2024 Vue </a>
    </div>
  </n-layout-footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: 'Footer'
});

const props = defineProps({
  height: {
    type: Number,
    default: 44
  },
  isCard: {
    type: Boolean,
    default: false
  },
  round: {
    type: Number,
    default: 0
  }
})

const borderStyle = computed(() => {
  const style = {} as any
  if (props.isCard) {
    style.borderTopLeftRadius = props.round + 'px'
    style.borderTopRightRadius = props.round + 'px'
  }
  return style
})
</script>

<style scoped lang="scss">
</style>
