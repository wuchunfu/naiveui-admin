<script setup lang="ts">
import { useThemeStore } from '@/store';
import { $t } from '@/locales';

defineOptions({
  name: 'LayoutModeConfig'
});

const themeStore = useThemeStore();
</script>

<template>
  <n-divider>{{ $t('theme.layoutMode.title') }}</n-divider>
  <div class="flex text-primary">
    <n-grid x-gap="24" y-gap="24" :cols="2">
      <n-grid-item>
        <base-hover-tip text="基本布局" :hover-style="false">
          <icon-local-layout-base
              class="p-4px border-2px hover:border-primary rounded-6px text-100px"
              :class="[themeStore.layout.mode === 'base' ? 'border-primary' : 'border-transparent']"
              @click="themeStore.setLayoutMode('base')"
          />
        </base-hover-tip>
      </n-grid-item>
      <n-grid-item>
        <base-hover-tip text="分离式卡片布局" :hover-style="false">
          <icon-local-layout-card
              class="p-4px border-2px hover:border-primary rounded-6px text-100px"
              :class="[themeStore.layout.mode === 'card' ? 'border-primary' : 'border-transparent']"
              @click="themeStore.setLayoutMode('card')"
          />
        </base-hover-tip>
      </n-grid-item>
      <n-grid-item span="2" v-if="themeStore.layout.mode === 'card'">
        <div class="flex items-center justify-between">
          <p class="text-16px  mr-12px">分离式卡片圆角(px)</p>
          <n-input-number
              class="w-120px text-center"
              v-model:value="themeStore.layout.round"
              :step="2"
              :min="0"
          />
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped lang="scss"></style>
