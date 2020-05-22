import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import toasted from 'vue-toasted';

import { routes } from './routes/routes';
import { store } from './store/store';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(toasted);

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isLogin = store.getters.getAuthUser;
  if (to.matched.some(m => m.meta.onlyAuthUser)) {
    if (isLogin) {
      next();
    } else {
      next({ name: 'Login' });
      vm.$toasted.show('Please login first', {
        theme: 'bubble',
        position: 'top-center',
        duration: 2000
      });
    }
  } else {
    next();
  }
});

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
