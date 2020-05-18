const axios = require('axios');

const state = {
  users: [],
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
  async fetchUsers({ commit }, payload) {
    // Do stuff
    payload ? (payload = `?${payload}`) : '';
    commit('setShowLoading', true);
    /*axios
      .get(`/api/v1/users${payload}`)
      .then(res => {
        const users = res.data.data.users;
        commit('setAllUsers', users);
        commit('setShowLoading', false);
      })
      .catch(err => console.log(err));*/
    const res = await axios.get(`/api/v1/users${payload}`);
    return res.data;
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
      .catch(err => {
        commit('setShowLoading', false);
        console.log(err);
      });
  },
  createUser({ commit }, payload) {
    return axios
      .post('/api/v1/users/signup', payload)
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
