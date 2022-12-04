<template>
  <ul class="snow">
    <li class="particle" v-for="n of 100" :key="n"></li>
  </ul>
</template>

<style lang="scss" scoped>
@keyframes snowfall {
  0% {
    transform: translate3d(var(--left-ini), 0, 0);
  }
  100% {
    transform: translate3d(var(--left-end), 110vh, 0);
  }
}
.snow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .particle {
    --size: 1vw;
    width: var(--size);
    height: var(--size);
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: -5vh;
    filter: blur(2px);

    &:nth-child(2n) {
      filter: blur(3px);
    }
    &:nth-child(6n) {
      filter: blur(5px);
    }

    @for $i from 1 through 100 {
      &:nth-child(#{$i}) {
        --size: #{random(5) * 0.2}vh;
        --left-ini: #{random(20) - 10}vw;
        --left-end: #{random(20) - 10}vw;
        left: #{random(100)}vw;
        animation: snowfall #{5 + random(50)}s linear infinite;
        animation-delay: -#{random(10)}s;
      }
    }
  }
}
</style>
