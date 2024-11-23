import { ProxyOptions } from "vite";

/**
 * Set http proxy
 *
 * @param env - The current env
 * @param enable - If enable http proxy
 */
export function createViteProxy(env: Env.ImportMeta, enable: boolean) {
  const isEnableHttpProxy = enable && env.VITE_HTTP_PROXY === 'Y';

  if (!isEnableHttpProxy) {
    return undefined;
  }

  const proxy: Record<string, ProxyOptions> = {
    [env.proxy]: {
      target: env.url,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${env.proxy}`), '')
    }
  };
  return proxy;
}
