<template>
  <div class="flex-center w-48px text-24px">
    <ButtonIcon
        icon="majesticons:color-swatch-line"
        :tooltip-content="$t('icon.themeConfig')"
        tooltip-placement="bottom"
        @click="drawerShow = true"
    />
  </div>

  <n-drawer
      v-model:show="drawerShow"
      display-directive="show"
      :width="props.width"
  >
    <n-drawer-content :title="$t('theme.themeDrawerTitle')">
      <n-space vertical>
        <ThemeModeConfig/>

        <LayoutModeConfig/>
        
        <MenuConfig/>

        <ColorConfig/>

        <SidebarConfig/>

        <AnimationConfig/>

        <FooterConfig/>

        <NaiveUIConfig/>
      </n-space>
      <template #footer>
        <n-button type="warning" @click="themeStore.resetThemeStore()">
          重置主题样式
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "@/store";
import { $t } from "@/locales";
import ThemeModeConfig from "@/layouts/components/setting/theme-mode-config.vue";
import LayoutModeConfig from "@/layouts/components/setting/layout-mode-config.vue";
import MenuConfig from "@/layouts/components/setting/menu-config.vue";
import ColorConfig from "@/layouts/components/setting/color-config.vue";
import SidebarConfig from "@/layouts/components/setting/sidebar-config.vue";
import AnimationConfig from "@/layouts/components/setting/animation-config.vue";
import FooterConfig from "@/layouts/components/setting/footer-config.vue";
import NaiveUIConfig from "@/layouts/components/setting/naiveui-config.vue";

defineOptions({
  name: 'HeaderThemeSetting'
});

const props = defineProps({
  width: {
    type: String,
    default: '360px'
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:show'])
const drawerShow = ref(false)
const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
</style>