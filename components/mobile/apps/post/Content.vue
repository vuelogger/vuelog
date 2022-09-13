<template>
  <article class="m-post-content">
    <template v-if="post">
      <h1 class="title">{{ post.title }}</h1>

      <div class="info">
        <Tags fontSize="1.6rem" :tags="post.tags" />

        <CopyLink />
      </div>

      <p class="created">
        {{ $moment(post.created).format("LL") }}
      </p>
      <img class="cover" :src="post.cover" v-if="post.cover" />

      <div class="content" v-html="post.body"></div>
    </template>
    <div v-else class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("notion", ["post"]),
  },
};
</script>
