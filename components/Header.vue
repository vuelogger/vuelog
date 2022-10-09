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
    width: $header-height;
    height: $header-height;
    object-fit: contain;
    filter: drop-shadow(0px 0px 1px black);
  }

  &__clock {
    margin-left: auto;
    font-weight: bold;
  }
}
</style>
