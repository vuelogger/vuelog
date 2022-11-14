<template>
  <div class="container">
    <img class="bg" src="~/assets/images/bg.jpg" />

    <Dock />
    <DesktopHeader />
    <DesktopAppList />

    <CodeAnimation />
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/vs2015.min.css",
        },
      ],
    };
  },
  // TODO : resize 시 포스트 창 가로 크기 맞추기
  // mounted() {
  //   window.addEventListener("resize", this.resize);
  // },
  // methods: {
  //   resize() {
  //     console.log("resize");
  //   },
  // },
};
</script>
