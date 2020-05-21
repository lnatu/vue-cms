import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import categories from './modules/categories';
import groups from './modules/groups';
import products from './modules/products';
import users from './modules/users';
import suppliers from './modules/suppliers';
import orders from './modules/orders';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    common,
    categories,
    groups,
    users,
    suppliers,
    products,
    orders
  }
});
