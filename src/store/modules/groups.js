const axios = require('axios');

const state = {
  groups: [],
  group: null
};

const getters = {
  getAllGroups(state) {
    return state.groups;
  },
  getGroup(state) {
    return state.group;
  }
};

const mutations = {
  setAllGroups(state, payload) {
    state.groups = payload;
  },
  setGroup(state, payload) {
    state.group = payload;
  }
};

const actions = {
  fetchAllGroups({ commit }) {
    commit('setShowLoading', true);
    axios
      .get('/api/v1/groups')
      .then(res => {
        const groups = res.data.data.groups;
        commit('setAllGroups', groups);
        commit('setShowLoading', false);
      })
      .catch(err => console.log(err));
  },
  createGroup({ commit }, payload) {
    commit('setShowLoading', true);
    axios
      .post('/api/v1/groups', payload)
      .then(res => {
        commit('setShowLoading', false);
      })
      .catch(err => console.log(err));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
