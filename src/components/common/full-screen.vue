<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'FullScreen'
});

interface Props {
  full?: boolean;
}

defineProps<Props>();
</script>

<template>
  <ButtonIcon
    :key="String(full)"
    :tooltip-content="full ? $t('icon.fullscreenExit') : $t('icon.fullscreen')"
  >
    <template #icon>
      <SvgIcon icon="material-symbols:fullscreen-exit" v-if="full"/>
      <SvgIcon icon="material-symbols:fullscreen" v-else/>
    </template>
  </ButtonIcon>
</template>

<style scoped lang="scss">
</style>
