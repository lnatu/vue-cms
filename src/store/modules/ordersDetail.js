const axios = require('axios');

const state = {
  ordersDetail: [],
  orderDetail: null
};

const getters = {
  getAllOrdersDetail(state) {
    return state.ordersDetail;
  },
  getOrderDetail(state) {
    return state.orderDetail;
  }
};

const mutations = {
  setAllOrdersDetail(state, payload) {
    state.ordersDetail = payload;
  },
  setOrderDetail(state, payload) {
    state.orderDetail = payload;
  }
};

const actions = {
  async createOrderDetail({ commit }, payload) {
    try {
      return await axios.post('/api/v1/ordersDetail', payload);
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
