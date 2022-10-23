<template>
  <div class="post-content" v-if="post">
    <div class="header">
      <div class="cover">
        <img :src="post.cover" />
      </div>
      <h1>{{ post.title }}</h1>
      <p class="created">{{ post.createdAt }}</p>
      <p class="updated">{{ post.updatedAt }}</p>
    </div>

    <article v-html="post.body"></article>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("post", ["post"]),
  },
};
</script>

<style lang="scss">
.post-content {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 50rem;
    max-height: 100%;
    color: #eee;
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
      }
    }
    h1 {
      font-size: 5rem;
      font-weight: bold;
    }
  }
  article {
    display: flex;
    flex-direction: column;
    margin: 3rem auto;
    width: 100%;
    max-width: 80rem;
    font-size: 1.6rem;
    line-height: 2;
    line-break: anywhere;
    padding: 0 1rem;
    box-sizing: border-box;
    font-weight: normal;

    .toc {
      position: relative;
      padding-top: 0.5rem;
      padding-bottom: 3rem;
      margin: 3rem 0;
      $bg-color: #757575;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        height: 100%;
        width: 2rem;
        transform: translateX(-50%);
        background-color: $bg-color;
        border-radius: 4px;
      }
      &-block {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        .h2 {
          font-size: 1.2em;
          padding: 0.5em 1em;
          background-color: $bg-color;
          width: fit-content;
          border-radius: 4px;
          color: white;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          max-width: 25rem;
          z-index: 10;
          transition: color 0.4s;
          margin-bottom: 1rem;
          font-weight: bold;

          &:hover {
            color: #00ffc3;
          }
        }
        .h3 {
          font-size: 1.1em;
          margin-top: 0.5rem;
          color: $bg-color;
          transition: color 0.4s;
          font-weight: bold;
          &:hover {
            color: #26b291;
          }
        }

        &:nth-child(2n-1) {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: 50%;

          .h3 {
            margin-right: 2rem;
          }
        }
        &:nth-child(2n) {
          width: 50%;
          margin-left: auto;

          .h3 {
            margin-left: 2rem;
          }
        }
      }
    }

    h2 {
      font-size: 2em;
      font-weight: bold;
    }

    h3 {
      font-size: 1.6em;
      font-weight: bold;
    }

    ul,
    ol {
      padding-left: 2rem;
    }
  }
}
</style>
