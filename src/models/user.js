import {
  Get,
  Post
} from '@assets/js/ajax'

/** 登录 */
export const login = (params = {}) => {
  return Post('user/login', params, { withCredentials: true })
}

/** 退出 */
export const logout = (params) => {
  return Post('user/logout', params, { withCredentials: true })
}

/** 获取用户信息 */
export const getUser = (params) => {
  return Get('user/getuser', params, { withCredentials: true })
}

/** 获取用户列表 */
export const getList = (params) => {
  return Get('user/list', params, { withCredentials: true })
}
