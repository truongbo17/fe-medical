import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState({
      key: "bomedical",
      storage: window.sessionStorage,
    }),
  ],
  state: {
    authenticated: false,
    userInfo: {},
  },
  getters: {
    getAuth: (state) => state.authenticated,
    getUserInfo: (state) => state.userInfo,
  },
  mutations: {
    SET_AUTH: (state, auth) => (state.authenticated = auth),
    SET_USERINFO: (state, data) => (state.userInfo = data),
  },
  actions: {
    setAuth: ({ commit }, auth) => commit("SET_AUTH", auth),
    setUserInfo: ({ commit }, data) => commit("SET_USERINFO", data),
  },
  modules: {},
});
