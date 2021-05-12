<template>
  <div
    class="modal fade"
    id="newBookmarkModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">New Bookmark</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Title" v-model="title" />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Url" v-model="url" />
          </div>
          <div class="form-group">
            <select class="form-control mr-1" tabindex="12" v-model="selectedCategory">
              <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category._id"
              >{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <vue-tags-input
              style="width:100% !important; max-width:none"
              :add-on-key="[',']"
              v-model="tag"
              :tags="tags"
              @tags-changed="newTags => {tags = newTags;}"
            />
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
import BookmarkService from "../../../services/bookmark";
import VueTagsInput from "@johmun/vue-tags-input";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      title: "",
      url: "",
      selectedCategory: "",
      tag: "",
      tags: [],
    };
  },

  methods: {
    async save() {
      let tags = this.tags.map((x) => x.text);

      await BookmarkService.addBookmark({
        dashboard: this.currentDashboard,
        category: this.selectedCategory,
        url: this.url,
        title: this.title,
        tags: tags,
      });

      this.$bus.$emit("fetchBookmarks");
    },
  },

  computed: {
    ...mapGetters({
      categories: "getCategories",
      currentDashboard: "getCurrentDashboard",
    }),
  },

  watch: {
    categories: function () {
      this.selectedCategory =
        this.categories != null && this.categories.length != 0
          ? this.categories[0]._id
          : null;
    },
  },
};
</script>