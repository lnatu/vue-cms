const axios = require('axios');

const state = {
  authUser: JSON.parse(localStorage.getItem('user')) || null,
  // authUser: null,
  isLogin: false
};

const getters = {
  getAuthUser(state) {
    return state.authUser;
  },
  getIsLogin(state) {
    return state.isLogin;
  }
};

const mutations = {
  setAuthUser(state, payload) {
    state.authUser = payload;
  },
  setIsLogin(state, payload) {
    state.isLogin = payload;
  }
};

const actions = {
  async login({ commit }, payload) {
    try {
      const response = await axios.post('/api/v1/users/login', payload);
      return response.data.data.user;
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  },
  async logout() {
    try {
      const response = await axios.get('/api/v1/users/logout');
      if (response.data.status === 'success') {
        localStorage.removeItem('user');
        location.reload(true);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
