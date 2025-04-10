/** The common type namespace */
declare namespace CommonType {
  /** The strategic pattern */
  interface StrategicPattern {
    /** The condition */
    condition: boolean;
    /** If the condition is true, then call the action function */
    callback: () => void;
  }

  /**
   * The option type
   *
   * @property value: The option value
   * @property label: The option label
   */
  type Option<K = string> = { value: K; label: string };

  type YesOrNo = 'Y' | 'N';

  /** add null to all properties */
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | null;
  };

  /**
   * enable status
   *
   * - "1": enabled
   * - "2": disabled
   */
  type EnableStatus = '1' | '2';

  /**
   * user gender
   *
   * - "1": "male"
   * - "2": "female"
   */
  type UserGender = '1' | '2';

  /**
   * menu type
   *
   * - "1": directory
   * - "2": menu
   */
  type MenuType = '1' | '2';

  /**
   * icon type
   *
   * - "1": iconify icon
   * - "2": local icon
   */
  type IconType = '1' | '2';

  /**
   * The login module
   *
   * - pwd-login: password login
   * - code-login: phone code login
   * - qrcode-login: qrcode login
   * - wechat-login: wechat login
   * - register: register
   * - reset-pwd: reset password
   */
  type LoginModule = 'pwd-login' | 'code-login' | 'qrcode-login' | 'wechat-login' | 'register' | 'reset-pwd';

  /**
   * Theme mode
   */
  type ThemeMode = 'light' | 'dark' | 'auto';

  /**
   * The layout mode
   *
   * - vertical: the vertical menu in left
   * - horizontal: the horizontal menu in top
   * - vertical-mix: two vertical mixed menus in left
   * - horizontal-mix: the vertical first level menus in left and horizontal child level menus in top
   */
  type ThemeLayoutMode = 'vertical' | 'horizontal' | 'vertical-mix' | 'horizontal-mix';

  /**
   * The scroll mode when content overflow
   *
   * - Wrapper: the layout component's wrapper element has a scrollbar
   * - Content: the layout component's content element has a scrollbar
   *
   * @default 'wrapper'
   */
  type ThemeScrollMode = 'wrapper' | 'content';

  /**
   * Page animate mode
   */
  type ThemePageAnimateMode = 'fade' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out' | 'none';

  /**
   * The mode of the tab
   *
   * - chrome: chrome style
   * - button: button style
   *
   * @default chrome
   */
  type ThemeTabMode = 'button' | 'chrome';

  /**
   * 请求的错误类型：
   * - axios: axios错误：网络错误, 请求超时, 默认的兜底错误
   * - http: 请求成功，响应的http状态码非200的错误
   * - backend: 请求成功，响应的http状态码为200，由后端定义的业务错误
   */
  type RequestErrorType = 'axios' | 'http' | 'backend';

  interface RequestError {
    type: RequestErrorType;
    code: string | number;
    msg: string;

  }

  interface SuccessResult<T = any> {
    error: null;
    data: T;
  }

  interface FailedResult {
    error: RequestError;
    data: null;
  }

  type RestResponse<T = any> = SuccessResult<T> | FailedResult;

  /** The backend service response data */
  type Response<T = unknown> = {
    /** The backend service response code */
    code: string;
    /** The backend service response message */
    msg: string;
    /** The backend service response data */
    data: T;
  };
}
