import type { PluginOption } from 'vite';
import viteCompression from 'vite-plugin-compression';

export const setupCompressionPlugin = (): PluginOption => {
  // 默认压缩gzip，生产.gz文件
  return viteCompression({
    deleteOriginFile: false, // 压缩后是否删除源文件
  });
};
