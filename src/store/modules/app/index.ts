import { setLocale } from '@/locales';
import { setDayjsLocale } from '@/locales/dayjs';
import { localStg } from '@/utils/storage';
import { SecureStorage } from "@/store/plugins";

// 定义 state 的类型
interface AppState {
  locale: I18n.LangType;
  localeOptions: I18n.LangOption[];
  isMobile: boolean;
}

export const useAppStore = defineStore('app-store', () => {
  const scope = effectScope();
  const state = reactive<AppState>({
    locale: localStg.get('lang') || 'zh-CN',
    localeOptions: [
      {
        label: '中文',
        key: 'zh-CN'
      },
      {
        label: 'English',
        key: 'en-US'
      }
    ],
    isMobile: false,
  });

  const changeLocale = (lang: I18n.LangType) => {
    state.locale = lang;
    setLocale(lang);
    localStg.set('lang', lang);
  };

  const init = () => {
    setDayjsLocale(state.locale);
  };

  // watch store
  scope.run(() => {
    // watch locale
    watch(() => state.locale, () => {
        // set dayjs locale
        setDayjsLocale(state.locale);
      }
    );
  });

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop();
  });

  // init
  init();

  // 使用 toRefs 将 state 转换为 ref 对象
  const stateRefs = toRefs(state);

  return {
    ...stateRefs,
    changeLocale
  };
}, {
  persist: {
    // 持久化存储 使用加密的存储方式
    storage: SecureStorage
  }
});
