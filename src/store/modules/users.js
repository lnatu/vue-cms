const axios = require('axios');

const state = {
  users: [],
  customers: [],
  user: {},
  updatedUserId: ''
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
  },
  getUpdatedUserId(state) {
    return state.updatedUserId;
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
  },
  setUpdatedUserId(state, payload) {
    state.updatedUserId = payload;
  }
};

const actions = {
  async fetchUsers({ commit }, payload) {
    return await axios.get(`/api/v1/users`, { params: payload });
  },
  async fetchCustomers({ commit }) {
    return await axios.get('/api/v1/users/customers');
  },
  async fetchUser({ commit }, payload) {
    return await axios.get(`/api/v1/users/${payload}`);
  },
  async createUser({ commit }, payload) {
    return await axios.post('/api/v1/users/signup', payload);
  },
  async deleteUser({ commit }, payload) {
    return await axios.delete(`/api/v1/users/${payload}`, {
      data: { isActive: false }
    });
  },
  async editUser({ commit }, { id, inputs }) {
    return await axios.patch(`/api/v1/users/${id}`, inputs);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
