<script setup lang="ts">
defineOptions({
  name: 'BaseHoverTip'
});

const props = defineProps({
  text: {
    type: String,
    default: null
  },
  placement: {
    type: String as PropType<'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'>,
    default: 'bottom'
  },
  hoverStyle: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <n-tooltip :placement="placement" trigger="hover" v-if="text">
    <template #trigger>
      <div
        class="flex-center h-full cursor-pointer"
        :class="[props.hoverStyle?'dark:hover:bg-#333 hover:bg-#f6f6f6':'']"
      >
        <slot></slot>
      </div>
    </template>
    <span>{{ props.text }}</span>
  </n-tooltip>
  <n-tooltip :placement="placement" trigger="hover" v-else>
    <template #trigger>
      <slot></slot>
    </template>
  </n-tooltip>
</template>

<style scoped lang="scss">
</style>
