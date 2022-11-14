<template>
  <div></div>
</template>

<script>
export default {
  asyncData({ route, store }) {
    const params = route?.params;
    const category = params?.category;
    const slug = params?.slug;
    let mode = "category";
    if (slug) {
      mode = "content";
      // nuxtlink와 같이 사용할 때
      // 이동 전의 $route.params 값을 가지고 있어서 api 불러오기 어렵다.
      // nuxtlink는 client side 에서 동작하기 때문
    } else if (category) {
      mode = "list";
    }
    store.commit("apps/updatePostMode", mode);
    store.commit("apps/open", "Post");
  },
};
</script>
