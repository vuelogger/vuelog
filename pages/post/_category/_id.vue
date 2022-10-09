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
    const postId = params?.id;

    if (postId) {
      store.commit("apps/updatePostMode", "content");
    } else if (category) {
      store.commit("apps/updatePostMode", "list");
    }
    // TODO: post 를 open 상태로 만들기
  },
};
</script>
