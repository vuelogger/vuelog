<template>
  <div class="wave-text">
    <svg viewbox="0 0 10 10">
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="15%" stop-color="lightblue" />
          <stop offset="85%" stop-color="#3365df" />
        </linearGradient>
        <pattern
          id="wave"
          x="0"
          y="35%"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            id="wavePath"
            d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
            mask="url(#mask)"
            fill="url(#gradient)"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="1s"
              type="translate"
              from="0,0"
              to="40,0"
              repeatCount="indefinite"
            />
          </path>
        </pattern>
      </defs>
      <text
        text-anchor="middle"
        x="50%"
        y="80%"
        :font-size="fontSize"
        fill="url(#wave)"
        fill-opacity="0.9"
        font-weight="bold"
      >
        {{ text }}
      </text>
      <text
        text-anchor="middle"
        x="50%"
        y="80%"
        :font-size="fontSize"
        fill="url(#gradient)"
        fill-opacity="0.5"
        font-weight="bold"
      >
        {{ text }}
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  props: { text: { require: true, default: "" }, fontSize: { default: 40 } },
};
</script>

<style lang="scss" scoped>
.wave-text {
  width: 100%;
  svg {
    width: 200px;
    height: 40px;
  }
}
</style>
