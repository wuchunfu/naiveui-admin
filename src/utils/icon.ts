// 渲染icon
import SvgIcon from "@/components/common/svg-icon.vue";
import { h } from "vue";

export const renderIcon = (icon?: string, localIcon?: string) => {
  if (icon && localIcon) {
    // 默认p 内容为icon
    return () => h(SvgIcon, { icon, localIcon })
  } else {
    return () => h(SvgIcon, { icon })
  }
}

export const getLocalIcons = () => {
  const svgIcons = import.meta.glob('/src/assets/svg-icon/*.svg');

  return Object.keys(svgIcons)
    .map(item => item.split('/').at(-1)?.replace('.svg', '') || '')
    .filter(Boolean);
}

