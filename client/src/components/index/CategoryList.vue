 <template>
  <div class="col-md-12">
    <div class="row m-5">
      <a
        class="btn m-1"
        :class="isDark?'text-white shadow':'text-dark'"
        :style="{borderColor: category.color}"
        v-for="category in categories"
        :id="category._id"
        v-on:click="categoryClick(category._id)"
      >{{category.name}}</a>
    </div>
  </div>
</template>

<script>
import CategoryService from '../../services/category';
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    categoryClick(categoryId) {
      this.setCurrentCategory(categoryId);
      this.$bus.$emit("fetchBookmarks");
    },
    ...mapActions(['setCategories', 'setCurrentCategory']),
  },

  mounted() {
    this.$bus.$on('fetchCategories', async () => {
      this.setCurrentCategory(null);
      if (this.currentDashboard != null)
        this.setCategories(
          (await CategoryService.getCategories(this.currentDashboard)).data
        );
      else this.setCategories([]);
    });
  },

  computed: {
    ...mapGetters({
      categories: 'getCategories',
      currentDashboard: 'getCurrentDashboard',
      isDark: 'isDarkTheme',
    }),
  },
};
</script>

