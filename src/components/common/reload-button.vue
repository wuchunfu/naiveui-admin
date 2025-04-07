<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'ReloadButton'
});

interface Props {
  loading?: boolean;
}

defineProps<Props>();
</script>

<template>
  <ButtonIcon :tooltip-content="$t('icon.reload')">
    <template #icon>
      <SvgIcon
        icon="ant-design:reload-outlined"
        :class="{ 'animate-spin animate-duration-750': loading }"
      />
    </template>
  </ButtonIcon>
</template>

<style scoped lang="scss">
</style>
