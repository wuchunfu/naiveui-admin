<script setup lang="ts">
import { themeSchemaIcons, themeSchemaRecord } from '@/constants/app';
import { useThemeStore } from "@/store";
import { $t } from '@/locales';

defineOptions({
  name: 'ThemeModeConfig'
});

const themeStore = useThemeStore();

function handleSegmentChange(value: string | number) {
  themeStore.setThemeMode(value as UnionKey.ThemeScheme);
}
</script>

<template>
  <n-divider>{{ $t('theme.themeSchema.title') }}</n-divider>
  <div class="flex-col items-center">
    <n-tabs type="segment" animated :value="themeStore.mode" @update:value="handleSegmentChange">
      <n-tab-pane v-for="(item, key) in themeSchemaRecord" :key="key" :name="key">
        <template #tab>
          <SvgIcon :icon="themeSchemaIcons[key]" class="h-24px text-icon-small"/>
          <p class="ml-5px">{{ $t(item) }}</p>
        </template>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
