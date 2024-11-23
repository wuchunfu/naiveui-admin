import { getRequest, postRequest } from "@/utils/request";

// 登录
export const sysLogin = async (params: Record<string, any>) => {
  const param = {
    terminal: 1,
    ...params
  }
  return await postRequest<any>('/sys/login', param)
}

// 登出
export const sysLogout = async () => {
  return await postRequest<any>('/sys/logout')
}

// 用户信息
export function getSysUserInfo() {
  return getRequest<any>('/sys/admin/self')
}

// 菜单路由
export function getSysMenuRoute() {
  return getRequest<any>('/sys/menu/route')
}

// 导航路由
export function getNavRoute() {
  return getRequest<any>('/nav/category/route')
}

// 导航链接
export function getByCategoryId(id: number | string) {
  const params = {
    categoryId: id
  }
  return getRequest<any>('/nav/link/getByCategoryId', params)
}
