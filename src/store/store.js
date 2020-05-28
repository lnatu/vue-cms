import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import auth from './modules/auth';
import categories from './modules/categories';
import groups from './modules/groups';
import products from './modules/products';
import users from './modules/users';
import suppliers from './modules/suppliers';
import orders from './modules/orders';
import ordersDetail from './modules/ordersDetail';
import purchases from './modules/purchases';
import purchasesDetail from './modules/purchasesDetail';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    common,
    auth,
    categories,
    groups,
    users,
    suppliers,
    products,
    orders,
    ordersDetail,
    purchases,
    purchasesDetail
  }
});
