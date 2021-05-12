<template>
  <div id="app" :class="isDark? 'dark': ''">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters({ isDark: 'isDarkTheme' }),
  },
};
</script>
