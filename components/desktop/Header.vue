<template>
  <header class="header">
    <NuxtLink to="/" class="header__logo">
      <img src="/logo.png" alt="logo" />
    </NuxtLink>
    <HeaderClock class="header__clock" :format="'MMM Do (ddd) A hh:mm'" />
  </header>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";
.header {
  height: $desktop-header-height;
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
      drop-shadow(-1px -1px 1px lightblue) drop-shadow(-1px 1px 1px lightblue);
    img {
      width: 100%;
      height: 100%;
    }
  }

  &__clock {
    margin-left: auto;
    font-weight: bold;
  }
}
</style>
