<template>
  <div class="tag" v-if="tags.length > 0">
    <img class="tag__img" src="~/assets/images/ico/tag.svg" alt="tag" />
    <p class="tag__item" v-for="tag of tags" :key="tag">{{ tag }}</p>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  flex-wrap: wrap;
  color: #7d80ff;
  font-size: 1.4rem;

  &__img {
    height: 1.2em;
    margin-right: 0.5rem;
  }

  &__item {
    margin-left: 0.5rem;
  }
}
</style>
