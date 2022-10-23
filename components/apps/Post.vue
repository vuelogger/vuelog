<template>
  <main class="post" style="background-color: white">
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
};
</script>
