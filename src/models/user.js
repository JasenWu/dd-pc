import {
  Get,
  Post
} from '@assets/js/ajax'

/** 登录 */
export const login = (params = {}) => {
  return Post('user/login', params, { withCredentials: false })
}

/** 第三方授权登录 */
export const oauthLogin = (params = {}) => {
  return Post('oauth/login', params)
}

/** 退出 */
export const logout = () => {
  return Post('login/logout')
}

/** 获取用户信息 */
export const getUser = () => {
  return Get('login/getuser')
}

/** 修改密码 */
export const modifyPwd = (params = {}) => {
  return Post('login/change-oa-password', params)
}

/** 修改域密码 */
export const modifyWindowsPwd = (params = {}, opt) => {
  return Post('login/change-ad-password', params, opt)
}
