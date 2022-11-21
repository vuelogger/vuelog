<template>
  <div class="swiper-round-btn">
    <svg
      :class="{ active: !isBeginning }"
      class="left-btn btn"
      width="32px"
      height="32px"
      viewBox="0 0 42 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      @click="
        swiper.slidePrev();
        $emit('leftBtnClick');
      "
    >
      <title>left_circle_white</title>
      <g
        id="left_circle_white"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <polyline
          id="Path-37"
          :stroke="color"
          stroke-width="2"
          transform="translate(21.500000, 21.000000) scale(-1, 1) translate(-21.500000, -21.000000) "
          points="18 14 25 20.9073671 18 28"
        ></polyline>
        <circle
          id="Oval"
          :stroke="color"
          stroke-width="2"
          cx="21"
          cy="21"
          r="20"
        ></circle>
      </g>
    </svg>
    <svg
      class="right-btn btn"
      :class="{ active: !isEnd }"
      width="32px"
      height="32px"
      viewBox="0 0 42 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      @click="
        swiper.slideNext();
        $emit('rightBtnClick');
      "
    >
      <title>right_circle_white</title>
      <g
        id="right_circle_white"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <polyline
          id="Path-37"
          :stroke="color"
          stroke-width="2"
          points="18 14 25 20.9073671 18 28"
        ></polyline>
        <circle
          id="Oval"
          :stroke="color"
          stroke-width="2"
          cx="21"
          cy="21"
          r="20"
        ></circle>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    swiper: {
      type: Object,
      require: true,
    },
    color: {
      type: String,
      default: "black",
    },
  },
  computed: {
    isBeginning() {
      return this.swiper ? this.swiper.isBeginning : true;
    },
    isEnd() {
      return this.swiper ? this.swiper.isEnd : false;
    },
  },
};
</script>

<style lang="scss">
.swiper-round-btn {
  .btn {
    cursor: pointer;
  }
  .left-btn {
    margin-right: 1rem;
  }
}
</style>
