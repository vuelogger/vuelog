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
};
</script>
