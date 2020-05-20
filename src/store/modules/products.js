const axios = require('axios');

const state = {
  products: [],
  product: null
};

const getters = {
  getAllProducts(state) {
    return state.products;
  },
  getProduct(state) {
    return state.product;
  }
};

const mutations = {
  setAllProducts(state, payload) {
    state.products = payload;
  },
  setProduct(state, payload) {
    state.product = payload;
  }
};

const actions = {
  async fetchAllProducts({ commit }) {
    commit('setShowLoading', true);
    try {
      const response = await axios.get('/api/v1/products');
      const products = response.data.data.products;
      commit('setAllProducts', products);
      commit('setShowLoading', false);
    } catch (err) {
      console.log(err.response);
    }
  },
  async createProduct({ commit }, payload) {
    commit('setShowLoading', true);
    try {
      await axios.post('/api/v1/products', payload);
      commit('setShowLoading', false);
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
