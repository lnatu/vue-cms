const axios = require('axios');

const state = {
  purchasesDetail: null,
  purchaseDetail: null
};

const getters = {
  getAllPurchasesDetail(state) {
    return state.purchasesDetail;
  },
  getPurchaseDetail(state) {
    return state.purchaseDetail;
  }
};

const mutations = {
  setAllPurchasesDetail(state, payload) {
    state.purchasesDetail = payload;
  },
  setPurchaseDetail(state, payload) {
    state.purchaseDetail = payload;
  }
};

const actions = {
  async createPurchasesDetail({ commit }, payload) {
    return await axios.post('/api/v1/purchasesDetail', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
