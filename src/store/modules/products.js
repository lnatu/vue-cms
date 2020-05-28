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
  async fetchAllProducts({ commit }, params) {
    return await axios.get('/api/v1/products', { params });
  },
  async fetchProduct({ commit }, payload) {
    return await axios.get(`/api/v1/products/${payload}`);
  },
  async createProduct({ commit }, payload) {
    return await axios.post('/api/v1/products', payload);
  },
  async deleteProduct({ commit }, payload) {
    return await axios.delete(`/api/v1/products/${payload}`);
  },
  async updateProduct({ commit }, { id, product }) {
    return await axios.patch(`/api/v1/products/${id}`, product);
  },
  async updateProductQuantity({ commit }, { id, quantity }) {
    return await axios.patch(`/api/v1/products/updateQuantity/${id}`, { quantity });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
