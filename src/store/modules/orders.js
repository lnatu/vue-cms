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
  async fetchAllOrders({ commit }, params) {
    return await axios.get('/api/v1/orders', { params });
  },
  async fetchOrder({ commit }, payload) {
    return await axios.get(`/api/v1/orders/${payload}`);
  },
  async createOrder({ commit }, payload) {
    return await axios.post('/api/v1/orders/', payload);
  },
  async updateOrder({ commit }, {id, order}) {
    return await axios.patch(`/api/v1/orders/${id}`, order);
  },
  async deleteOrder({ commit }, payload) {
    return await axios.delete(`/api/v1/orders/${payload}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
