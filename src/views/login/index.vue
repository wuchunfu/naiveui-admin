<script setup lang="ts">
import { $t } from "@/locales";
import { useThemeStore } from "@/store";
import { useAppStore } from '@/store/modules/app';
import GlobalLogo from "@/layouts/components/global-logo/index.vue";
import AccountLogin from "@/views/login/components/account-login.vue";
import QrcodeLogin from "@/views/login/components/qrcode-login.vue";

const appStore = useAppStore();
const themeStore = useThemeStore()
</script>

<template>
  <app-container height="100vh">
    <n-grid cols="5" item-responsive>
      <n-grid-item span="0 400:5 600:5 800:5 1000:3" :offset="1">
        <div class="login">
          <div class="absolute right-10 top-10">
            <ThemeSchemaSwitch
              :theme-schema="themeStore.mode"
              :show-tooltip="true"
              @switch="themeStore.toggleThemeMode"
            />
            <LangSwitch
              :lang="appStore.locale"
              :lang-options="appStore.localeOptions"
              :show-tooltip="true"
              @change-lang="appStore.changeLocale"
            />
          </div>
          <div class="login-item">
            <SvgIcon local-icon="login-bg" class="text-500px text-primary px-20px"/>
          </div>
          <div class="login-item px-4 w-360px">
            <GlobalLogo/>
            <p class="text-20px my-4">{{ $t('page.login.common.login') }}</p>
            <n-tabs type="segment">
              <n-tab-pane name="chap1" :tab="$t('page.login.common.accountLogin')">
                <transition name="fade-slide" mode="out-in" appear>
                  <AccountLogin/>
                </transition>
              </n-tab-pane>
              <n-tab-pane name="chap2" :tab="$t('page.login.common.qrcodeLogin')">
                <QrcodeLogin/>
              </n-tab-pane>
            </n-tabs>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </app-container>
</template>

<style scoped lang="scss">
.login {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &--left {
    background: linear-gradient(140.02deg, #f9f9fa, #f7f8ff);
  }
}
</style>
