import type { PluginOption } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import VueDevtools from 'vite-plugin-vue-devtools';
import Progress from 'vite-plugin-progress';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';
import { setupCompressionPlugin } from './compression';
import { setupHtmlPlugin } from './html';

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    Vue({
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ]
    }),
    VueJsx(),
    VueDevtools(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    Progress(),
    setupHtmlPlugin(buildTime),
    setupCompressionPlugin()
  ];

  return plugins;
}
