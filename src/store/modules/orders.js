const axios = require('axios');

const state = {
  orders: [],
  order: null
};

const getters = {
  getAllOrders(state) {
    return state.orders;
  },
  getOrder(state) {
    return state.order;
  }
};

const mutations = {
  setAllOrders(state, payload) {
    state.orders = payload;
  },
  setOrder(state, payload) {
    state.order = payload;
  }
};

const actions = {
  async fetchAllOrders({ commit }) {
    commit('setShowLoading', true);
    try {
      const response = await axios.get('/api/v1/orders');
      const orders = response.data.data.orders;
      commit('setAllOrders', orders);
      commit('setShowLoading', false);
    } catch (err) {
      console.log(err.response);
      commit('setShowLoading', false);
    }
  },
  async fetchOrder({ commit }, payload) {
    commit('setShowLoading', true);
    try {
      const response = await axios.get(`/api/v1/orders/${payload}`);
      const order = response.data.data.order;
      commit('setOrder', order);
      commit('setShowLoading', false);
    } catch (err) {
      console.log(err.response);
      commit('setShowLoading', false);
    }
  },
  async createOrder({ commit }, payload) {
    return await axios.post('/api/v1/orders/', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
