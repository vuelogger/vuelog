<template>
  <main>
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

<style lang="scss">
main {
  background-color: white;
}
a {
  font-size: 3rem;
}
</style>
