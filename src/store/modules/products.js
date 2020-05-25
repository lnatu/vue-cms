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
  async fetchAllProducts() {
    return await axios.get('/api/v1/products');
  },
  async fetchProduct({ commit }, payload) {
    commit('setShowLoading', true);
    try {
      const response = await axios.get(`/api/v1/products/${payload}`);
      const product = response.data.data.product;
      commit('setProduct', product);
      commit('setShowLoading', false);
    } catch (err) {
      console.log(err.response);
      commit('setShowLoading', false);
    }
  },
  async createProduct({ commit }, payload) {
    return await axios.post('/api/v1/products', payload);
  },
  async deleteProduct({ commit }, payload) {
    return await axios.delete(`/api/v1/products/${payload}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
