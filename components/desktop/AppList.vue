<template>
  <div class="app-list" :class="cursor">
    <template v-for="(app, name) in apps">
      <DesktopApp
        :name="name"
        v-if="app.opened"
        v-show="app.opened && !app.minimized"
        :key="name"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currName: null,
      currMode: null,
      cursor: null,
      throttle: null,
      startPt: { x: 0, y: 0 },
    };
  },
  computed: {
    ...mapState("apps", ["apps"]),
  },

  methods: {
    mouseDownHandler(e) {
      const pt = { x: e.clientX, y: e.clientY };
      const { name, mode } = this.$getTopWindow(pt);

      if (name) {
        this.$focus(name);
        this.currMode = mode;
        this.currName = name;
        this.cursor = mode;
      }

      if (mode === "move") {
        this.startPt = pt;
      }
    },
    mouseMoveHandler(e) {
      if (!this.throttle) {
        this.throttle = setTimeout(() => {
          const pt = { x: e.clientX, y: e.clientY };

          if (this.currMode === null) {
            const { name, mode } = this.$getTopWindow(pt);
            this.cursor = mode;
          } else if (this.currMode === "move") {
            this.startPt = this.$move(this.startPt, pt, this.currName);
          } else if (this.currMode.startsWith("resize")) {
            this.$resize(pt, this.currMode, this.currName);
          }

          this.throttle = null;
        }, 10);
      }
    },
    mouseUpHandler() {
      this.currMode = null;
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.mouseDownHandler);
    document.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.mouseDownHandler);
    document.removeEventListener("mousemove", this.mouseMoveHandler);
    document.removeEventListener("mouseup", this.mouseUpHandler);
  },
};
</script>

<style lang="scss" scoped>
.app-list {
  &.resize-tl,
  &.resize-br {
    cursor: nwse-resize;
  }
  &.resize-tr,
  &.resize-bl {
    cursor: nesw-resize;
  }
  &.resize-t,
  &.resize-b {
    cursor: ns-resize;
  }
  &.resize-l,
  &.resize-r {
    cursor: ew-resize;
  }
}
</style>
