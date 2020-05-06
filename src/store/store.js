import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    getCounter(state) {
      return state.counter;
    }
  },
  mutations: {
    counterUp(state) {
      state.counter++;
    }
  },
  modules: {
    users
  }
});
