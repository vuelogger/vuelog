<template>
  <canvas :width="width" :height="height" @click="click"></canvas>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      HillAni: null,
      appHead: 0,
    };
  },
  computed: {
    width() {
      if (this.$device.isMobileOrTablet) {
        return window ? window.innerWidth : 500;
      } else {
        return this.$store.state.apps.apps.Post.w - 2; // border (1)
      }
    },
    height() {
      if (this.$device.isMobileOrTablet) {
        return window ? window.innerHeight : 500;
      } else {
        return this.$store.state.apps.apps.Post.h - this.appHead - 2; // border (1)
      }
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
    click(e) {
      const name = this.HillAni.click(this.ctx, e.offsetX, e.offsetY);
      if (name) {
        this.$router.push(`/post/${name}`);
        this.$store.dispatch("post/getPosts", name);
      }
    },
    resize() {
      this.HillAni.resize(this.width, this.height);
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.HillAni.draw(this.ctx);
    },
  },
  created() {
    this.appHead = this.$getScssLength("appHeadHeight");
  },
  mounted() {
    this.ctx = this.$el.getContext("2d");
    this.HillAni = new this.$HillAni(this.width, this.height);

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
