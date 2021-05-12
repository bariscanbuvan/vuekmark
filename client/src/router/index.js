import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import HomePage from '../components/index/Index.vue'
import LoginPage from '../components/account/Login.vue'
import Register from '../components/account/Register'
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, meta: { title: 'Bookmarks' } },
    { path: '/login', component: LoginPage, meta: { title: 'Login' } },
    {
      path: '/logout', component: LoginPage, beforeEnter: (to, from, next) => {
        store.dispatch('logOut')
        next('/login')
      }
    },
    { path: '/register', component: Register, meta: { title: 'Register' } },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let token = store.getters.getToken;
  let publicPages = ['/login', '/register'];
  let isAuthRequired = !publicPages.includes(to.path);

  if (!token && isAuthRequired)
    return next('/login');

  next();
})