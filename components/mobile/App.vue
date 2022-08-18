<template>
  <main
    class="app"
    :style="style"
    @click="open(name)"
    :class="{ active: isShow }"
  >
    <img
      class="app__img"
      :src="require(`~/assets/images/apps/${name}.png`)"
      :alt="name"
    />
    <p class="app__name">{{ name }}</p>
    <div class="app__comp">
      <component :is="name" v-if="isActive"></component>
    </div>
  </main>
</template>

<script>
import Post from "~/components/mobile/apps/Post";
import KakaoTalk from "~/components/mobile/apps/KakaoTalk";
import About from "~/components/mobile/apps/About";

export default {
  components: { Post, KakaoTalk, About },
  props: ["name"],
  data() {
    return {
      style: {},
    };
  },
  computed: {
    openedName() {
      return this.$store.state.app.openedName;
    },
    loadedNames() {
      return this.$store.state.app.loadedNames;
    },
    isActive() {
      return this.$store.state.app.loadedNames.includes(this.name);
    },
    isShow() {
      return this.$store.state.app.openedName === this.name;
    },
  },

  methods: {
    open(name) {
      this.$store.dispatch("app/openApp", name);
    },
    initAppRect() {
      const rect = this.$el.parentNode.getBoundingClientRect();
      this.style = {
        top: rect.top + "px",
        left: rect.left + "px",
        width: rect.width + "px",
        height: rect.height + "px",
      };
    },
  },
  mounted() {
    this.initAppRect();

    addEventListener("resize", this.initAppRect);
  },
  beforeDestroy() {
    removeEventListener("resize", this.initAppRect);
  },
};
</script>
