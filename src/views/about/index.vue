<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'About'
});
</script>

<template>
  <app-container>
    <h1>{{ $t('system.title') }}</h1>
  </app-container>
</template>

<style scoped lang="scss">
</style>
