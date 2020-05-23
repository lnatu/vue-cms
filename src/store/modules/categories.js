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
  async fetchAllCategories() {
    try {
      return await axios.get('/api/v1/categories');
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