<template>
  <section class="app-list">
    <div class="app-list__item" v-for="name of names" :key="name">
      <MobileApp :name="name" />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("app", ["names"]),
  },
  fetch() {
    if (this.$route.path.startsWith("/post")) {
      this.$store.dispatch("app/openApp", "Post");
    }
  },
};
</script>
