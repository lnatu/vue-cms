const state = {
  showLoading: false
};

const getters = {
  getShowLoading(state) {
    return state.showLoading;
  }
};

const mutations = {
  setShowLoading(state, payload) {
    state.showLoading = payload;
  }
};

export default {
  state,
  getters,
  mutations
};
