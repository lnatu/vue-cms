const axios = require('axios');

const state = {
  purchases: null,
  purchase: null
};

const getters = {
  getAllPurchases(state) {
    return state.purchases;
  },
  getPurchase(state) {
    return state.purchase;
  }
};

const mutations = {
  setAllPurchases(state, payload) {
    state.purchases = payload;
  },
  setPurchase(state, payload) {
    state.purchase = payload;
  }
};

const actions = {
  async createPurchases({ commit }, payload) {
    return await axios.post('/api/v1/purchases', payload);
  },
  async fetchAllPurchases({ commit }, params) {
    return await axios.get('/api/v1/purchases', { params });
  },
  async fetchPurchase({ commit }, payload) {
    return await axios.get(`/api/v1/purchases/${payload}`);
  },
  async deletePurchase({ commit }, payload) {
    return await axios.delete(`/api/v1/purchases/${payload}`);
  },
  async updatePurchase({ commit }, { id, purchase }) {
    return await axios.patch(`/api/v1/purchases/${id}`, purchase);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
