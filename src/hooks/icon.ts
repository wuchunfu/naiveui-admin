import { useSvgIconRender } from './use-svg-icon-render';
import SvgIcon from '@/components/common/svg-icon.vue';

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon);

  return {
    SvgIconVNode
  };
}
