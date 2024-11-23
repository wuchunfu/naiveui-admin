import { systemThemeRef, useThemeStore } from "@/store";
import { getColorPalettes, getRgbOfColor } from "@/utils";
import { watch } from "vue";

export const subscribeThemeStore = () => {
  // 缓存处理
  const themeStore = useThemeStore();
  if (themeStore.mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (themeStore.mode === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    if (systemThemeRef.value === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  addThemeColorToCss(themeStore.color.primary)
  // 监听主题颜色
  themeStore.$subscribe((mutation, state) => {
    // 深色模式处理
    if (state.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (state.mode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (systemThemeRef.value === "dark") {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    // 主题色处理
    addThemeColorToCss(state.color.primary);
  })
}

// 监听系统主题
watch(systemThemeRef, (value) => {
  const themeStore = useThemeStore();
  if (value === "dark") {
    if (themeStore.mode === "dark" || themeStore.mode === "auto") {
      document.documentElement.classList.add('dark');
    }
  } else {
    document.documentElement.classList.remove('dark');
  }
})

function addThemeColorToCss(color: string) {
  const styleCss: any[] = []
  const { r, g, b } = getRgbOfColor(color);
  styleCss.push(`--primary-color: ${ r },${ g },${ b }`);
  const colorPaletteList = getColorPalettes(color);
  colorPaletteList.forEach((color, index) => {
    const { r: R, g: G, b: B } = getRgbOfColor(color);
    styleCss.push(`--primary-color-${ index }: ${ R },${ G },${ B }`);
  })
  document.documentElement.style.cssText += styleCss.join(';');
}
