<script setup lang="ts">
import { PopoverPlacement } from 'naive-ui';

defineOptions({
  name: 'ButtonIcon',
  inheritAttrs: false
});

interface Props {
  /** Button class */
  class?: string;
  /** Iconify icon name */
  icon?: string;
  /** Tooltip content */
  tooltipContent?: string;
  /** Tooltip placement */
  tooltipPlacement?: PopoverPlacement;
  zIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  icon: '',
  tooltipContent: '',
  tooltipPlacement: 'bottom',
  zIndex: 98
});

const buttonClass = computed(() => {
  const defaultClass = 'h-[36px] text-icon'
  if (props.class === '' || props.class === undefined) {
    return defaultClass
  } else {
    return `${ defaultClass } ${ props.class }`
  }
})
</script>

<template>
  <NTooltip
    :placement="tooltipPlacement"
    :z-index="zIndex"
    :disabled="!tooltipContent"
  >
    <template #trigger>
      <NButton
        quaternary
        :class="buttonClass"
        v-bind="$attrs"
      >
        <div class="flex-center gap-8px">
          <slot name="icon">
            <SvgIcon :icon="icon"/>
          </slot>
          <slot name="content"></slot>
        </div>
      </NButton>
    </template>
    {{ tooltipContent }}
  </NTooltip>
</template>

<style scoped lang="scss">
</style>
