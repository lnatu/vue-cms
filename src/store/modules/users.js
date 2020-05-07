const axios = require('axios');

const state = {
  users: null,
  user: null
};

const getters = {
  getAllUsers(state) {
    return state.users;
  },
  getUser(state) {
    return state.user;
  }
};

const mutations = {
  setAllUsers(state, payload) {
    state.users = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};

const actions = {
  fetchUsers({ commit }) {
    // Do stuff
    commit('setShowLoading', true);
    axios
      .get('/api/v1/users')
      .then(res => {
        const users = res.data.data.users;
        commit('setAllUsers', users);
        commit('setShowLoading', false);
      })
      .catch(err => console.log(err));
  },
  fetchUser({ commit }, payload) {
    commit('setShowLoading', true);
    axios
      .get(`/api/v1/users/${payload}`)
      .then(res => {
        const user = res.data.data.user;
        commit('setUser', user);
        commit('setShowLoading', false);
      })
      .catch(err => console.log(err));
  },
  createUser({ commit }, payload) {
    return axios
      .post('/api/v1/users', payload)
      .then(res => {
        return res.data.data.user._id;
      })
      .catch(err => console.log(err));
  },
  deleteUser({ commit }, payload) {
    return axios
      .delete(`/api/v1/users/${payload}`, { data: { isActive: false } })
      .then(res => {
        return true;
      })
      .catch(err => console.log(err));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
