import {
  Get,
  Post
} from '@assets/js/ajax'

/** 登录 */
export const login = (params = {}) => {
  return Post('user/login', params, { withCredentials: false })
}

/** 退出 */
export const logout = (params) => {
  return Post('user/logout', params, { withCredentials: false })
}

/** 获取用户信息 */
export const getUser = (params) => {
  return Get('user/getuser', params, { withCredentials: false })
}
