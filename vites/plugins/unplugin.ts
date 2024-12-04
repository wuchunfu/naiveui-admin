import type { PluginOption } from 'vite';
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import ImageMin from 'unplugin-imagemin/vite';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import VueJsx from 'unplugin-vue-jsx/vite'
import Shiki from '@shikijs/markdown-it'
import LinkAttributes from 'markdown-it-link-attributes'
import Markdown from 'unplugin-vue-markdown/vite'
import VueNamedExport from 'unplugin-vue-named-export/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { getSrcJoinPath } from "../utils";

export function setupUnplugin(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX, VITE_ICON_LOCAL_PATH } = viteEnv;

  const localIconPath = getSrcJoinPath(VITE_ICON_LOCAL_PATH);

  const i18nPath = getSrcJoinPath('locales/locales')

  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${ VITE_ICON_PREFIX }-`, '');

  const plugins: PluginOption[] = [
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [i18nPath],
    }),
    Components({
      deep: true,
      dts: 'src/types/components.d.ts',
      dirs: [
        'src/components',
        'src/layouts/components'
      ],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView']
      }],
      extensions: ['vue', 'md'],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/
      ],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          customCollections: [collectionName],
          componentPrefix: VITE_ICON_PREFIX
        })
      ]
    }),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      vueTemplate: true,
      viteOptimizeDeps: true,
      injectAtEnd: true,
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'pinia',
        '@vueuse/head',
        '@vueuse/core',
        {
          'naive-ui': [
            'zhCN',
            'enUS',
            'dateZhCN',
            'dateEnUS',
            'NButton',
            'darkTheme',
            'useDialog',
            'useOsTheme',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        },
        {
          'vue': [
            'createVNode',
            'defineOptions',
            'defineProps',
            'withDefaults',
            'defineEmits',
            'render'
          ],
          'vue-router': [
            'createRouter',
            'createWebHistory',
            'createWebHashHistory',
            'useRouter',
            'useRoute',
            'Router'
          ],
          'uuid': [
            ['v4', 'uuidv4']
          ],
          // 全局使用 _.xxxx()
          'lodash-es': [
            // default imports
            ['*', '_'] // import { * as _ } from 'lodash-es',
          ]
        },
        // type import
        {
          from: 'vue',
          imports: [
            'App',
            'VNode',
            'defineOptions',
            'ComponentPublicInstance',
            'ComponentPublicInstanceCustom',
            'ComponentInternalInstance'
          ],
          type: true
        },
        {
          from: 'vue-router',
          imports: [
            'RouteRecordRaw',
            'RouteLocationRaw',
            'LocationQuery',
            'RouteParams',
            'RouteLocationNormalizedLoaded',
            'RouteRecordName',
            'NavigationGuard'
          ],
          type: true
        },
        {
          from: 'naive-ui',
          imports: [
            'NLocale',
            'FormInst',
            'arkTheme',
            'useOsTheme',
            'MenuOption',
            'NDateLocale',
            'DropdownOption',
            'PopoverPlacement',
            'GlobalThemeOverrides',
          ],
          type: true
        }
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" fill="currentColor" ')
        )
      },
      scale: 1,
      defaultClass: 'inline-block'
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${ VITE_ICON_LOCAL_PREFIX }-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    }),
    ImageMin({
      mode: "sharp",
    }),
    VueJsx(),
    VueNamedExport(),
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      async markdownItSetup(md) {
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(await Shiki({
          defaultColor: false,
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        }))
      },
    }),
  ];

  return plugins;
}

