<template>
  <header :style="{ height: height + 'px' }">
    <CanvasAnimation class="canvas" />
    <TypingAni class="typing" />
    <p class="desc">아래에서 글들을 살펴보세요!</p>

    <ScrollMouse class="mouse" />
  </header>
</template>

<script>
export default {
  data() {
    return {
      appHead: 0,
    };
  },
  computed: {
    height() {
      if (this.$device.isMobileOrTablet) {
        return window ? window.innerHeight - this.appHead : 500;
      } else {
        return this.$store.state.apps.apps.Post.h - this.appHead - 2; // border (1)
      }
    },
  },

  created() {
    if (this.$device.isMobileOrTablet) {
      this.appHead = this.$getScssLength("mobileHeaderHeight");
    } else {
      this.appHead = this.$getScssLength("appHeadHeight");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/mixins";
header {
  position: relative;
  height: 100%;
  padding: 10rem 8rem;
  box-sizing: border-box;

  .canvas {
    position: absolute;
  }
  > * {
    position: relative;
  }

  .desc {
    margin-top: 3rem;
    font-size: 2rem;
    color: #555;
    text-indent: 0.5rem;
  }

  .mouse {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
}
@include mobile {
  header {
    padding: 10rem 4rem;
  }
}
</style>
