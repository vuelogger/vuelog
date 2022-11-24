<template>
  <div class="pagination">
    <button class="arrow first" @click="toFirst" :disabled="page === 0">
      <img src="@/assets/images/ico/double-left-arrow.svg" />
    </button>
    <button class="arrow prev" @click="toPrev" :disabled="page === 0">
      <img src="@/assets/images/ico/left-arrow.svg" />
    </button>
    <button
      v-for="i of pages"
      :key="i"
      class="number"
      :class="{ active: i === page }"
      @click="setPage(i)"
    >
      {{ i + 1 }}
    </button>
    <button class="arrow next" @click="toNext" :disabled="page === total - 1">
      <img src="@/assets/images/ico/right-arrow.svg" />
    </button>
    <button class="arrow last" @click="toLast" :disabled="page === total - 1">
      <img src="@/assets/images/ico/double-right-arrow.svg" />
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    pagesInRow: {
      type: Number,
      default: 5,
    },
  },
  watch: {
    page() {
      this.$store.dispatch("post/getPosts", this.category);
    },
  },
  computed: {
    ...mapState("post", ["page", "categories", "pageSize", "category"]),
    total() {
      for (const c of this.categories) {
        if (c.category === this.category) {
          return Math.ceil(c.count / this.pageSize);
        }
      }
      return 0;
    },
    pages() {
      const half = Math.floor(this.pagesInRow / 2);
      let start = this.page - half;
      let end = this.page + half;
      if (start < 0) {
        start = 0;
        end = start + this.pagesInRow - 1;
      }
      if (end >= this.total) {
        end = this.total - 1;
        start = end - this.pagesInRow + 1;
      }
      if (start < 0) {
        start = 0;
      }
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    },
  },
  methods: {
    setPage(i) {
      this.$store.commit("post/setPage", i);
    },
    toFirst() {
      this.$store.commit("post/setPage", 0);
    },
    toPrev() {
      if (this.page - 1 >= 0) {
        this.$store.commit("post/setPage", this.page - 1);
      }
    },
    toNext() {
      if (this.page + 1 < this.total) {
        this.$store.commit("post/setPage", this.page + 1);
      }
    },
    toLast() {
      this.$store.commit("post/setPage", this.total);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  width: fit-content;
  margin: 3rem auto;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0 0.5rem;
    color: black;
    cursor: pointer;

    &.active {
      background-color: #617eff;
      color: white;
    }

    &:disabled {
      position: relative;
      opacity: 0.5;
      cursor: auto;
    }

    &.prev {
      margin-right: 1.5rem;
    }

    &.next {
      margin-left: 1.5rem;
    }

    &.arrow {
      background-color: #f0f0f0;
    }
  }
}
</style>
