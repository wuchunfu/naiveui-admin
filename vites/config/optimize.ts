import type { DepOptimizationOptions } from 'vite';

export const createViteOptimizeDeps = (): DepOptimizationOptions => {
  const include: string[] = [
    'vue',
    'vue-router',
    'vue-i18n',
    'pinia',
    'axios',
    'naive-ui',
    '@vueuse/core',
  ];
  const exclude: string[] = [
    '@iconify-json/mdi',
    '@iconify-json/mingcute',
    '@iconify-json/ri',
    '@iconify-json/line-md',
  ];

  return {
    include,
    exclude,
  };
}
