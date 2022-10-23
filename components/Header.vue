<template>
  <header class="header">
    <img class="header__logo" src="/logo.png" alt="logo" />
    <HeaderClock class="header__clock" :format="'MMM Do (ddd) A hh:mm'" />
  </header>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";
.header {
  height: $header-height;
  background: rgba(50, 50, 50, 0.5);
  position: relative;
  z-index: 100000;

  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 1.3rem;
  color: white;

  &__logo {
    height: 50%;
    object-fit: contain;
    filter: drop-shadow(1px 1px 1px lightblue)
      drop-shadow(-1px -1px 3px lightblue) drop-shadow(-1px 1px 1px lightblue);
  }

  &__clock {
    margin-left: auto;
    font-weight: bold;
  }
}
</style>
