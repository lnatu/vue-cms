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
    commit('setShowLoading', true);
    try {
      const response = await axios.post('/api/v1/products', payload);
      return response.data.data.product._id;
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
