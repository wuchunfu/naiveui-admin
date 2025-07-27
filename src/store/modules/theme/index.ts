import { GlobalThemeOverrides, useOsTheme, darkTheme } from "naive-ui";
import { themeSetting } from "@/setting/theme";
import { getColorPalette } from "@/utils";
import { SecureStorage } from "@/store/plugins";

// 系统主题
export const systemThemeRef = useOsTheme();

export const useThemeStore = defineStore('theme-store', () => {
  const state = reactive<Theme.GlobalTheme>(initTheme());

  const systemTheme = computed(() => {
    if (state.mode === 'dark') {
      state.mode = 'dark';
      return darkTheme;
    } else if (state.mode === 'light') {
      state.mode = 'light';
      return undefined;
    } else if (state.mode === 'auto') {
      if (systemThemeRef.value === 'dark') {
        return darkTheme;
      }
    }
    return undefined;
  });

  const getNaiveThemeOverrides = computed(() => {
    const themeOverride: GlobalThemeOverrides = {
      common: {
        primaryColor: state.color.primary,
        primaryColorHover: getColorPalette(state.color.primary, 5),
        primaryColorPressed: getColorPalette(state.color.primary, 7),
        primaryColorSuppl: state.color.primary,
        borderRadius: `${ state.naive.borderRadius }px`,
        successColor: state.color.success,
        successColorHover: getColorPalette(state.color.success, 5),
        successColorPressed: getColorPalette(state.color.success, 7),
        successColorSuppl: state.color.success,
        warningColor: state.color.warning,
        warningColorHover: getColorPalette(state.color.warning, 5),
        warningColorPressed: getColorPalette(state.color.warning, 7),
        warningColorSuppl: state.color.warning,
        errorColor: state.color.error,
        errorColorHover: getColorPalette(state.color.error, 5),
        errorColorPressed: getColorPalette(state.color.error, 7),
        errorColorSuppl: state.color.error,
        infoColor: state.color.info,
        infoColorHover: getColorPalette(state.color.info, 5),
        infoColorPressed: getColorPalette(state.color.info, 7),
        infoColorSuppl: state.color.info,
      },
      LoadingBar: {
        colorLoading: state.color.primary
      }
    };
    return themeOverride;
  });

  // 重置theme状态
  const $reset = () => {
    Object.assign(state, initTheme());
  };

  // 切换主题模式
  const toggleThemeMode = () => {
    const mode = state.mode;
    if (mode === 'light') {
      setThemeMode('dark')
    } else if (mode === 'dark') {
      setThemeMode('auto')
    } else {
      setThemeMode('light')
    }
  }

  // 设置主题模式
  const setThemeMode = (mode: Theme.GlobalTheme['mode']) => {
    state.mode = mode;
  };

  // 设置主题色
  const setPrimaryColor = (color: string) => {
    state.color.primary = color;
  };

  // 设置成功色
  const setSuccessColor = (color: string) => {
    state.color.success = color;
  };

  // 设置警告色
  const setWarningColor = (color: string) => {
    state.color.warning = color;
  };

  // 设置错误色
  const setErrorColor = (color: string) => {
    state.color.error = color;
  };

  // 设置过渡动画类型
  const setThemeAnimation = (animation: Theme.GlobalTheme["animation"]) => {
    state.animation = animation;
  };

  // 设置是否折叠菜单
  const setSidebarCollapsed = (collapsed: boolean) => {
    state.sidebar.collapsed = collapsed;
  };

  // 设置导航模式
  const setLayoutMode = (mode: string) => {
    state.layout.mode = mode;
  };

  // 使用 toRefs 将 state 转换为 ref 对象
  const stateRefs = toRefs(state);

  return {
    ...stateRefs,
    systemTheme,
    getNaiveThemeOverrides,
    $reset,
    setThemeMode,
    toggleThemeMode,
    setPrimaryColor,
    setSuccessColor,
    setWarningColor,
    setErrorColor,
    setThemeAnimation,
    setSidebarCollapsed,
    setLayoutMode,
  };
}, {
  persist: {
    storage: SecureStorage
  }
});

const initTheme = (): Theme.GlobalTheme => {
  return themeSetting;
};
