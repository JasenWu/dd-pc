import {
  Get,
  Post,
  Delete
} from '@assets/js/ajax'

/** 贴子列表 */
export const postList = (params = {}) => {
  return Get('api/posts', params, { withCredentials: false })
}

/** 贴子新增 */
export const postAdd = (params = {}) => {
  return Post('api/posts', params, { withCredentials: false })
}

/** 贴子删除 */
export const postDel = (params = {}) => {
  return Delete('api/posts', params, { withCredentials: false })
}
