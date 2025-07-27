<script setup lang="ts">
import { useThemeStore } from '@/store';
import { $t } from "@/locales";

defineOptions({
  name: 'LayoutModeConfig'
});

const themeStore = useThemeStore();

const handleModeChange = (mode: string) => {
  themeStore.setLayoutMode(mode);
};
</script>

<template>
  <n-divider>{{ $t('theme.layoutMode.title') }}</n-divider>
  <div class="flex text-primary gap-4">
    <BaseHoverTip text="垂直" :hover-style="false">
      <n-el
        :class="{'outline outline-2': themeStore.layout.mode === 'vertical'}"
        class="grid grid-cols-[20%_1fr] outline-[var(--primary-color)] hover:(outline outline-2) cursor-pointer"
        @click="handleModeChange('vertical')"
      >
        <div class="bg-[var(--primary-color)]"/>
        <div class="bg-[var(--divider-color)]"/>
      </n-el>
    </BaseHoverTip>

    <BaseHoverTip text="水平" :hover-style="false">
      <n-el
        :class="{'outline outline-2': themeStore.layout.mode === 'horizontal'}"
        class="grid grid-rows-[30%_1fr] outline-[var(--primary-color)] hover:(outline outline-2) cursor-pointer"
        @click="handleModeChange('horizontal')"
      >
        <div class="bg-[var(--primary-color)]"/>
        <div class="bg-[var(--divider-color)]"/>
      </n-el>
    </BaseHoverTip>

    <BaseHoverTip text="混合" :hover-style="false">
      <n-el
        :class="{'outline outline-2': themeStore.layout.mode === 'horizontal-mix'}"
        class="grid grid-cols-[20%_1fr] grid-rows-[20%_1fr] outline-[var(--primary-color)] hover:(outline outline-2) cursor-pointer"
        @click="handleModeChange('horizontal-mix')"
      >
        <div class="bg-[var(--primary-color)] row-span-2"/>
        <div class="bg-[var(--primary-color)]"/>
        <div class="bg-[var(--divider-color)]"/>
      </n-el>
    </BaseHoverTip>
  </div>
</template>

<style scoped lang="scss">
.grid {
  height: 60px;
  width: 86px;
  gap: 0.4em;
  padding: 0.4em;
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius);
}

.grid > div {
  border-radius: var(--border-radius);
}
</style>
