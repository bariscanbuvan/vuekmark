<template>
  <div class="row mt-5 mr-5 ml-5">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Search"
      v-model="searchText"
      v-on:input="search()"
      style="
        background: none;
        color: white;
        border: none !important;
        border-bottom: 1px solid #ffffffad !important;
        border-radius: 0;
      "
    />
    <div class="card-columns col-md-12">
      <div
        :id="item._id"
        v-bind:class="[isDark ? 'dark shadow' : '', 'card text-center']"
        v-bind:style="{
          border: 'none',
          borderTop: '1px solid ' + item.category.color,
          borderBottom: '1px solid ' + item.category.color,
        }"
        v-for="item in bookmarks"
        :key="item.id"
        v-on:dblclick="openModal(item._id)"
      >
        <div class="card-body">
          <h5>
            <a
              :href="item.url"
              :class="isDark ? 'text-white' : 'card-title pt-0 text-dark'"
              >{{ item.title }}</a
            >
          </h5>

          <span
            contenteditable="true"
            class="badge mr-1 text-white"
            v-bind:style="{ backgroundColor: item.category.color }"
            v-for="tag in item.tags"
            >{{ tag }}</span
          >
        </div>
        <div
          class="card-footer bg-transparent p-1"
          :style="{ borderTop: '1px solid ' + item.category.color }"
        >
          <small :class="isDark ? 'text-white' : 'text-dark'">{{
            item.created_date.toString().substring(0, 10)
          }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarkService from '../../services/bookmark';
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    openModal(bookmarkId) {
      this.$bus.$emit('editBookmark', bookmarkId);
    },

    ...mapActions(['setBookmarks']),

    async search() {
      if (this.searchText.length > 0) {
        this.setBookmarks(
          (await BookmarkService.searchBookmark(this.searchText)).data
        );
      } else {
         if (this.currentCategory != null)
        this.setBookmarks(
          (await BookmarkService.getBookmarksByCategoryId(this.currentCategory))
            .data
        );
      else if (this.currentDashboard != null)
        this.setBookmarks(
          (
            await BookmarkService.getBookmarksByDashboardId(
              this.currentDashboard
            )
          ).data
        );
      }
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  async mounted() {
    this.$bus.$on('fetchBookmarks', async () => {
      if (this.currentCategory != null)
        this.setBookmarks(
          (await BookmarkService.getBookmarksByCategoryId(this.currentCategory))
            .data
        );
      else if (this.currentDashboard != null)
        this.setBookmarks(
          (
            await BookmarkService.getBookmarksByDashboardId(
              this.currentDashboard
            )
          ).data
        );
      else this.setBookmarks([]);
    });
  },

  computed: {
    ...mapGetters({
      currentCategory: 'getCurrentCategory',
      currentDashboard: 'getCurrentDashboard',
      bookmarks: 'getBookmarks',
      isDark: 'isDarkTheme',
    }),
  },
};
</script>
