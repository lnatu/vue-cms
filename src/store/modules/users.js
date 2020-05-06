const axios = require('axios');

const state = {
  users: null
};

const getters = {
  getAllUsers(state) {
    return state.users;
  }
};

const mutations = {
  setAllUsers(state, payload) {
    state.users = payload;
  }
};

const actions = {
  fetchUsers({ commit }) {
    // Do stuff
    axios
      .get('/api/v1/users')
      .then(res => {
        const users = res.data.data.users;
        commit('setAllUsers', users);
      })
      .catch(err => console.log(err));
  },
  createUser({ commit }, payload) {
    axios
      .post('/api/v1/users', payload)
      .then(res => {
        console.log(res);
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
