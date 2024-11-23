// 路由 枚举
export enum RouterEnum {
  // 登录页面
  LOGIN = '/login',
  // 注册页面
  REGISTER = '/register',
  // 无权限页面
  ERROR = '/error',
  // 403 页面
  ERROR_403 = '/403',
  // 404 页面
  ERROR_404 = '/404',
  // not found 页面
  NOT_FOUND = '/:pathMatch(.*)*',
  // index 页面
  INDEX = '/',
  // 根页面
  ROOT = '/root'
}
