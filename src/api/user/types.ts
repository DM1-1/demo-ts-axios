export interface LoginData {
  username: string,
  password: string
}

export interface LoginRes {
  token: string
}

export interface UserInfos {
  id: string,
  username: string,
  avatar: string,
}