import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUser
} from '@models/user'
import {
  API_CODE
} from '@config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    route: {}, // 当前路由
    menus: [], // 菜单集
    user: {} // 当前登录用户
  },

  mutations: {
    // 赋值菜单集
    setMenus (state, p) {
      state.menus = p
    },
    // 赋值当前登录用户
    setUser (state, p) {
      window.Raven && window.Raven.setUserContext({
        id: p.uid,
        username: p.userName,
        email: p.userName + '@' + p.uid,
        realName: p.realName
      })
      state.user = p
    },
    // 赋值当前路由
    setRoute (state, p) {
      state.route = p
    }
  },

  actions: {
    // 同步赋值用户
    setUser (context) {
      return getUser().then(({
        retCode,
        retData
      }) => {
        if (retCode === API_CODE.SUCCESS) {
          retData.user.face = require('@assets/img/logo.png')
          context.commit('setUser', retData.user)

          context.commit('setMenus', retData.menus)
        }
      }).catch((err) => {
        window.badjs && window.badjs.push(err)
      })
    }
  }
})
