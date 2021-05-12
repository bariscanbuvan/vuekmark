 <template>
  <div class="col-md-12">
    <div class="row m-5">
      <a
        class="btn m-1"
        :class="isDark?'text-white shadow':'text-dark'"
        :style="{borderColor: dashboard.color}"
        v-for="dashboard in dashboards"
        v-on:click="dashboardClick(dashboard._id, dashboard.color)"
        :id="dashboard._id"
      >
        {{dashboard.name}}
        <!--  <span class="badge badge-light">{{dashboard.user.length}}</span> -->
      </a>
    </div>
  </div>
</template>

<script>
import DashboardService from '../../services/dashboard';
import { mapActions, mapGetters } from 'vuex';
export default {
  methods: {
    dashboardClick(dashboardId, color) {
      this.setCurrentDashboard(dashboardId);
      this.$bus.$emit('fetchCategories').$emit('fetchBookmarks');

      this.setColor(color);
    },
    async init() {
      this.setDashboards(
        (await DashboardService.getDashboards()).data
      );
      if (this.dashboards.length > 0) {
        this.setCurrentDashboard(this.dashboards[0]._id);
        this.setColor(this.dashboards[0].color);
      }
      this.$bus.$emit('fetchCategories').$emit('fetchBookmarks');
    },
    ...mapActions(['setCurrentDashboard', 'setColor', 'setDashboards']),
  },

  async mounted() {
    this.init();

    this.$bus.$on('joinDashboard', async () => {
      this.setCurrentDashboard(null);
      this.setDashboards(
        (await DashboardService.getDashboards()).data
      );
    });

    this.$bus.$on('quitDashboard', async () => {
      this.setCurrentDashboard(null);
      this.init();
    });

    this.$bus.$on('fetchDashboards', async () => {
      this.setCurrentDashboard(null);
      this.setDashboards(
        (await DashboardService.getDashboards()).data
      );

      if (this.dashboards.length > 0) {
        this.setCurrentDashboard(this.dashboards[0]._id);
      }
    });
  },

  computed: {
    ...mapGetters({
      currentDashboard: 'getCurrentDashboard',
      dashboards: 'getDashboards',
      isDark: 'isDarkTheme',
    }),
  },
};
</script>


