import { getRequest, postRequest } from "@/utils/request";

export const login = async (data) => {
  return await postRequest<any>('/user/admin1', {}, { params: data })
}

export const textGet = async () => {
  return await getRequest<any>('/user/info')
}
