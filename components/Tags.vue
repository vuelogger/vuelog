<template>
  <div class="tag" v-if="tags.length > 0">
    <p class="tag__item" v-for="tag of tags" :key="tag">
      <img src="~/assets/images/ico/tag.svg" />
      <span>{{ tag }}</span>
    </p>
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
  font-size: 1.4rem;

  &__item {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    color: black;
    padding: 0.4em 0.7em;
    border-radius: 8px;
    background-color: rgb(218, 218, 218);
    cursor: pointer;

    img {
      height: 1.2rem;
      margin-right: 0.5rem;
    }
    &:hover {
      filter: invert(1);
    }
  }
}
</style>
