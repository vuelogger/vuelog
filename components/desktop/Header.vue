<template>
  <header class="desktop-header">
    <img
      class="desktop-header__logo"
      src="@/assets/images/logo.png"
      alt="logo"
    />
    <DesktopHeaderIconList />
    <Clock class="desktop-header__clock" :format="'MMM Do (ddd) A hh:mm'" />
  </header>
</template>
