import { getRequest } from "@/utils/request";

export const fetchGetRoleList = async (params?: Api.SystemManage.RoleSearchParams) => {
  return await getRequest<Api.SystemManage.RoleList>(`https://mock.apifox.cn/m1/3109515-0-default/systemManage/getRoleList?current=${ params?.current }&size=${ params?.size }`, {})
}

export const fetchGetAllRoles = async () => {
  return await getRequest<Api.SystemManage.AllRole[]>('https://mock.apifox.cn/m1/3109515-0-default/systemManage/getAllRoles', {})
}

export const fetchGetUserList = async (params?: Api.SystemManage.UserSearchParams) => {
  return await getRequest<Api.SystemManage.UserList>(`https://mock.apifox.cn/m1/3109515-0-default/systemManage/getUserList?current=${ params?.current }&size=${ params?.size }`, {})
}

export const fetchGetMenuList = async () => {
  return await getRequest<Api.SystemManage.MenuList>('https://mock.apifox.cn/m1/3109515-0-default/systemManage/getMenuList/v2', {})
}

export const fetchGetAllPages = async () => {
  return await getRequest<string[]>('https://mock.apifox.cn/m1/3109515-0-default/systemManage/getAllPages', {})
}

export const fetchGetMenuTree = async () => {
  return await getRequest<Api.SystemManage.MenuTree[]>('https://mock.apifox.cn/m1/3109515-0-default/systemManage/getMenuTree', {})
}
