const axios = require('axios');

const state = {
  categories: [],
  category: null
};

const getters = {
  getAllCategories(state) {
    return state.categories;
  },
  getCategory(state) {
    return state.category;
  }
};

const mutations = {
  setAllCategories(state, payload) {
    state.categories = payload;
  },
  setCategory(state, payload) {
    state.category = payload;
  }
};

const actions = {
  async fetchAllCategories({ commit }, params) {
    return await axios.get('/api/v1/categories', { params });
  },
  async fetchCategory({ commit }, payload) {
    return await axios.get(`/api/v1/categories/${payload}`);
  },
  async createCategory({ commit }, payload) {
    return await axios.post('/api/v1/categories', payload);
  },
  async updateCategory({ commit }, { id, category }) {
    return await axios.patch(`/api/v1/categories/${id}`, category);
  },
  async deleteCategory({ commit }, payload) {
    return await axios.delete(`/api/v1/categories/${payload}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
