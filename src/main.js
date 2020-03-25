import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './store/store';
import App from './App.vue';
import 'vue-material-design-icons/styles.css';


Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
