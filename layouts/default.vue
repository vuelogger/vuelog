<template>
  <div class="container">
    <img class="bg" src="~/assets/images/bg.jpeg" />

    <DesktopDock />
    <DesktopHeader />
    <DesktopWindowList />
    <!-- <Nuxt /> -->

    <Loading :progress="loading.progress" v-if="!loading.isDone" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loading"]),
  },
  beforeCreate() {
    this.$store.dispatch("loadingStart");
  },
  mounted() {
    if (this.$route.path == "/") {
      this.$store.dispatch("loadingEnd");
    }
  },
};
</script>
