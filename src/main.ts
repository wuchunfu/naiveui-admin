import {
  setupAppVersionNotification,
  setupAssets,
  setupDayjs,
  setupIconifyOffline,
  setupLoading,
  setupNProgress
} from './plugins';
import './plugins/assets';
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupI18n } from './locales';
import { createApp } from 'vue';
import App from './App.vue';

async function setupApp() {

  setupLoading()

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(App);

  // 引入 unocss css
  setupAssets();

  setupStore(app);

  await setupRouter(app);

  setupI18n(app);

  setupAppVersionNotification();

  app.mount('#app')
}

export default setupApp()
