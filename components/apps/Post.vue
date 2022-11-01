<template>
  <main class="post">
    <AppsPostCategory v-if="postMode === 'category'" />
    <AppsPostList v-else-if="postMode === 'list'" />
    <AppsPostContent v-else-if="postMode === 'content'" />
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("apps", ["postMode"]),
  },
  async fetch() {
    await this.$store.dispatch("post/getCategories");
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
