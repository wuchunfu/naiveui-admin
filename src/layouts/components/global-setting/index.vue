<script setup lang="ts">
import { useThemeStore } from "@/store";
import { $t } from "@/locales";
import SettingThemeMode from "@/layouts/components/global-setting/components/setting-theme-mode.vue";
import SettingLayoutMode from "@/layouts/components/global-setting/components/setting-layout-mode.vue";
import SettingMenu from "@/layouts/components/global-setting/components/setting-menu.vue";
import SettingColor from "@/layouts/components/global-setting/components/setting-color.vue";
import SettingSidebar from "@/layouts/components/global-setting/components/setting-sidebar.vue";
import SettingAnimation from "@/layouts/components/global-setting/components/setting-animation.vue";
import SettingFooter from "@/layouts/components/global-setting/components/setting-footer.vue";
import SettingNaiveUI from "@/layouts/components/global-setting/components/setting-naiveui.vue";

defineOptions({
  name: 'GlobalSetting'
});

// 类型定义
interface Props {
  width?: string;
  drawerShow?: boolean;
}

// props 定义
const props = withDefaults(defineProps<Props>(), {
  width: '360px',
  drawerShow: true
});

const model = defineModel<boolean>('show', {
  default: false
});

const themeStore = useThemeStore();

const resetTheme = () => {
  themeStore.$reset();
};
</script>

<template>
  <div
    class="flex-center w-48px text-24px"
    v-if="drawerShow"
  >
    <ButtonIcon
      icon="majesticons:color-swatch-line"
      :tooltip-content="$t('icon.themeConfig')"
      tooltip-placement="bottom"
      @click="model = true"
    />
  </div>

  <n-drawer
    v-model:show="model"
    display-directive="show"
    :width="width"
  >
    <n-drawer-content :title="$t('theme.themeDrawerTitle')">
      <n-space vertical>
        <SettingThemeMode/>

        <SettingLayoutMode/>

        <SettingMenu/>

        <SettingColor/>

        <SettingSidebar/>

        <SettingAnimation/>

        <SettingFooter/>

        <SettingNaiveUI/>
      </n-space>
      <template #footer>
        <n-button type="warning" @click="resetTheme">
          重置主题样式
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss">
</style>
