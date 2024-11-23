import { useSvgIconRender } from './use-svg-icon-render';
import SvgIcon from '@/components/custom/svg-icon.vue';

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon);

  return {
    SvgIconVNode
  };
}
