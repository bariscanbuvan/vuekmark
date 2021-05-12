import Vuex from 'vuex';
import Vue from 'vue';
import UserService from './services/user';
import ApiService from './services/api';
import { router } from './router/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dashboardId: null,
        dashboards: [],
        categoryId: null,
        categories: [],
        bookmarkId: null,
        bookmarks: [],
        token: localStorage.getItem('accessToken') || '',
        color: {},
        isDark: true,
    },

    getters: {
        isDarkTheme: (state) => {
            return state.isDark;
        },

        getCurrentColor: (state) => {
            return state.color;
        },

        getCurrentDashboard: (state) => {
            return state.dashboardId;
        },

        getCurrentCategory: (state) => {
            return state.categoryId;
        },

        getCurrentBookmark: (state) => {
            return state.bookmarkId;
        },

        getCategories: (state) => {
            return state.categories;
        },

        getDashboards: (state) => {
            return state.dashboards;
        },

        getBookmarks: (state) => {
            return state.bookmarks;
        },

        getToken: (state) => {
            return state.token;
        },
    },

    mutations: {
        updateDashboardId: (state, id) => {
            state.dashboardId = id;
        },
        updateCategoryId: (state, id) => {
            state.categoryId = id;
        },

        updateBookmarkId: (state, id) => {
            state.bookmarkId = id;
        },

        updateToken: (state, token) => {
            state.token = token;
        },

        updateColor: (state, color) => {
            state.color = color;
        },

        updateDashboards: (state, dashboards) => {
            state.dashboards = dashboards;
        },

        updateCategories: (state, categories) => {
            state.categories = categories;
        },

        updateBookmarks: (state, bookmarks) => {
            state.bookmarks = bookmarks;
        },

        clearToken: (state) => {
            state.token = null;
        },

        initialState: (state) => {
            localStorage.removeItem('accessToken');
            state.dashboardId = null,
            state.dashboards = [],
            state.categoryId = null,
            state.categories = [],
            state.bookmarkId = null,
            state.bookmarks = [],
            state.token = ''
            state.color = {},
            state.isDark = true
        },
    },

    actions: {
        setCurrentDashboard({ commit }, id) {
            commit('updateDashboardId', id);
        },

        setCurrentCategory({ commit }, id) {
            commit('updateCategoryId', id);
        },

        setCurrentBookmark({ commit }, id) {
            commit('updateBookmarkId', id);
        },

        setColor({ commit }, color) {
            commit('updateColor', color)
        },

        setDashboards({ commit }, dashboards) {
            commit('updateDashboards', dashboards);
        },

        setCategories({ commit }, categories) {
            commit('updateCategories', categories);
        },

        setBookmarks({ commit }, bookmarks) {
            commit('updateBookmarks', bookmarks);
        },

        clearToken({ commit }) {
            commit('clearToken');
        },

        async doLogin({ commit }, loginData) {
            commit('initialState')
            let token = (await UserService.login(loginData)).data.token;
            localStorage.setItem('accessToken', token);
            commit('updateToken', token);
            ApiService.setHeader();
            router.push('/');

        },

        logOut({ commit }) {
            commit('initialState');
        },

        async doRegister({ commit }, registerData) {

            let token = (await UserService.register(registerData)).data.token
            localStorage.setItem('accessToken', token);
            commit('updateToken', token);
            ApiService.setHeader();
            router.push('/');

        },
    }
});