<template>
  <div class="app-list">
    <ul class="list">
      <li
        class="item"
        v-for="(app, name) in apps"
        :key="name"
        @click.prevent="clickApp(name)"
      >
        <img
          class="ico"
          :src="require(`~/assets/images/apps/${name}.png`)"
          :alt="name"
        />
        <p class="name">{{ name }}</p>
        <MobileApp v-if="apps[name]?.opened" :name="name" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      openedName: null,
    };
  },
  computed: {
    ...mapState("apps", ["apps"]),
  },
  methods: {
    clickApp(name) {
      console.log("click");
      if (name === "Post") {
        this.$router.push("/post");
      }
      setTimeout(() => {
        this.$store.commit("apps/open", name);
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";

$padding: calc((25vw * 0.3) / 2);
$appWidth: calc((100vw - #{$padding} * 2) / 4);

.app-list {
  position: relative;
  height: calc(100% - #{$mobile-header-height});
  .list {
    display: grid;
    grid-template-columns: repeat(4, $appWidth);
    grid-auto-rows: $appWidth;
    padding: $padding;
    box-sizing: border-box;
    row-gap: 1.5rem;

    .item {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .ico {
        width: 60%;
        height: 60%;
        max-width: 80px;
        max-height: 80px;
      }

      .name {
        color: #eee;
        font-size: 1.3rem;
        margin-top: 1rem;
      }
    }
  }
}
</style>
