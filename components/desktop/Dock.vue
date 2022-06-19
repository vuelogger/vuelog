<template>
  <nav class="site-dock" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <button class="site-dock__item" v-for="(name, i) of names" :key="name">
      <img
        :style="{ 'min-width': widths[name] + 'px' }"
        :src="require(`~/assets/images/apps/${name}.png`)"
        :alt="name"
        :ref="name"
        @mousemove="actives[i] = true"
        @mouseleave="actives[i] = false"
        @click="openWindow(name)"
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
      speed: 0.06, // 0 ~ 1
      moveTimer: null, // for throttling
      leaveTimer: null, // for
    };
  },
  computed: {
    ...mapState("app", ["names"]),
    maxWidth() {
      return this.minWidth * this.maxRatio;
    },
    step() {
      return (this.maxWidth - this.minWidth) * this.speed;
    },
  },
  methods: {
    updateTo(goalWidths) {
      // 기존 애니메이션 제거
      window.cancelAnimationFrame(this.aniID);
      this.aniID = null;

      let isAllDone = true;
      const newWidths = {};
      for (const name of this.names) {
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
      for (const name of this.names) {
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
      for (const name of this.names) {
        goalWidths[name] = this.minWidth;
      }
      this.updateTo(goalWidths);
    },
    openWindow(name) {
      if (!name.includes("공사중")) {
        this.$store.dispatch("window/open", name);
      }
    },
  },
  created() {
    this.minWidth = this.$getScssLength("dockWidth");
    for (const name of this.names) {
      this.widths[name] = this.minWidth;
      this.actives[name] = this.minWidth;
    }
  },
};
</script>
