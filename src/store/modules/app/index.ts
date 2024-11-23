import { effectScope, onScopeDispose, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enums/AppEnum';
import { setLocale } from '@/locales';
import { setDayjsLocale } from '@/locales/dayjs';
import { localStg } from '@/utils/storage';

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const scope = effectScope();
  const locale = ref<I18n.LangType>(localStg.get('lang') || 'zh-CN');

  const localeOptions: I18n.LangOption[] = [
    {
      label: '中文',
      key: 'zh-CN'
    },
    {
      label: 'English',
      key: 'en-US'
    }
  ];

  function changeLocale(lang: I18n.LangType) {
    locale.value = lang;
    setLocale(lang);
    localStg.set('lang', lang);
  }

  function init() {
    setDayjsLocale(locale.value);
  }

  // watch store
  scope.run(() => {
    // watch locale
    watch(locale, () => {
      // set dayjs locale
      setDayjsLocale(locale.value);
    });
  });

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop();
  });

  // init
  init();

  return {
    locale,
    localeOptions,
    changeLocale
  };
});
