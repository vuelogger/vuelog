<template>
  <div class="sidebar" v-show="sidebarShow">
    <nav>
      <button
        class="category"
        v-for="(c, i) of categories"
        :key="c.category"
        :style="categoryStyle(i)"
        @click="changeCategory(c.category)"
      >
        <img :src="require(`@/assets/images/apps/post/${c.oriCategory}.png`)" />
        <span class="text">{{ c.oriCategory }}</span>
      </button>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("post", ["categories", "category", "sidebarShow"]),
  },
  methods: {
    close() {
      this.$store.commit("post/setSidebarShow", false);
    },
    changeCategory(category) {
      this.close();
      this.$store.commit("post/setPage", 0);
      this.$store.dispatch("post/getPosts", category);
      this.$router.push("/post/" + category);
    },
    categoryStyle(i) {
      const total = this.categories.length;

      const radian = (((360 / total) * i - 90) * Math.PI) / 180;
      const length = total * 20;

      const left = Math.cos(radian) * length;
      const top = Math.sin(radian) * length;

      return {
        left: left + "px",
        top: top + "px",
      };
    },
  },
  mounted() {
    window.addEventListener(
      "keydown",
      function (e) {
        if (e.key == "Escape") {
          this.close();
        }
      }.bind(this)
    );
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.close);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";
.sidebar {
  position: fixed;
  width: 100%;
  height: calc(100% - #{$app-head-height});
  z-index: 100;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
  }

  nav {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    // .center {
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);
    //   color: white;
    //   font-size: 3rem;
    // }

    .category {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6rem;
      height: 6rem;
      cursor: pointer;
      top: 0;
      left: 0;
      border-radius: 50%;
      background-color: white;
      transform: translate(-50%, -50%);

      img {
        width: 50%;
        height: 50%;
      }

      .text {
        position: absolute;
        bottom: -2rem;
        text-align: center;
        color: white;
        font-size: 1.2rem;
      }
    }
  }
}

@include mobile {
  .sidebar {
    height: calc(100%);
  }
}
</style>
