<template>
  <div
    class="modal fade"
    id="newDashboardModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">New Dashboard</h5>
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
          <button type="button" class="btn btn-primary" v-on:click="save()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardService from "../../../services/dashboard";
import { Slider } from "vue-color";

export default {
  components: {
    "slider-picker": Slider,
  },

  data() {
    return {
      name: "",
      color: { hex: "#123456" },
    };
  },

  methods: {
    async save() {
      let newDashboard = (
        await DashboardService.addDashboard({
          name: this.name,
          color: this.color.hex,
        })
      ).data;

      this.$bus.$emit("fetchDashboards");
    },
  },
};
</script>