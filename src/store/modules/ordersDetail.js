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
    return await axios.post('/api/v1/ordersDetail', payload);
  },
  async updateOrderDetail({ commit }, { id, orderDetail }) {
    return await axios.patch(`/api/v1/ordersDetail/${id}`, orderDetail);
  },
  async deleteOrderDetail({commit}, payload) {
    return await axios.delete(`/api/v1/ordersDetail/${payload}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
