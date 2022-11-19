<template>
  <div class="scroll-mouse">
    <div class="img"></div>
    <p>Scroll</p>
    <img src="@/assets/images/ico/right_arrow.svg" />
  </div>
</template>

<style lang="scss">
.scroll-mouse {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img {
    position: relative;
    width: 2rem;
    height: 4rem;
    border-radius: 3rem;
    border: 3px solid white;
    &::after {
      content: "";
      position: absolute;
      width: 30%;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: white;
      left: 50%;
      transform: translate(-50%);
      animation: mouse-btn-fade-out 1.5s ease infinite;
    }
  }
  p {
    color: white;
    margin-top: 0.7rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  img {
    transform: rotate(90deg);
    width: 5rem;
    animation: bounce 1.5s infinite;
  }
}
</style>
