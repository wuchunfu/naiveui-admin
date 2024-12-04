// ts 解析vue文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * @description: 环境变量
 * -dev: 开发环境
 * -test: 测试环境
 * -prod: 生产环境
 */
type ServiceEnvType = 'dev' | 'test' | 'prod';

/** 后台服务的url配置 */
interface ServiceUrlConfig {
  /** 请求地址 */
  url: string;
}

interface ServiceUrlProxyConfig extends ServiceUrlConfig {
  /**
   * 匹配路径的正则字符串
   * - 用于拦截地址转发代理(任意以 /开头 + 字符串, 单个/不起作用)
   * - 和后端请求地址的前缀无关
   * - 有多个后端请求实例时，需要创建不同的值
   */
  proxy: '/api';
}

interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** 项目名称 */
  readonly VITE_APP_NAME: string;
  /** 项目标题 */
  readonly VITE_APP_TITLE: string;
  /** 项目描述 */
  readonly VITE_APP_DESC: string;
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
  /** 路由首页的路径 */
  readonly VITE_ROUTE_HOME_PATH: string;
  /** iconify图标作为组件的前缀 */
  readonly VITE_ICON_PREFIX: string;
  /**
   * 本地SVG图标作为组件的前缀, 请注意一定要包含 VITE_ICON_PREFIX
   * - 格式 {VITE_ICON_PREFIX}-{本地图标集合名称}
   * - 例如：icon-local
   */
  readonly VITE_ICON_LOCAL_PREFIX: string;
  /** 本地SVG图标的路径 src下的那个目录 */
  readonly VITE_ICON_LOCAL_PATH: string;
  /** 后端服务的环境类型 */
  readonly VITE_SERVICE_ENV?: ServiceEnvType;
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: 'Y' | 'N';
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER?: 'Y' | 'N';
  /** 是否开启打包压缩 */
  readonly VITE_COMPRESS?: 'Y' | 'N';
  /** 压缩算法类型 */
  readonly VITE_COMPRESS_TYPE?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw';
  /** 是否应用pwa */
  readonly VITE_PWA?: 'Y' | 'N';
  /**
   * 是否开启生产模式下的mock
   * @description 生产模式下会拦截XHR，导致无法获取response，不使用mock请求时设置为N
   */
  readonly VITE_PROD_MOCK?: 'Y' | 'N';
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: 'Y' | 'N';
  /** 是否应用自动生成路由的插件 */
  readonly VITE_SOYBEAN_ROUTE_PLUGIN?: 'Y' | 'N';
}

/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {
  /** The router history mode */
  type RouterHistoryMode = 'hash' | 'history' | 'memory';

  /** Interface for import.meta */
  interface ImportMeta extends ImportMetaEnv {
    /** The base url of the application */
    /** 项目基本地址 */
    readonly VITE_BASE_URL: string;
    /** 项目名称 */
    readonly VITE_APP_NAME: string;
    /** The title of the application */
    /** 项目标题 */
    readonly VITE_APP_TITLE: string;
    /** The description of the application */
    /** 项目描述 */
    readonly VITE_APP_DESC: string;
    /** The router history mode */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode;
    /** The prefix of the iconify icon */
    /** iconify图标作为组件的前缀 */
    readonly VITE_ICON_PREFIX: 'icon';
    /**
     * The prefix of the local icon
     *
     * This prefix is start with the icon prefix
     */
    /**
     * 本地SVG图标作为组件的前缀, 请注意一定要包含 VITE_ICON_PREFIX
     * - 格式 {VITE_ICON_PREFIX}-{本地图标集合名称}
     * - 例如：icon-local
     */
    readonly VITE_ICON_LOCAL_PREFIX: 'local-icon';
    /** 本地SVG图标的路径 src下的那个目录 */
    readonly VITE_ICON_LOCAL_PATH: string;
    /** backend service base url */
    readonly VITE_SERVICE_BASE_URL: string;
    /**
     * success code of backend service
     *
     * when the code is received, the request is successful
     */
    readonly VITE_SERVICE_SUCCESS_CODE: string;
    /**
     * logout codes of backend service
     *
     * when the code is received, the user will be logged out and redirected to login page
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_LOGOUT_CODES: string;
    /**
     * modal logout codes of backend service
     *
     * when the code is received, the user will be logged out by displaying a modal
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_MODAL_LOGOUT_CODES: string;
    /**
     * token expired codes of backend service
     *
     * when the code is received, it will refresh the token and resend the request
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_EXPIRED_TOKEN_CODES: string;
    /** when the route mode is static, the defined super role */
    readonly VITE_STATIC_SUPER_ROLE: string;
    /**
     * other backend service base url
     *
     * the value is a json
     */
    readonly VITE_OTHER_SERVICE_BASE_URL: string;
    /**
     * Whether to enable the http proxy
     *
     * Only valid in the development environment
     */
    /** 开启请求代理 */
    readonly VITE_HTTP_PROXY?: CommonType.YesOrNo;
    /** 是否开启打包压缩 */
    readonly VITE_COMPRESS?: 'Y' | 'N';
    /** 压缩算法类型 */
    readonly VITE_COMPRESS_TYPE?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw';
    /**
     * The auth route mode
     *
     * - Static: the auth routes is generated in front-end
     * - Dynamic: the auth routes is generated in back-end
     */
    /**
     * 权限路由模式:
     * - static - 前端声明的静态
     * - dynamic - 后端返回的动态
     */
    readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
    /** 路由首页的路径 */
    readonly VITE_ROUTE_HOME_PATH: string;
    /**
     * Default menu icon if menu icon is not set
     *
     * Iconify icon name
     */
    readonly VITE_MENU_ICON: string;
    /** Whether to build with sourcemap */
    readonly VITE_SOURCE_MAP?: CommonType.YesOrNo;
    /**
     * Iconify api provider url
     *
     * If the project is deployed in intranet, you can set the api provider url to the local iconify server
     *
     * @link https://docs.iconify.design/api/providers.html
     */
    readonly VITE_ICONIFY_URL?: string;
    /** Used to differentiate storage across different domains */
    readonly VITE_STORAGE_PREFIX?: string;
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
