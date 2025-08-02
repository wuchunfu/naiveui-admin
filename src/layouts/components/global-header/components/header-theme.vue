<script setup lang="ts">
import { useThemeStore } from "@/store";

defineOptions({
  name: 'HeaderTheme'
});

const themeStore = useThemeStore()
</script>

<template>
  <ThemeSchemaSwitch
    :theme-schema="themeStore.mode"
    :show-tooltip="true"
    @switch="themeStore.toggleThemeMode"
  />
</template>

<style scoped lang="scss">
</style>
