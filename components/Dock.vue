<template>
  <nav class="dock" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <button class="dock__item" v-for="(info, name, i) in apps" :key="name">
      <img
        :style="{ 'min-width': widths[name] + 'px' }"
        :src="loadImg(name)"
        :ref="name"
        @mousemove="actives[i] = true"
        @mouseleave="actives[i] = false"
        @click="openApp(name)"
      />
      <p v-show="actives[i]">{{ name }}</p>
    </button>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      widths: {},
      actives: {},
      aniID: null,
      minWidth: 0,
      maxRatio: 1.8,
      speed: 0.1, // 0 ~ 1
      moveTimer: null, // for throttling
      leaveTimer: null, // for
    };
  },
  computed: {
    ...mapState("apps", ["apps"]),
    maxWidth() {
      return this.minWidth * this.maxRatio;
    },
    step() {
      return (this.maxWidth - this.minWidth) * this.speed;
    },
  },
  methods: {
    openApp(name) {
      // 선택한 앱이 Post인 경우
      if (name === "Post") {
        // 최소화된 상태가 아니라면 /post 경로로 이동하기
        if (!this.apps[name].minimized) {
          this.$router.push("/post");
        }
      }
      this.$store.commit("apps/open", name);
    },
    loadImg(name) {
      return require(`@/assets/images/apps/${name}.png`);
    },
    updateTo(goalWidths) {
      // 기존 애니메이션 제거
      window.cancelAnimationFrame(this.aniID);
      this.aniID = null;

      let isAllDone = true;
      const newWidths = {};
      for (const name in this.apps) {
        // 현재 width와 목표 width를 비교해서 부족한 만큼 채운다.
        const currWidth = this.widths[name];
        const goalWidth = goalWidths[name];
        if (goalWidth < currWidth) {
          newWidths[name] = Math.max(currWidth - this.step, goalWidth);
          isAllDone = false;
        } else if (goalWidth > currWidth) {
          newWidths[name] = Math.min(currWidth + this.step, goalWidth);
          isAllDone = false;
        } else {
          newWidths[name] = goalWidth;
        }
      }

      this.widths = newWidths;

      // 다시 애니메이션 추가
      if (!isAllDone) {
        this.aniID = window.requestAnimationFrame(() => {
          this.updateTo(goalWidths);
        });
      }
    },
    onMouseMove(e) {
      // Dock 안에서의 마우스의 위치를 구한다.
      const dockRect = e.target.getBoundingClientRect();
      const y = e.clientY - dockRect.top;

      const goalWidths = {};
      for (const name in this.apps) {
        // 각 app 아이콘에서 중심 위치를 구한다.
        const rect = this.$refs[name][0].getBoundingClientRect();
        const center = rect.top - dockRect.top + rect.height / 2;

        // 목표크기에서 (거리 / 3) 의 크기를 뺀다.
        // 가까울 수록 목표크기에 가까울 것이다.
        const dist = Math.abs(center - y);
        goalWidths[name] = Math.max(this.maxWidth - dist / 4, this.minWidth);
      }

      // 목표 크기에 맞게 아이콘 크기를 변경한다.
      this.updateTo(goalWidths);
    },
    onMouseLeave(e) {
      // 원래 크기로 되돌림
      const goalWidths = {};
      for (const name in this.apps) {
        goalWidths[name] = this.minWidth;
      }
      this.updateTo(goalWidths);
    },
  },
  created() {
    this.minWidth = this.$getScssLength("dockWidth");
    for (const name in this.apps) {
      this.$set(this.widths, name, this.minWidth);
      this.actives[name] = false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";

.dock {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: $dock-margin-left;
  transform: translateY(-50%);
  width: $dock-width;
  z-index: 100000;
  background-color: rgba(23, 38, 61, 0.5333333333);
  box-shadow: 1px 1px 4px #888;
  border-radius: 1.4rem;
  padding: 1.2rem $dock-pad;
  cursor: default;

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 0.7rem;
    &:last-child {
      margin-bottom: 0;
    }

    img {
      filter: drop-shadow(2px 2px 2px #000);
      border-radius: 10px;
    }

    p {
      margin-left: 1.8rem;
      color: #fff;
      font-size: 1.5rem;
      background-color: $key-color;
      padding: 0.5em 0.7em;
      border-radius: 5px;
      box-shadow: 0 0 1px 1px #5d5d5d;
    }
  }
}
</style>
