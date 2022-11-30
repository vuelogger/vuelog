<template>
  <nav>
    <button class="nav-item" @click="showCategory">
      <img src="@/assets/images/apps/header/category.png" />
    </button>
    <button class="nav-item" @click="toTop">
      <img src="@/assets/images/apps/header/arrow-to-top.png" />
    </button>
  </nav>
</template>

<script>
export default {
  methods: {
    showCategory() {
      this.$store.commit(
        "post/setSidebarShow",
        !this.$store.state.post.sidebarShow
      );
    },
    toTop() {
      document.querySelector(".post").scrollTo(0, 0);
      document.querySelector(".app").scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/mixins.scss";
nav {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;

  &::before {
    content: "";
    width: 1px;
    height: 30%;
    background-color: gray;
  }
  .nav-item {
    height: 60%;
    aspect-ratio: 1;
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;

    &:hover {
      background-color: black;
      filter: invert(1);
    }

    img {
      height: 60%;
    }
  }
}

@include mobile {
  nav {
    .nav-item {
      &:hover {
        background-color: transparent;
        filter: none;
      }
    }
  }
}
</style>
