import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: null,
    isLogin: !!localStorage.getItem('token'),
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      localStorage.removeItem('token')
      state.isLogin = false
    },
  },
  actions: {
    async login({ commit }, payload) {
      return Promise.resolve({ data: { token: 'token', payload } }).then(
        res => {
          localStorage.setItem('token', res.data.token)
          commit('login')
        }
      )
    },
    async sendCode(_, mobile) {
      return Promise.resolve(mobile)
    },
    logout({ commit }) {
      commit('logout')
    },
  },
  modules: {},
})
