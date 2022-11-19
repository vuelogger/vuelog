<template>
  <div class="app" :style="style">
    <div class="app__head" @dblclick="headDblClick">
      <DynamicComponent :name="name" path="./apps/header" />
    </div>
    <DesktopAppBtns @close="close" @minimize="minimize" @maximize="maximize" />
    <div class="app__body">
      <DynamicComponent :name="name" path="./apps" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isMaximized: false,
      prevRect: null,
    };
  },
  computed: {
    ...mapState("apps", ["apps", "boundary"]),
    app() {
      return this.apps[this.name];
    },
    style() {
      return {
        top: this.app.y + "px",
        left: this.app.x + "px",
        width: this.app.w + "px",
        height: this.app.h + "px",
        zIndex: this.app.zIndex,
      };
    },
  },
  methods: {
    close() {
      this.$store.commit("apps/close", this.name);
    },
    minimize() {
      this.$store.commit("apps/minimize", this.name);
    },
    maximize() {
      this.startAni();
      if (this.isMaximized) {
        // UnMaximize
        this.$store.commit("apps/updateRect", {
          name: this.name,
          x: this.prevRect.x,
          y: this.prevRect.y,
          w: this.prevRect.w,
          h: this.prevRect.h,
        });
      } else {
        // Maximize
        this.prevRect = this.$deepCopy(this.app);
        this.$store.commit("apps/updateRect", {
          name: this.name,
          x: this.boundary.left,
          y: this.boundary.top,
          w: window.innerWidth - this.boundary.left,
          h: window.innerHeight - this.boundary.top,
        });
      }
      this.isMaximized = !this.isMaximized;
    },
    headDblClick() {
      this.maximize();
    },
    startAni() {
      // 잠시 transition 값을 넣고 해당 값까지 transtion이 되도록 한다.
      this.$el.classList.add("animating");
      setTimeout(() => {
        this.$el.classList.remove("animating");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";
@import "~/assets/scss/base/mixins.scss";
.app {
  position: fixed;
  overflow: hidden;
  border: 1px solid #666;
  box-sizing: border-box;
  box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.8);
  border-radius: 8px;

  &.animating {
    transition: all 0.3s;
  }

  &__head {
    height: $app-head-height;
    background-color: $key-color;
    padding-left: 10rem;
  }

  &__body {
    width: 100%;
    height: calc(100% - #{$app-head-height});
    background-color: white;

    > * {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      // @include scrollTheme();
    }
  }
}
</style>
