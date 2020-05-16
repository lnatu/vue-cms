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
  async createGroup({ commit }, payload) {
    commit('setShowLoading', true);
    try {
      await axios.post('/api/v1/groups', payload);
      commit('setShowLoading', false);
    } catch (err) {
      console.log(err);
      commit('setShowLoading', false);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
