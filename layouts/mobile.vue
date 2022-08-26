<template>
  <div class="m-container">
    <img class="bg" src="~/assets/images/mobile_bg.jpeg" />

    <Header />
    <MobileAppList />
    <Nuxt />
    <Loading :progress="loading.progress" v-if="!loading.isDone" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "~/components/mobile/Header.vue";
export default {
  computed: {
    ...mapState(["loading"]),
  },
  beforeCreate() {
    this.$store.dispatch("loadingStart");
  },
  mounted() {
    // home인 경우 마운트된 경우 로딩 끝내기
    if (this.$route.path == "/") {
      this.$store.dispatch("loadingEnd");
    }
  },
  components: { Header },
};
</script>
