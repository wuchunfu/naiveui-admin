<template>
  <app-container>
    <h1>{{ $t('system.title') }}</h1>
  </app-container>
</template>

<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'Home'
});
</script>

<style scoped lang="scss">
</style>
