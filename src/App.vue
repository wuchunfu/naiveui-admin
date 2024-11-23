<script setup lang="ts">
import { computed } from 'vue';
import { NConfigProvider } from 'naive-ui';
import { useThemeStore } from "@/store";
import { subscribeThemeStore } from "@/store/subscribe";
import { useAppStore } from '@/store/modules/app';
import { naiveDateLocales, naiveLocales } from '@/locales/naive';

defineOptions({
  name: 'App'
});

const appStore = useAppStore();
const theme = useThemeStore()

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});

subscribeThemeStore()

</script>

<template>
  <n-config-provider
      :theme="theme.systemTheme"
      :theme-overrides="theme.getNaiveThemeOverrides"
      :locale="naiveLocale"
      :date-locale="naiveDateLocale"
  >
    <app-provider>
      <router-view/>
    </app-provider>
  </n-config-provider>
</template>

<style lang="scss" scoped></style>
