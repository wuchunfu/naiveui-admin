<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'PinToggler'
});

interface Props {
  pin?: boolean;
}

const props = defineProps<Props>();

const icon = computed(() => (props.pin ? 'mdi-pin-off' : 'mdi-pin'));
</script>

<template>
  <ButtonIcon
    :key="String(pin)"
    :icon="icon"
    :tooltip-content="pin ? $t('icon.unpin') : $t('icon.pin')"
    tooltip-placement="bottom-start"
    :z-index="100"
  />
</template>

<style scoped lang="scss">
</style>
