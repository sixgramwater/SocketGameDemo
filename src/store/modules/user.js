
const state = {
  user: {},
  token: '',

}

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user;
  },
  UPDATE_TOKEN(state, token) {
    state.token = token;
  }
}

const actions = {
  setUser({ commit }, payload) {
    commit('UPDATE_USER', payload);
  },
  clearUser({ commit }) {
    commit('UPDATE_USER',{})
  },
  setToken({ commit }, payload) {
    commit('UPDATE_TOKEN', payload);
  },
  clearToken({ commit }){
    commit('UPDATE_TOKEN', '');
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}