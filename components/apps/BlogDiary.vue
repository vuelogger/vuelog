<template>
  <div class="blog-diary">
    <h1>My Blog Diary</h1>
    <ul v-if="diary.length > 0">
      <li v-for="d of diary" :key="d.title">
        <div class="created">
          {{ $moment(d.created).format("YYYY. MM. DD.") }}
        </div>
        <h3>{{ d.title }}</h3>
        <img v-if="d.image" :src="d.image" />
        <p>{{ d.content }}</p>
      </li>
    </ul>
    <div class="skeleton" v-else>
      <div class="block">
        <div class="title"></div>
        <div class="image"></div>
        <div class="text">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div class="block">
        <div class="title"></div>
        <div class="text">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("diary", ["diary"]),
  },
  fetch() {
    this.$store.dispatch("diary/getDiary");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/mixins";

$key-color: #6885ff;
$bg-color: #1e1e1e;
.blog-diary {
  background-color: $bg-color;
  color: white;
  padding: 6rem 3rem;
  box-sizing: border-box;
  min-height: 100%;
  h1 {
    font-size: 4.5rem;
    line-height: 1.4;
  }

  ul {
    margin-top: 3rem;
    margin-left: 3rem;
    padding-left: 3rem;
    border-left: 2px solid $key-color;
    li {
      margin-top: 3rem;

      .created {
        font-size: 1.2rem;
        color: gray;
        padding-bottom: 0.5rem;
      }

      h3 {
        position: relative;
        font-size: 2rem;
        color: #ddd;
        line-height: 1.6;
        &::before {
          content: "";
          position: absolute;
          right: calc(100% + 3rem + 1px);
          top: 0;
          width: 12px;
          height: 12px;
          transform: translate(50%, -100%);
          border-radius: 50%;
          background-color: $key-color;
        }
      }
      img {
        width: 100%;
        border-radius: 8px;
        margin-top: 2rem;
      }

      p {
        margin-top: 2rem;
        font-size: 1.4rem;
        line-height: 1.6;
        color: #83808d;
      }

      &:first-child {
        .created {
          position: relative;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            right: calc(100% + 3rem);
            width: 2px;
            height: 100%;
            background-color: $bg-color;
          }
        }
      }

      &:last-child {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          right: calc(100% + 3rem);
          width: 2px;
          height: 100%;
          background-color: $bg-color;
        }

        .created {
          position: relative;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            right: calc(100% + 3rem);
            width: 2px;
            height: 100%;
            background-color: $key-color;
          }
        }
      }
    }
  }

  .skeleton {
    flex: 1;
    padding-top: 3rem;
    box-sizing: border-box;
    height: 100%;
    border-left: 5px solid gray;

    .block {
      padding-left: 3rem;
      margin-top: 5rem;

      &:first-child {
        margin-top: 0;
      }
      .title {
        width: 60%;
        height: 2rem;
        border-radius: 2rem;
        @include skeletonLoading;
      }
      .image {
        width: 100%;
        aspect-ratio: 1;
        @include skeletonLoading;
        margin-top: 2rem;
        border-radius: 2rem;
      }

      .text {
        margin-top: 3rem;
        p {
          height: 0.5rem;
          @include skeletonLoading;
          margin-top: 1rem;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
