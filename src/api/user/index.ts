import request, { http } from '../../utils/request'

import { LoginData, UserInfos, LoginRes } from './types'

export const login = (data: LoginData) => {
  return http.post<LoginRes>('/user/login', data)
}

export const loginRaw = (data: LoginData): Promise<LoginRes> => {
  return request.post('/user/login', data)
}

export const getUserInfo = () => {
  return http.get<UserInfos>('/user/info')
}