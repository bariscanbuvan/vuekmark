import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import store from './store';
import { router } from './router/index';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'
import ApiService from './services/api';

Vue.use(VueRouter);
Vue.use(BootstrapVue)

Vue.config.productionTip = false
const bus = new Vue()
Vue.prototype.$bus = bus

if (process.env.VUE_APP_ENVIRONMENT == 'DEV')
  ApiService.init(process.env.VUE_APP_BACKEND);
else
  ApiService.setHeader();

Vue.config.errorHandler = function (err, vm, info) {
  if (err.response) {
    if (err.response.data.message)
      err = err.response.data.message;
    else
      err = err.response.data;
  }

  vm.$bvToast.toast(err.toString(), {
    title: 'Error!',
    variant: 'danger',
    solid: true
  })
}

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
