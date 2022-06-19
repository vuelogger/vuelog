<template>
  <aside class="m-post-list">
    <div class="m-post-list__body">
      <template v-if="posts && posts.length > 0">
        <div
          class="item"
          v-for="p of posts"
          :key="p.id"
          @click="clickPost(p.id)"
        >
          <div class="item__text">
            <h3 class="title">{{ p.title }}</h3>
            <p class="desc" v-if="p.description">{{ p.description }}</p>
            <strong class="created">{{
              $moment(p.createdAt).format("LL")
            }}</strong>
            <p class="category">{{ p.category }}</p>
          </div>
          <div class="item__image" v-if="p.cover">
            <img :src="p.cover" alt="cover" />
          </div>
        </div>
      </template>
      <div class="loader-wrapper" v-else>
        <div class="loader"></div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["mode"],
  computed: {
    ...mapState("notion", ["posts", "pageSize", "category"]),
  },
  methods: {
    clickPost(id) {
      this.$emit("clickContent", id);
    },
  },
};
</script>

<style></style>
