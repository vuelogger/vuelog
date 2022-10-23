<template>
  <canvas :width="width" :height="height"></canvas>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,

      appHead: 0,
    };
  },
  computed: {
    width() {
      return this.$store.state.apps.apps.Post.w - 2; // border (1)
    },
    height() {
      return this.$store.state.apps.apps.Post.h - this.appHead - 2; // border (1)
    },
  },
  watch: {
    width() {
      this.resize();
    },
    height() {
      this.resize();
    },
  },
  methods: {
    resize() {
      this.$canvasResize(this.width, this.height);
    },
    draw() {
      this.$drawHillAni(this.ctx);
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.draw();
    },
  },
  created() {
    this.appHead = this.$getScssLength("appHeadHeight");
    this.$initHills(this.width, this.height);
  },
  mounted() {
    this.ctx = this.$el.getContext("2d");
    this.$initChars(this.width);

    this.animate();
  },
};
</script>

<style lang="scss" scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d5f3ff;
}
</style>
