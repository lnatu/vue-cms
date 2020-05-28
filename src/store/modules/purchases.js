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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
