<template>
  <div class="post-title">
    <img
      class="post-title__arrow"
      :class="{ active: mode !== 'category' }"
      src="~/assets/images/ico/left_arrow.svg"
    />
    <button
      class="post-title__btn"
      :class="cateMode"
      @click="$emit('clickCategory')"
    >
      Category
    </button>
    <button
      class="post-title__btn"
      :class="listMode"
      @click="$emit('clickList')"
    >
      {{ listTitle }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["mode", "categoryTitle", "listTitle"],
  data() {
    return {
      cateMode: "phase3",
      listMode: "phase4",
    };
  },
  watch: {
    mode(v) {
      switch (v) {
        case "category":
          this.cateMode = "phase3";
          this.listMode = "phase4";
          break;
        case "list":
          this.cateMode = "phase2";
          this.listMode = "phase3";
          break;
        case "content":
          this.cateMode = "phase1";
          this.listMode = "phase2";
          break;
      }
    },
  },
};
</script>

<style></style>
