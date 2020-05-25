const axios = require('axios');

const state = {
  suppliers: [],
  supplier: null
};

const getters = {
  getAllSuppliers(state) {
    return state.suppliers;
  },
  getSupplier(state) {
    return state.supplier;
  }
};

const mutations = {
  setAllSuppliers(state, payload) {
    state.suppliers = payload;
  },
  setSupplier(state, payload) {
    state.supplier = payload;
  }
};

const actions = {
  async fetchAllSuppliers({ commit }, payload) {
    try {
      return await axios.get('/api/v1/suppliers', { params: payload });
    } catch (err) {
      console.log(err.response);
    }
  },
  async fetchSupplier({ commit }, payload) {
    commit('setShowLoading', true);
    try {
      const response = await axios.get(`/api/v1/suppliers/${payload}`);
      const supplier = response.data.data.supplier;
      commit('setSupplier', supplier);
      commit('setShowLoading', false);
    } catch (err) {
      console.log(err.response);
      commit('setShowLoading', false);
    }
  },
  async createSupplier({ commit }, payload) {
    try {
      const response = await axios.post('/api/v1/suppliers', payload);
      return response.data.data.supplier._id;
    } catch (err) {
      console.log(err.response);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
