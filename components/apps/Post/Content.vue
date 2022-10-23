<template>
  <div class="post-content" v-if="post">
    <div class="header">
      <div class="cover">
        <img :src="post.cover" />
      </div>
      <p class="category">{{ post.oriCategory }}</p>
      <h1>{{ post.title }}</h1>
      <p class="created">
        생성일 : {{ $moment(post.createdAt).format("LLL") }}
      </p>
      <p class="updated">
        업데이트 : {{ $moment(post.updatedAt).format("LLL") }}
      </p>
    </div>

    <article v-html="post.body"></article>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("post", ["post", "categories"]),
  },
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

<style lang="scss">
@import "~/assets/scss/base/mixins.scss";
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
    font-size: 1.5rem;
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
    & > * {
      position: relative;
    }
    .category {
      font-size: 1.3em;
      margin-bottom: 1rem;
      background-color: #de7171;
      border-radius: 4px;
      line-height: 1;
      color: white;
      padding: 0.2em 0.5em;
    }
    h1 {
      width: 80%;
      font-size: 2.7em;
      position: relative;
      line-height: 1.4;
      font-weight: bold;
      text-align: center;
      text-shadow: -2px 2px 5px gray, 2px -2px 2px black;
    }
    .created,
    .updated {
      margin-top: 1rem;
    }
  }
  article {
    display: flex;
    flex-direction: column;
    margin: 3rem auto;
    width: 100%;
    max-width: 78rem;
    font-size: 1.6rem;
    line-break: anywhere;
    padding: 0 1rem;
    box-sizing: border-box;
    font-weight: normal;
    color: #2b3141;
    font-family: NexonMaplestory;
    user-select: text;

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
      margin-top: 7rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid lightgray;
    }

    h3 {
      font-size: 1.6em;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    iframe {
      margin: 2rem 0;
    }

    .bookmark {
      margin: 2rem 0;
      display: flex;
      border-radius: 8px;
      background: linear-gradient(to right, #f9f9fe, white);
      overflow: hidden;
      box-shadow: 4px 4px 10px 2px gray;
      transition: all 0.4s;

      &__left {
        flex: 5;
        padding: 2rem 5rem;
        box-sizing: content-box;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 1.3em;
        }
        .desc {
          margin-top: 0.8rem;
          font-size: 0.8em;
          color: gray;
          @include textClip(2);
        }
        .link {
          margin-top: auto;
          font-size: 0.8em;
          color: rgb(65, 113, 128);
        }
      }
      &__right {
        flex: 4;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.4s;
        }
      }

      &:hover {
        transform: translateY(-5px);
        background: rgb(229, 231, 255);
        .bookmark__right {
          img {
            transform: scale(1.3);
          }
        }
      }
    }
    p {
      line-height: 1.8;
      > code {
        padding: 0.2em 0.4em;
        background-color: #d8ffd8;
        border-radius: 6px;
      }
    }

    .code-block {
      border-radius: 0 6px 6px 6px;
      overflow: hidden;
      margin: 2rem 0;
      display: flex;
      flex-direction: column;
      position: relative;

      .head {
        .caption {
          color: white;
          background-color: #1e1e1e;
          width: fit-content;
          padding: 0 1rem;
        }
        .language {
          position: absolute;
          top: 10px;
          right: 10px;
          color: white;
        }
      }

      code {
        line-height: 1.6;
      }
    }

    hr {
      width: 100%;
    }

    > ul,
    ol {
      margin: 1rem 0;
    }

    ul,
    ol {
      padding-left: 3rem;
      list-style: disc;
      li {
        line-height: 2;
      }
    }

    strong {
      color: #ff6767;
      text-shadow: 1px 1px 1px #bababa;
    }

    em {
      padding-bottom: 0.3rem;
      border-bottom: 1px solid;
      font-weight: bold;
    }

    p {
      line-height: 2;
      margin-bottom: 0.5rem;
    }

    & > img {
      max-width: 100%;
      width: fit-content;
      margin: 0 auto;
    }
  }
}
</style>
