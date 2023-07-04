import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from 'axios'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登入
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await axios({
      url: '/admin/login',
      method: 'post',
      data: { userName: username, password: password }
    });
    if (res.data.code == 1) {
      commit('SET_TOKEN', res.data.map.token)
      setToken(res.data.map.token)
      return "ok"
    } else {
      return Promise.reject(new Error("登入错误"))
    }
    // return new Promise((resolve, reject) => {
    //   login({ userName: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     console.log(data);
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 获取用户信息
  async getInfo({ commit, state }) {
    const res = await axios({
      url: "/admin/info",
      method: "get",
      params: { token: state.token }
    })
    if (res.data.code == 1) {
      commit('SET_NAME', res.data.map.name)
      commit('SET_AVATAR', res.data.map.avatar)
      return "ok"
    } else {
      return Promise.reject(new Error(res.data.msg))
    }
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     console.log(response);
    //     const { data } = response
    //     console.log(data);
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     console.log("0");
    //     reject(error)
    //   })
    // })
  },

  // 用户退出登入
  async logout({ commit, state }) {
    const res = await axios({
      url: "/admin/logout",
      method: "post",
    })
    if (res.data.code == 1) {
      removeToken()
      resetRouter() // 重置路由
      return "ok"
    } else {
      return Promise.reject(new Error("失败"))
    }
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 删除令牌 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

