<template>
  <div class="app">
    <DynamicComponent :name="name" path="./apps" />
  </div>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";
.app {
  position: fixed;
  top: $mobile-header-height;
  left: 0;
  width: 100%;
  height: calc(100% - #{$mobile-header-height});
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
}
</style>
