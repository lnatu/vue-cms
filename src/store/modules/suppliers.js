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
  async fetchAllSuppliers() {
    try {
      return await axios.get('/api/v1/suppliers');
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
