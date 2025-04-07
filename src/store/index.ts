import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { App } from "vue";
import { resetStore } from "./plugins/reset";

export const setupStore = (app: App) => {
  const pinia = createPinia();
  // 持久化
  pinia.use(piniaPluginPersistedstate);
  // 重置 tips：因为pinia 通过setup方式创建的store使用$reset方法会失效
  pinia.use(resetStore)
  app.use(pinia);
};

export * from './modules';
