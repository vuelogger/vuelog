<template>
  <div></div>
</template>

<script>
export default {
  // head() {
  //   if (this.post) {
  //     return {
  //       meta: [
  //         {
  //           hid: "twitter:title",
  //           name: "twitter:title",
  //           content: this.post.title,
  //         },
  //         {
  //           hid: "og:title",
  //           name: "og:title",
  //           content: this.post.title,
  //         },
  //         {
  //           hid: "og:image",
  //           property: "og:image",
  //           content: this.post.cover,
  //         },
  //         {
  //           hid: "twitter:image",
  //           name: "twitter:image",
  //           content: this.post.cover,
  //         },
  //         {
  //           hid: "og:url",
  //           property: "og:url",
  //           content: this.url,
  //         },
  //         {
  //           hid: "description",
  //           name: "description",
  //           content: this.post.description,
  //         },
  //         {
  //           hid: "og:description",
  //           property: "og:description",
  //           content: this.post.description,
  //         },
  //         {
  //           hid: "twitter:description",
  //           name: "twitter:description",
  //           content: this.post.description,
  //         },
  //         {
  //           hid: "twitter:card",
  //           name: "twitter:card",
  //           content: "summary_large_image",
  //         },
  //       ],
  //     };
  //   }
  // },
  async asyncData({ route, store }) {
    const params = await route?.params;
    const category = params?.category;
    const slug = params?.slug;

    let mode = "category";
    if (slug) {
      mode = "content";
      // Fetch에 넣고 싶었으나 nuxtlink와 같이 사용할 때
      // 이동 전의 $route.params 값을 가지고 있어서 api 불러오기 어렵다.
      await store.dispatch("post/getPost", route.params.slug);
    } else if (category) {
      mode = "list";
      await store.dispatch("post/getPosts", route.params.category);
    }

    store.commit("apps/updatePostMode", mode);
    store.commit("apps/open", "Post");
  },
};
</script>
