<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <DashboardList></DashboardList>
      <CategoryList></CategoryList>
      <BookmarkList></BookmarkList>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import DashboardList from './DashboardList';
import CategoryList from './CategoryList.vue';
import BookmarkList from './BookmarkList.vue';

export default {
  components: {
    Navbar,
    DashboardList,
    CategoryList,
    BookmarkList,
  },
};
</script>