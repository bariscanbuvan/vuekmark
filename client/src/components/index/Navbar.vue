<template>
  <nav
    class="navbar navbar-expand-lg"
    :class="[isDark? 'dark navbar-dark':'navbar-light']"
    :style="{borderBottom: '1px solid '+color}"
  >
    <a class="navbar-brand" href="/">Bookmark</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            data-toggle="modal"
            data-target="#newBookmarkModal"
            v-if="categories.length > 0"
          >Add Bookmark</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            data-toggle="modal"
            data-target="#newDashboardModal"
          >New Dashboard</a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            data-toggle="modal"
            data-target="#manageDashboardModal"
            v-on:click="$bus.$emit('editDashboard')"
            v-if="currentDashboard != null"
          >Manage Dashboard</a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            data-toggle="modal"
            data-target="#newCategoryModal"
            v-if="currentDashboard != null"
          >Add Category</a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            data-toggle="modal"
            data-target="#manageCategoryModal"
            v-on:click="$bus.$emit('editCategory')"
            v-if="currentCategory"
          >Manage Category</a>
        </li>
      </ul>
    </div>
    <span class="navbar-text mr-4">
      <div class="input-group">
        <div class="input-group-prepend">
          <button
            class="btn btn-outline-secondary"
            type="button"
            title="Joins the dashboard that is copied to the corresponding textbox"
            v-on:click="joinDashboard()"
          >Join</button>
        </div>

        <input
          type="text"
          class="form-control float-right"
          placeholder="Dashboard ID"
          v-model="dashboardId"
        />

        <div class="input-group-append" id="button-addon4">
          <button
            class="btn btn-outline-secondary"
            type="button"
            title="Quits from the current dashboard"
            v-if="currentDashboard != null"
            v-on:click="quitDashboard()"
          >Quit</button>
        </div>
      </div>
    </span>

    <span class="navbar-text">
      <router-link to="/logout">Logout</router-link>
    </span>

    <NewBookmark></NewBookmark>
    <NewDashboard></NewDashboard>
    <NewCategory></NewCategory>
    <ManageDashboard></ManageDashboard>
    <ManageCategory></ManageCategory>
    <ManageBookmark></ManageBookmark>
  </nav>
</template>

<script>
import NewBookmark from './modals/NewBookmark';
import NewDashboard from './modals/NewDashboard';
import NewCategory from './modals/NewCategory';
import ManageDashboard from './modals/ManageDashboard';
import ManageCategory from './modals/ManageCategory';
import ManageBookmark from './modals/ManageBookmark';
import DashboardService from '../../services/dashboard';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    NewBookmark,
    NewDashboard,
    NewCategory,
    ManageDashboard,
    ManageCategory,
    ManageBookmark,
  },

  data() {
    return {
      dashboardId: '',
    };
  },

  methods: {
    ...mapActions([
      'changeTheme',
      'setCurrentDashboard',
      'setColor',
      'logOut',
      'setCategories',
      'setBookmarks',
      'setDashboards',
    ]),

    async joinDashboard() {
      await DashboardService.joinDashboard(this.dashboardId);
      this.$bus.$emit('joinDashboard');
    },

    async quitDashboard() {
      await DashboardService.quitDashboard(this.dashboardId);

      this.$bus.$emit('quitDashboard');
    },
  },

  computed: {
    ...mapGetters({
      isDark: 'isDarkTheme',
      currentDashboard: 'getCurrentDashboard',
      currentCategory: 'getCurrentCategory',
      categories: 'getCategories',
      dashboards: 'getDashboards',
      color: 'getCurrentColor',
    }),
  },

  watch: {
    currentDashboard(newVal, oldVal) {
      this.dashboardId = newVal;
    },
  },
};
</script>

