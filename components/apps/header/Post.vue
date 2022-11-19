<template>
  <nav>
    <button class="category" @click="click">
      <img src="@/assets/images/apps/header/category.png" />
    </button>
  </nav>
</template>

<script>
export default {
  methods: {
    click() {
      this.$store.commit(
        "post/setSidebarShow",
        !this.$store.state.post.sidebarShow
      );
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
  button {
    height: 60%;
    aspect-ratio: 1;
    margin-left: 2rem;
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
    button {
      &:hover {
        background-color: transparent;
        filter: none;
      }
    }
  }
}
</style>
