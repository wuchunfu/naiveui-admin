import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import { setupVitePlugins } from "./build/plugins";
import { getBuildTime, getRootPath, getSrcPath } from "./build/utils";

// https://vitejs.dev/config/
const rootPath = getRootPath();
const srcPath = getSrcPath();

export default defineConfig(configEnv => {
  // 获取环境变量
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;

  const enableProxy = configEnv.command === 'serve' && !configEnv.isPreview;

  const buildTime = getBuildTime();
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      }
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    // server: {
    //   host: '0.0.0.0',
    //   port: 8888,
    //   open: false,
    //   proxy: createViteProxy(viteEnv, enableProxy),
    //   fs: {
    //     cachedChecks: false
    //   }
    // },
    // server: {
    //   host: '0.0.0.0',
    //   port: 8888,
    //   proxy: {
    //     '/api': {
    //       // 这里填写后端地址
    //       target: 'http://127.0.0.1:8001',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '/api')
    //     }
    //   }
    // },
    build: {
      target: "ESNext",
      reportCompressedSize: false,
      sourcemap: viteEnv.VITE_SOURCE_MAP === 'Y',
      commonjsOptions: {
        ignoreTryCatch: false
      }
    },
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/scss/global.scss" as *;`
        }
      }
    }
  }
})
