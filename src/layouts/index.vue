<script setup lang="ts">
import { useThemeStore } from "@/store";
import Vertical from "@/layouts/components/global-menu/components/vertical.vue";
import Horizontal from "@/layouts/components/global-menu/components/horizontal.vue";
import HorizontalMix from "@/layouts/components/global-menu/components/horizontal-mix.vue";
import { LayoutEnum } from "@/enums/LayoutEnum.ts";

defineOptions({
  name: "BaseLayout"
});

const theme = useThemeStore();

const activeMenu = computed(() => {
  const layoutMap = {
    [LayoutEnum.VERTICAL]: Vertical,
    [LayoutEnum.HORIZONTAL]: Horizontal,
    [LayoutEnum.HORIZONTAL_MIX]: HorizontalMix
  }
  return layoutMap[theme.layout.mode]
    ? layoutMap[theme.layout.mode]
    : Vertical
})
</script>

<template>
  <component :is="activeMenu"/>
</template>

<style scoped lang="scss">
</style>
