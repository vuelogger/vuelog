<template>
  <div class="list">
    <NuxtLink to="/post/">Category</NuxtLink>

    <NuxtLink to="/post/vue/slug">Content</NuxtLink>
    <ul>
      <li v-for="post of posts" :key="post.slug">
        <NuxtLink :to="`/post/${post.category}/${post.slug}`">
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("post", ["posts"]),
  },
};
</script>
