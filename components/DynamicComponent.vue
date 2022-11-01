<template>
  <component :is="component" />
</template>

<script>
// https://ui.toast.com/weekly-pick/ko_20180814
// dynamic component를 지원하지만 import, register하는 단점을 보완하기 위함
export default {
  props: ["name", "path"],
  data() {
    return {
      component: null,
    };
  },
  computed: {
    loader() {
      if (this.name) {
        return () => import(`${this.path}/${this.name}.vue`);
      } else {
        return null;
      }
    },
  },
  mounted() {
    this.loader()
      .then(() => {
        this.component = () => this.loader();
      })
      .catch(() => {
        this.component = () => import(`${this.path}/Default.vue`);
      });
  },
};
</script>

<style></style>
