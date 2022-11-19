<template>
  <header class="header">
    <button @click="toHome" class="header__logo">
      <img src="/logo.png" alt="logo" />
    </button>
    <p class="header__title">Vue로 만드는 세상</p>
    <div class="right">
      <template v-if="compName">
        <DynamicComponent :name="compName" path="./apps/header" />
      </template>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("apps", ["apps"]),
    compName() {
      for (const name in this.apps) {
        if (name == "Post" && this.apps[name].opened) {
          return name;
        }
      }
    },
  },
  methods: {
    toHome() {
      this.$store.commit("apps/closeAll");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";
.header {
  height: $mobile-header-height;
  background: rgba(50, 50, 50, 0.5);
  position: relative;
  z-index: 100000;

  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 2rem;
  color: white;

  &__logo {
    height: 50%;
    img {
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(1px 1px 1px lightblue)
        drop-shadow(-1px -1px 1px lightblue) drop-shadow(-1px 1px 1px lightblue);
    }
  }
  &__title {
    margin-left: 1rem;
    font-weight: bold;
  }
  .right {
    height: 100%;
    margin-left: auto;
  }
}
</style>
