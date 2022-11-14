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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: contrast(0) brightness(2);
    }
  }

  &__clock {
    margin-left: auto;
    font-weight: bold;
  }
}
</style>
