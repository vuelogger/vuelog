<template>
  <div class="category">
    Category

    <NuxtLink to="/post/vue">List</NuxtLink>
    <NuxtLink to="/post/vue/slug">Content</NuxtLink>
    <!-- Inpa님 블로그처럼 카테고리 표시 -->
    <!-- 라라벨 블로그처럼 최신 글 10개 히스토리처럼 표시 -->
  </div>
</template>

<script>
export default {
  async fetch() {
    const id = this.$route.params.id;

    // const post = await this.$axios.get("/api/post", id);
    // console.log(post);
  },
};
</script>

<style></style>
