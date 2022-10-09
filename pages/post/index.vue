<template>
  <div></div>
</template>
<script>
export default {
  async asyncData({ route, store }) {
    const params = await route?.params;
    const category = params?.category;
    const postId = params?.id;

    if (!postId && !category) {
      store.commit("apps/updatePostMode", "category");
    }

    // const params = route.params || {};
    // let category = params ? params.category : "";
    // let postId = params ? params.id : null;
    // const url = process.env.VERCEL_URL + "/post/" + category + "/" + postId;
    // await store.dispatch("notion/getPost", postId);
    // return { url, post: store.state.notion.post };
  },
};
</script>
