<template>
  <div
    class="modal fade"
    id="manageDashboardModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Manage Dashboard</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" v-model="name" />
          </div>
          <div class="form-group">
            <slider-picker v-model="color" style="width:100%" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="edit()">Save changes</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteDashboard()">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardService from "../../../services/dashboard";
import { Slider } from "vue-color";
import { mapGetters } from "vuex";

export default {
  components: {
    "slider-picker": Slider,
  },
  data() {
    return {
      name: "",
      color: "",
    };
  },

  methods: {
    async edit() {
      let dashboard = {
        name: this.name,
        color: this.color.hex == undefined ? this.color : this.color.hex,
      };
      await DashboardService.editDashboard(this.currentDashboard, dashboard);
      this.$bus.$emit("fetchDashboards");
    },

    async deleteDashboard() {
      await DashboardService.deleteDashboard(this.currentDashboard);
      this.$bus.$emit("quitDashboard");
    },
  },

  mounted() {
    this.$bus.$on("editDashboard", async () => {
      const dashboard = (
        await DashboardService.getDashboard(this.currentDashboard)
      ).data;
      Object.assign(this.$data, dashboard);
    });
  },

  computed: {
    ...mapGetters({ currentDashboard: "getCurrentDashboard" }),
  },
};
</script>