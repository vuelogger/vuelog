<template>
  <div class="category">
    <header>
      <CanvasAnimation class="canvas" />
      <TypingAni class="typing" />
      <p class="desc">언덕에 움직이는 카테고리들을 클릭해보세요~!</p>
    </header>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.get("/api/categories");
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/mixins.scss";

.category {
  height: 100%;
  overflow: auto;
  header {
    position: relative;
    height: 100%;
    padding: 10rem;
    box-sizing: border-box;

    .canvas {
      position: absolute;
    }
    > * {
      position: relative;
    }

    .desc {
      margin-top: 3rem;
      font-size: 1.5rem;
      color: #7d7d7d;
      text-indent: 0.5rem;
    }
  }
}

@include mobile {
  .category {
    header {
      padding: 20% 10%;
    }
  }
}
</style>
