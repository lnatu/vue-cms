const axios = require('axios');

const state = {
  users: [],
  customers: [],
  user: null
};

const getters = {
  getAllUsers(state) {
    return state.users;
  },
  getAllCustomers(state) {
    return state.customers;
  },
  getUser(state) {
    return state.user;
  }
};

const mutations = {
  setAllUsers(state, payload) {
    state.users = payload;
  },
  setCustomers(state, payload) {
    state.customers = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};

const actions = {
  async fetchUsers({ commit }, payload) {
    // Do stuff
    try {
      commit('setShowLoading', true);
      const res = await axios.get(`/api/v1/users`, { params: payload });
      return res.data;
    } catch (err) {
      console.log(err.response);
      commit('setShowLoading', false);
    }
  },
  async fetchCustomers({ commit }) {
    try {
      return await axios.get('/api/v1/users?role=customer');
    } catch (err) {
      console.log(err.response);
      commit('setShowLoading', false);
    }
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
