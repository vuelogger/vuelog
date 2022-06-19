<template>
  <aside class="m-post-category">
    <nav
      v-if="categories && categories.length > 0"
      class="m-post-category__list"
    >
      <button
        class="item"
        v-for="c of categories"
        :key="c.category"
        @click="clickCategory(c.oriCategory, c.category)"
      >
        <img
          class="item__img"
          :src="
            require(`~/assets/images/desktop/windows/post/${c.oriCategory}.png`)
          "
          alt=""
        />
        <span class="item__category">{{ c.oriCategory }}</span>
        <span class="item__count">{{ c.count }}</span>
        <img class="item__arrow" src="~/assets/images/ico/right_arrow.svg" />
      </button>
    </nav>
    <div v-else class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("notion", ["categories", "category", "pageSize", "posts"]),
  },
  methods: {
    clickCategory(oriCategory, category) {
      this.$emit("clickCategory", { oriCategory, category });
    },
  },
};
</script>
