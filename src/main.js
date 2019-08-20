import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 应用配置
import { APP_CONFIG, ENV, WORK_COMPANY, API_DOMAIN } from '@config/index'
// 过滤器
import { filters } from '@assets/js/filters'

// 使用elementUI
import ElementUI from 'element-ui'

// 接口返回状态定义
import { API_CODE } from '@config/api'
// timeout promise
import { timeout } from '@assets/js/tools'

import { Get as httpGet, Post as httpPost, Jsonp as httpJsonp, loadScript as httpLoadScript } from '@assets/js/ajax'
import STORE from './store'
// bus event
import BUS from '@assets/js/bus'
import '@assets/css/common.scss'
Vue.config.productionTip = false
Vue.prototype.$config = {
  APP_CONFIG,
  ENV,
  WORK_COMPANY,
  API_DOMAIN
}
let win = window
for (let k in filters) {
  Vue.filter(k, filters[k])
}
Vue.use(ElementUI)
Vue.prototype.$api_code = API_CODE

Vue.prototype.$timeout = timeout
// ajax常见方法代理
Vue.prototype.$http = {
  get: httpGet,
  post: httpPost,
  jsonp: httpJsonp,
  loadScript: httpLoadScript
}
Vue.prototype.$store = STORE
Vue.prototype.$bus = BUS

Vue.prototype.$per_width = 16 // 每个全角字符的宽度

Vue.prototype.$staticDomain = win.staticDomain

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err)
}
Vue.config.warnHandler = (msg, vm, trace) => {
  console.log(msg)
}
new Vue({
  router,
  STORE,
  render: h => h(App)
}).$mount('#app')
