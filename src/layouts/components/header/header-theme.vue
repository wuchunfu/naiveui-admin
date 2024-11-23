<template>
  <ThemeSchemaSwitch
      :theme-schema="theme.mode"
      :show-tooltip="true"
      @switch="toggleThemeScheme"
  />
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store";

defineOptions({
  name: 'HeaderTheme'
});

const theme = useThemeStore()

const toggleThemeScheme = () => {
  const mode = theme.mode;
  if (mode === 'light') {
    theme.setThemeMode('dark')
  } else if (mode === 'dark') {
    theme.setThemeMode('auto')
  } else {
    theme.setThemeMode('light')
  }
}
</script>

<style scoped lang="scss"></style>
