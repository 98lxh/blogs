import { http } from "utils/http"

export interface UserForm {
  nickname: string
  password: string
}

export const userLogin = async (data: UserForm) => {
  return http('/user/login', {
    method: 'POST',
    data
  })
}

export const userLogout = async () => {
  return http('/user/logout', {
    method: 'POST'
  })
}
