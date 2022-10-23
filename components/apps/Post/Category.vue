<template>
  <div class="category">
    <header>
      <CanvasAnimation class="canvas" />
      <!-- <TypingAni class="typing" /> -->
      <!-- <p>제 글들을 보러와주셨군요! 어떤 글들이 있는지 한 번 둘러보시겠어요?</p> -->
    </header>

    <!-- Blog or Vue Blog or VueLog -->
    <!-- 배경은 양이 뛰어당기는 그걸로 할까 -->

    <NuxtLink to="/post/vue">List</NuxtLink>
    <NuxtLink to="/post/vue/slug">Content</NuxtLink>
    <!-- Inpa님 블로그처럼 카테고리 표시 -->
    <!-- 라라벨 블로그처럼 최신 글 10개 히스토리까럼 표시 -->
  </div>
</template>

<script>
export default {
  async fetch() {
    // const categories = await this.$axios.get("/api/categories");
    // console.log(categories);
  },
  methods: {
    canvasResize() {},
  },
};
</script>

<style lang="scss" scoped>
.category {
  height: 100%;
  overflow: auto;
  header {
    position: relative;
    height: 100%;

    .canvas {
      position: absolute;
    }
    > * {
      position: relative;
    }
  }

  .typing {
    font-size: 5rem;
  }
}
</style>
