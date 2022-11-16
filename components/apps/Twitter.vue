<template>
  <div class="twitter">
    <!-- <div class="header">
      <img src="" class="profile" />
    </div>
    <div class="body"></div> -->
    <a
      class="twitter-timeline"
      data-theme="dark"
      href="https://twitter.com/Vuelogger?ref_src=twsrc%5Etfw"
    ></a>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
    ></script>
  </div>
</template>

<script>
export default {
  head() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.twitter {
  background-color: black;
}
</style>
