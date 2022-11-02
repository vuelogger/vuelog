<template>
  <div></div>
</template>

<script>
export default {
  asyncData({ store }) {
    store.commit("apps/closeAll");
  },
};
</script>
