/**
 * @description: 环境变量
 * -dev: 开发环境
 * -test: 测试环境
 * -prod: 生产环境
 */
type ServiceEnvType = 'dev' | 'test' | 'prod';

/**
 * The router history mode
 */
type RouterHistoryMode = 'hash' | 'history' | 'memory';

interface ImportMetaEnv {
  /** Vite 端口号 */
  readonly VITE_PORT: number;
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** 项目基础路径 */
  readonly VITE_BASE_PATH: string;
  /** 项目名称 */
  readonly VITE_APP_NAME: string;
  /** 项目标题 */
  readonly VITE_APP_TITLE: string;
  /** 项目描述 */
  readonly VITE_APP_DESC: string;
  /** 是否删除控制台所有日志 */
  readonly VITE_DROP_CONSOLE?: CommonType.YesOrNo;
  /** 后端服务的环境类型 */
  readonly VITE_SERVICE_ENV?: ServiceEnvType;
  /** The router history mode */
  readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode;
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: CommonType.YesOrNo;
  /**
   * 是否启用http代理
   * 仅在开发环境中有效
   */
  readonly VITE_HTTP_PROXY?: CommonType.YesOrNo;
  /** 开启请求代理前缀 */
  readonly VITE_PROXY_PREFIX?: string;
  /** http代理服务器地址 */
  readonly VITE_PROXY_SERVER_URL?: string;
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER?: CommonType.YesOrNo;
  /** 是否开启打包压缩 */
  readonly VITE_COMPRESS?: CommonType.YesOrNo;
  /** 压缩算法类型 */
  readonly VITE_COMPRESS_TYPE?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw';
  /** 是否应用pwa */
  readonly VITE_PWA?: CommonType.YesOrNo;
  /** Whether to build with sourcemap */
  readonly VITE_SOURCE_MAP?: CommonType.YesOrNo;
  /**
   * 是否开启生产模式下的mock
   * @description 生产模式下会拦截XHR，导致无法获取response，不使用mock请求时设置为N
   */
  readonly VITE_PROD_MOCK?: CommonType.YesOrNo;
}

/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {

  /** Interface for import.meta */
  interface ImportMeta extends ImportMetaEnv {
    /** iconify图标作为组件的前缀 */
    readonly VITE_ICON_PREFIX: string;
    /**
     * 本地SVG图标作为组件的前缀, 请注意一定要包含 VITE_ICON_PREFIX
     * - 格式 {VITE_ICON_PREFIX}-{本地图标集合名称}
     * - 例如：local-icon
     */
    readonly VITE_ICON_LOCAL_PREFIX: string;
    /** 本地SVG图标的路径 src下的那个目录 */
    readonly VITE_ICON_LOCAL_PATH: string;
    /**
     * Iconify api provider url
     *
     * If the project is deployed in intranet, you can set the api provider url to the local iconify server
     *
     * @link https://docs.iconify.design/api/providers.html
     */
    readonly VITE_ICONIFY_URL?: string;
    /** 是否应用自动生成路由的插件 */
    readonly VITE_SOYBEAN_ROUTE_PLUGIN?: CommonType.YesOrNo;
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
    /** Used to differentiate storage across different domains */
    readonly VITE_STORAGE_PREFIX?: string;
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
