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
  fetchAllGroups({ commit }, params) {
    commit('setShowLoading', true);
    return axios
      .get('/api/v1/groups', params)
      .then(res => {
        const groups = res.data.data.groups;
        commit('setAllGroups', groups);
        commit('setShowLoading', false);
        return groups;
      })
      .catch(err => console.log(err));
  },
  async fetchGroup({ commit }, payload) {
    return await axios.get(`/api/v1/groups/${payload}`);
  },
  async createGroup({ commit }, payload) {
    return await axios.post('/api/v1/groups', payload);
  },
  async editGroup({ commit }, { id, group }) {
    return await axios.patch(`/api/v1/groups/${id}`, group);
  },
  async deleteGroup({ commit }, payload) {
    return await axios.delete(`/api/v1/groups/${payload}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
