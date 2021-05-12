<template>
  <div
    class="modal fade"
    id="manageBookmarkModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Manage Bookmark</h5>
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
          <button type="button" class="btn btn-primary" v-on:click="edit()">Save changes</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteBookmark()">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let jquery = require("jquery");
import BookmarkService from "../../../services/bookmark";
import CategoryService from "../../../services/category";
import VueTagsInput from "@johmun/vue-tags-input";

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
      categories: [],
      dashboard: "",
      bookmarkId: "",
    };
  },

  methods: {
    async edit() {
      let tags = this.tags.map((x) => x.text);
      let bookmark = {
        dashboard: this.dashboard,
        category: this.selectedCategory,
        url: this.url,
        title: this.title,
        tags: tags,
      };
      await BookmarkService.editBookmark(this.bookmarkId, bookmark);
      this.$bus.$emit("fetchBookmarks");
    },

    async deleteBookmark() {
      await BookmarkService.deleteBookmark(this.bookmarkId);
      this.$bus.$emit("fetchBookmarks");
    },
  },

  mounted() {
    this.$bus.$on("editBookmark", async (bookmarkId) => {
      jquery("#manageBookmarkModal").modal("show");

      this.bookmarkId = bookmarkId;
      let bookmark = (await BookmarkService.getBookmark(bookmarkId)).data;
      this.title = bookmark.title;
      this.url = bookmark.url;
      this.selectedCategory = bookmark.category._id;
      this.tags = bookmark.tags.map((x) => {
        return { text: x };
      });
      this.categories = (
        await CategoryService.getCategories(bookmark.dashboard)
      ).data;
      this.dashboard = bookmark.dashboard;
    });
  },
};
</script>