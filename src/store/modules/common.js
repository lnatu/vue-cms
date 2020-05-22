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
  },
  removeAuth(state) {
    state.authUser = null;
    state.isLogin = false;
    localStorage.removeItem("user");
  }
};

export default {
  state,
  getters,
  mutations
};
