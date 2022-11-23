<template>
  <div class="app">
    <DynamicComponent :name="name" path="./apps" />
    <div class="footer" @touchstart="touchstart" @touchend="touchend"></div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      startAni: false,
      startPt: [-1, -1],
      endPt: [-1, -1],
    };
  },
  methods: {
    touchstart(e) {
      this.startPt[0] = e.touches[0].clientX;
      this.startPt[1] = e.touches[0].clientY;
      this.startAni = true;
    },
    touchend(e) {
      this.startAni = false;
      const deltaX = e.changedTouches[0].clientX - this.startPt[0];
      const deltaY = e.changedTouches[0].clientY - this.startPt[1];
      console.log(deltaX, deltaY);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";
.app {
  position: fixed;
  top: $mobile-header-height;
  left: 0;
  width: 100%;
  height: calc(100% - #{$mobile-header-height});
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;

  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10%;
  }
}
</style>
