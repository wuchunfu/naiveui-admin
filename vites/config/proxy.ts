import { ProxyOptions } from "vite";

/**
 * Set http proxy
 *
 * @param env - The current env
 */
export function createViteProxy(env: Env.ImportMeta) {
  const isEnableHttpProxy = env.VITE_HTTP_PROXY === 'Y';

  if (!isEnableHttpProxy) {
    return undefined;
  }

  const proxyPrefix = env.VITE_PROXY_PREFIX || '/api';
  const proxyTarget = env.VITE_SERVICE_BASE_URL || 'http://localhost:8080';
  const proxy: Record<string, ProxyOptions> = {
    [proxyPrefix]: {
      target: proxyTarget,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${proxyPrefix}`), `${ proxyPrefix }`),
      secure: false,
      configure: (proxy, options) => {
        // 配置此项可在响应头中看到请求的真实地址
        proxy.on('proxyRes', (proxyRes, req) => {
          const targetUrl = options.target as string;
          proxyRes.headers['x-real-url'] = new URL(req.url || '', targetUrl).href || '';
        });
      },
    }
  };
  return proxy;
}
