import {
  Get,
  Post,
  Delete,
  Put,
  realUrl
} from '@assets/js/ajax'

/** 贴子列表 */
export const postList = (params = {}) => {
  return Get('api/posts', params)
}

/** 贴子新增 */
export const postAdd = (params = {}) => {
  return Post('api/posts', params)
}

/** 贴子删除 */
export const postDel = (params = {}) => {
  return Delete('api/posts', params)
}

/** 贴子详情 */
export const getDetail = (params = {}) => {
  return Get('api/posts', params, { resetfull: true })
}
/** 贴子详情 */
export const postEdit = (params = {}) => {
  return Put('api/posts', params, { resetfull: true })
}

export const uploadUrl = realUrl('api/upload')
