<template>
  <div></div>
</template>

<script>
export default {
  asyncData({ route, store }) {
    const params = route?.params;
    const slug = params?.slug;
    let mode = "list";
    if (slug) {
      mode = "content";
    }
    store.commit("post/updatePostMode", mode);
    store.commit("apps/open", "Post");
  },
};
</script>
