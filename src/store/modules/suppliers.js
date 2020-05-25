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
    return await axios.get(`/api/v1/suppliers/${payload}`);
  },
  async createSupplier({ commit }, payload) {
    return await axios.post('/api/v1/suppliers', payload);
  },
  async updateSupplier({ commit }, { id, supplier }) {
    return await axios.patch(`/api/v1/suppliers/${id}`, supplier);
  },
  async deleteSupplier({ commit }, supplierId) {
    return await axios.delete(`/api/v1/suppliers/${supplierId}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
