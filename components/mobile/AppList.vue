<template>
  <div class="app-list" :class="{ ani: startAni }">
    <ul class="list">
      <li class="item" v-for="(app, name) in apps" :key="name">
        <img
          class="ico"
          :src="require(`~/assets/images/apps/${name}.png`)"
          :alt="name"
          @click="clickApp(name)"
        />
        <p class="name">{{ name }}</p>
        <MobileApp
          class="app-item"
          :class="{ ani: startAni }"
          :style="styleOf(name)"
          v-if="apps[name]?.opened"
          :name="name"
        />
      </li>
    </ul>
    <div
      class="footer"
      @mousedown="touchstart"
      @touchend="touchend"
      @touchmove="touchmove"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("apps", ["apps"]),
  },
  data() {
    return {
      startAni: false,

      rect: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      transitionDuration: 0.05,
      openedApp: null,
    };
  },
  methods: {
    styleOf(name) {
      const app = this.apps[name];
      if (this.startAni && app.opened) {
        return {
          left: this.rect.x - this.rect.w / 2 + "px",
          top: this.rect.y - this.rect.h + "px",
          width: this.rect.w + "px",
          height: this.rect.h + "px",
          overflowY: this.startAni ? "hidden" : null,
          transitionDuration: this.transitionDuration + "s",
        };
      } else {
        return null;
      }
    },
    clickApp(name) {
      if (name === "Post") {
        this.$router.push("/post");
      }
      this.$store.commit("apps/open", name);
    },
    getRect(x, y) {
      const delta = window.innerHeight - y;
      return {
        x,
        y,
        w: window.innerWidth - delta / 2,
        h: window.innerHeight - (delta * 3) / 2,
      };
    },
    touchstart(e) {
      for (const name in this.apps) {
        if (this.apps[name].opened) {
          this.openedApp = name;
          break;
        }
      }
      if (this.openedApp) {
        this.startAni = true;
      }

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      console.log(x, y);
      this.rect = this.getRect(x, y);
    },
    touchmove(e) {
      if (this.startAni) {
        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;
        console.log(x, y);
        this.rect = this.getRect(x, y);
      }
    },
    touchend(e) {
      if (this.startAni) {
        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;
        console.log(x, y);

        const duration = 150;
        // 반 이상 넘어가면 닫아버림
        if ((window.innerHeight * 9) / 10 >= y) {
          this.rect = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 3,
            w: 30,
            h: 50,
          };
          this.transitionDuration = duration / 1000;
          setTimeout(
            function () {
              this.transitionDuration = 0.05;
              this.$store.commit("apps/close", this.openedApp);
              this.openedApp = null;
              this.startAni = false;
            }.bind(this),
            duration
          );
        } else {
          this.transitionDuration = duration / 1000;
          this.rect = {
            x: window.innerWidth / 2,
            y: window.innerHeight,
            w: window.innerWidth,
            h: window.innerHeight,
          };
          setTimeout(
            function () {
              this.transitionDuration = 0.05;
              this.openedApp = null;
              this.startAni = false;
            }.bind(this),
            duration
          );
        }
      }
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

  &.ani::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    z-index: 2;
  }

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

      .app-item {
        &.ani {
          border-radius: 1rem;
          transition: all 0.05s;
        }
      }
    }
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5%;
    z-index: 1000;
  }
}
</style>
