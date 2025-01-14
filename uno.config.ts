import { presetUno } from '@unocss/preset-uno';
import { presetIcons } from '@unocss/preset-icons';
import { presetRemToPx } from '@unocss/preset-rem-to-px';
import { presetTypography } from '@unocss/preset-typography';
import { presetAttributify } from '@unocss/preset-attributify';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig } from '@unocss/vite';

export default defineConfig({
  content: {
    pipeline: {
      exclude: [
        'node_modules',
        'dist',
        '.git',
        '.husky',
        '.vscode',
        'public',
        'build',
        'mock',
        './stats.html'
      ]
    }
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify,
    presetTypography,
    presetRemToPx,
    presetIcons
  ],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-col': 'flex flex-col',
    'flex-col-center': 'flex-center flex-col',
    'flex-col-stretch': 'flex-col items-stretch',
    'flex-1-hidden': 'flex-1 overflow-hidden',
    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'i-flex-col': 'inline-flex flex-col',
    'i-flex-col-center': 'flex-col i-flex-center',
    'i-flex-col-stretch': 'i-flex-col items-stretch',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-lb': 'absolute left-0 bottom-0',
    'absolute-rt': 'absolute right-0 top-0',
    'absolute-rb': 'absolute right-0 bottom-0',
    'absolute-tl': 'absolute-lt',
    'absolute-tr': 'absolute-rt',
    'absolute-bl': 'absolute-lb',
    'absolute-br': 'absolute-rb',
    'absolute-center': 'absolute-lt flex-center wh-full',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-lb': 'fixed left-0 bottom-0',
    'fixed-rt': 'fixed right-0 top-0',
    'fixed-rb': 'fixed right-0 bottom-0',
    'fixed-tl': 'fixed-lt',
    'fixed-tr': 'fixed-rt',
    'fixed-bl': 'fixed-lb',
    'fixed-br': 'fixed-rb',
    'fixed-center': 'fixed-lt flex-center size-full',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'ellipsis-text': 'nowrap-hidden text-ellipsis',
    'transition-base': 'transition-all duration-300 ease-in-out',
    'bg-container': 'bg-white dark:bg-dark',
    'bg-layout': 'bg-#f5f7f9 dark:bg-#101014 ',
    'card-wrapper': 'rd-8px shadow-sm'
  },
  theme: {
    colors: {
      primary: 'rgba(var(--primary-color))',
      primary_hover: 'rgba(var(--primary-color-hover))',
      primary_pressed: 'rgba(var(--primary-color-pressed))',
      primary_active: 'rgba(var(--primary-color-active),0.1)',
      primary_1: 'rgba(var(--primary-color-1))',
      primary_2: 'rgba(var(--primary-color-2))',
      primary_3: 'rgba(var(--primary-color-3))',
      primary_4: 'rgba(var(--primary-color-4))',
      primary_5: 'rgba(var(--primary-color-5))',
      primary_6: 'rgba(var(--primary-color-6))',
      primary_7: 'rgba(var(--primary-color-7))',
      primary_8: 'rgba(var(--primary-color-8))',
      primary_9: 'rgba(var(--primary-color-9))',
      info: 'rgba(var(--info-color))',
      info_hover: 'rgba(var(--info-color-hover))',
      info_pressed: 'rgba(var(--info-color-pressed))',
      info_active: 'rgba(var(--info-color-active),0.1)',
      success: 'rgba(var(--success-color))',
      success_hover: 'rgba(var(--success-color-hover))',
      success_pressed: 'rgba(var(--success-color-pressed))',
      success_active: 'rgba(var(--success-color-active),0.1)',
      warning: 'rgba(var(--warning-color))',
      warning_hover: 'rgba(var(--warning-color-hover))',
      warning_pressed: 'rgba(var(--warning-color-pressed))',
      warning_active: 'rgba(var(--warning-color-active),0.1)',
      error: 'rgba(var(--error-color))',
      error_hover: 'rgba(var(--error-color-hover))',
      error_pressed: 'rgba(var(--error-color-pressed))',
      error_active: 'rgba(var(--error-color-active),0.1)',
      nprogress: 'rgb(var(--nprogress-color))',
      container: 'rgb(var(--container-bg-color))',
      layout: 'rgb(var(--layout-bg-color))',
      inverted: 'rgb(var(--inverted-bg-color))',
      'base-text': 'rgb(var(--base-text-color))'
    },
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      icon: '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem'
    },
    boxShadow: {
      header: 'var(--header-box-shadow)',
      sider: 'var(--sider-box-shadow)',
      tab: 'var(--tab-box-shadow)'
    }
  }
});
