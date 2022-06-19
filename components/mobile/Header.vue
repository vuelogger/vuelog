<template>
  <header class="m-header">
    <Clock class="m-header__clock" :format="'hh:mm'" />

    <img
      class="m-header__logo"
      src="@/assets/images/logo.png"
      alt="logo"
      @click="goHome"
    />
  </header>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$store.dispatch("app/closeApp");
    },
  },
};
</script>
