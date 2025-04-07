import { h } from 'vue';
import type { Component } from 'vue';

interface IconConfig {
  /** Iconify icon name */
  icon?: string;
  /** Local icon name */
  localIcon?: string;
  /** Icon color */
  color?: string;
  /** Icon size */
  fontSize?: number;
}

export type IconStyle = Partial<Pick<CSSStyleDeclaration, 'color' | 'fontSize'>>;

/**
 * Svg icon render hook
 *
 * @param SvgIcon Svg icon component
 */
export function useSvgIconRender(SvgIcon: Component) {

  /**
   * Svg icon VNode
   *
   * @param config
   */
  const SvgIconVNode = (config: IconConfig) => {
    const { color, fontSize, icon, localIcon } = config;

    const style: IconStyle = {};

    if (color) {
      style.color = color;
    }
    if (fontSize) {
      style.fontSize = `${fontSize}px`;
    }

    if (icon && localIcon) {
      return () => h(SvgIcon, { icon, localIcon, style });
    } else {
      return () => h(SvgIcon, { icon, style });
    }
  };

  return {
    SvgIconVNode
  };
}
