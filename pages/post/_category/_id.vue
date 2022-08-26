<template>
  <div></div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        { hid: "test", property: "test", content: "Test Title" },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.post.title,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.post.cover,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.post.cover,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.url,
        },
        {
          hid: "description",
          name: "description",
          content: this.post.description,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.post.description,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.post.description,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },
  data() {
    return {
      url: "",
    };
  },
  async asyncData({ route, store }) {
    const params = route.params || {};
    let category = params ? params.category : "";
    let postId = params ? params.id : null;

    const url = process.env.VERCEL_URL + "/post/" + category + "/" + postId;
    await store.dispatch("notion/getPost", postId);

    return { url, post: store.state.notion.post };
  },
};
</script>
