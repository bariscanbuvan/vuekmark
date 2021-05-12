<template>
  <div
    class="modal fade"
    id="newCategoryModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">New Category</h5>
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
import CategoryService from "../../../services/category";
import { Slider } from "vue-color";
import { mapGetters } from "vuex";

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
      await CategoryService.addCategory({
        name: this.name,
        color: this.color.hex,
        dashboard: this.currentDashboard,
      });
      this.$bus.$emit("fetchCategories");
    },
  },

  computed: {
    ...mapGetters({ currentDashboard: "getCurrentDashboard" }),
  },
};
</script>