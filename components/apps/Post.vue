<template>
  <main class="post">
    <AppsPostSidebar />
    <AppsPostList v-if="postMode === 'list'" />
    <AppsPostContent v-else />
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("post", ["postMode"]),
  },
  fetch() {
    this.$store.dispatch("post/getCategories");
  },
  updated() {
    this.$el.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/mixins.scss";
.post {
  background-color: white;
}
@include mobile {
  .post {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
