<script setup lang="ts">
import { useThemeStore } from "@/store";
import { useAppStore } from '@/store/modules/app';
import { System } from "@/types/system";
import { LayoutEnum } from "@/enums/LayoutEnum.ts";
import HeaderAvatar from "@/layouts/components/global-header/components/header-avatar.vue";
import HeaderTheme from "@/layouts/components/global-header/components/header-theme.vue";
import HeaderGithub from "@/layouts/components/global-header/components/header-github.vue";
import HeaderAppTitle from "@/layouts/components/global-header/components/header-app-title.vue";
import GlobalTabs from "@/layouts/components/global-tabs/index.vue";
import GlobalSetting from "@/layouts/components/global-setting/index.vue";

defineOptions({
  name: 'GlobalHeader'
});

// 类型定义
interface Props {
  activeKey?: string;
  menuOptions?: System.GlobalMenu[];
}

// props 定义
const props = withDefaults(defineProps<Props>(), {
  activeKey: '',
  menuOptions: () => []
});

const appStore = useAppStore();
const theme = useThemeStore();

const emits = defineEmits<{
  (e: 'clickMenuItem', key: string, item: System.GlobalMenu): void;
}>();

// 菜单点击
const clickMenuItem = (key: string, item: System.GlobalMenu) => {
  emits('clickMenuItem', key, item);
};

// 头部高度
const headerHeight = computed(() => theme.menu.headerHeight);
// 标签栏高度
const tabsHeight = computed(() => theme.menu.tabsHeight);
// 布局模式
const layoutMode = computed(() => theme.layout.mode);
// 菜单布局
const menuLayout = computed(() => theme.menu.layout);
</script>

<template>
  <n-layout-header
    class="bg-layout"
    :style="{height: tabsHeight + headerHeight + 'px'}"
  >
    <div class="flex-col">
      <div
        class="page-header bg-#ffffff dark:bg-dark"
        :style="{ height: `${headerHeight}px` }"
      >
        <div class="flex items-center" v-if="layoutMode !== LayoutEnum.VERTICAL">
          <GlobalLogo
            :style="{ width: `${theme.sidebar.width}px` }"
            v-if="layoutMode === LayoutEnum.HORIZONTAL"
          />
          <GlobalMenu
            :mode="LayoutEnum.HORIZONTAL"
            :active-key="activeKey"
            :menu-options="menuOptions"
            @click-menu-item="clickMenuItem"
          />
        </div>
        <n-space align="center" v-else>
          <template v-if="menuLayout === 'base'">
            <HeaderMenuToggle/>
            <GlobalBreadcrumb/>
          </template>
          <HeaderAppTitle v-else/>
        </n-space>
        <div class="flex h-full">
          <HeaderGithub/>
          <LangSwitch
            :lang="appStore.locale"
            :lang-options="appStore.localeOptions"
            @change-lang="appStore.changeLocale"
          />
          <HeaderTheme/>
          <GlobalSetting/>
          <HeaderAvatar/>
        </div>
      </div>
      <GlobalTabs/>
    </div>
  </n-layout-header>
</template>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  //position: absolute;
  //top: 0;
  //left: 10px;
  //width: calc(100% - 20px);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  padding: 0 12px;
}

.page-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}
</style>
