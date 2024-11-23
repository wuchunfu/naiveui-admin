import { deleteRequest, getRequest, postRequest, putRequest } from "@/utils/request";

export const queryAllSystemMenu = async (params?: any) => {
  return await getRequest<any>("system/menu", { params })
}

// 根据 parentId 查询菜单
export const querySystemMenuByParentId = async (parentId: string) => {
  return await getRequest<any>(`system/menu/root/${ parentId }`)
}

// 保存或者更新
export const saveOrUpdateSystemMenu = async (data: any, isUpdate: boolean) => {
  if (isUpdate) {
    return await putRequest<any>(`system/menu/${ data.id }`, data)
  } else {
    return await postRequest<any>(`system/menu`, data)
  }
}

// 删除菜单
export const deleteSystemMenu = async (id: string) => {
  return await deleteRequest<any>(`system/menu/${ id }`)
}

// 查询角色
export const querySystemRole = async (params?: any) => {
  return await getRequest<any>("system/role", { params })
}

// 查询所有角色
export const queryAllSystemRole = async () => {
  return await getRequest<any>("system/role/all")
}

// 查询角色菜单列表
export const querySystemRoleMenuList = async (roleId: string) => {
  return await getRequest<any>(`system/role/${ roleId }/menus`)
}

// 保存或者更新角色
export const saveOrUpdateSystemRole = async (data: any, isUpdate: boolean) => {
  if (isUpdate) {
    return await putRequest<any>(`system/role/${ data.id }`, data)
  } else {
    return await postRequest<any>(`system/role`, data)
  }
}

// 删除角色
export const deleteSystemRole = async (id: string) => {
  return await deleteRequest<any>(`system/role/${ id }`)
}

// 查询用户
export const querySystemUser = async (params?: any) => {
  return await getRequest<any>("system/admin/user", { params })
}

// 保存或者更新用户
export const saveOrUpdateSystemUser = async (data: any, isUpdate: boolean) => {
  if (isUpdate) {
    return await putRequest<any>(`system/admin/user/${ data.id }`, data)
  } else {
    return await postRequest<any>(`system/admin/user`, data)
  }
}

// 获取指定ID系统用户的角色ID列表
export const querySystemUserRoleList = async (userId: string) => {
  return await getRequest<any>(`system/admin/user/${ userId }/roles`)
}

// 删除用户
export const deleteSystemUser = async (id: string) => {
  return await deleteRequest<any>(`system/admin/user/${ id }`)
}
