import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import { setupVitePlugins } from "./vites/plugins";
import { createViteProxy, createViteOptimizeDeps } from "./vites/config";
import { getBuildTime, getRootPath, getSrcPath } from "./vites/utils";
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: getBuildTime(),
};

// https://vitejs.dev/config/
const rootPath = getRootPath();
const srcPath = getSrcPath();

export default defineConfig(configEnv => {
  // 获取环境变量
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;

  const { VITE_PORT, VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_SOURCE_MAP } = viteEnv;

  const buildTime = getBuildTime();
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      }
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    server: {
      host: true, // 监听所有地址
      port: VITE_PORT, // 端口号
      open: false, // 项目启动时是否自动在浏览器中打开应用程序
      hmr: true, // 开启热更新
      cors: true, // 跨域允许
      proxy: createViteProxy(viteEnv),
      fs: {
        cachedChecks: false
      }
    },
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
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      sourcemap: VITE_SOURCE_MAP === 'Y',
      commonjsOptions: {
        ignoreTryCatch: false
      },
      esbuild: {
        pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
      }
    },
    optimizeDeps: createViteOptimizeDeps,
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
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
