<template>
  <article class="post-content-article" v-html="body"></article>
</template>

<script>
export default {
  props: ["body"],
};
</script>

<style lang="scss">
@import "~/assets/scss/base/variable.scss";
@import "~/assets/scss/base/mixins.scss";
// v-html로 만들어진 것은 scoped를 사용했을 때 css가 적용되지 않음
.post-content-article {
  display: flex;
  flex-direction: column;
  margin: 3rem auto 0 auto;
  width: 100%;
  max-width: $post-max-width;
  font-size: 1.6rem;
  padding: 0 2rem;
  box-sizing: border-box;
  font-weight: normal;
  color: #2b3141;
  font-family: NexonMaplestory;
  user-select: text;

  .toc {
    position: relative;
    padding-top: 0.5rem;
    padding-bottom: 3rem;
    margin-bottom: 3rem;
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
        line-height: 1.3;

        &:hover {
          color: #00ffc3;
        }
      }
      .h3 {
        font-size: 1.1em;
        margin-top: 1.5rem;
        line-height: 1.6;
        color: $bg-color;
        transition: color 0.4s;
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
    position: relative;
    font-size: 2em;
    font-weight: bold;
    margin-top: 4rem;
    padding-top: 3rem;
    margin-bottom: 3rem;
    padding-bottom: 1rem;
    text-shadow: 2px 2px 2px lightgrey;
  }

  h3 {
    font-size: 1.4em;
    margin-top: 3rem;
    margin-bottom: 3rem;
    border-left: 8px solid #8261f4;
    padding-left: 1.5rem;
  }

  iframe {
    margin: 2rem 0;
  }

  .callout {
    display: flex;
    padding: 1em;
    border-radius: 8px;
    margin: 3rem 1rem;
    background-color: whitesmoke;

    &__emoji {
      margin-top: 0.8rem;
      margin-right: 1rem;
    }

    &.info {
      background-color: #d0e3ff91;
    }

    &.warn {
      background-color: #fffbc3;
    }
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
      .favicon {
        height: 2rem;
        vertical-align: middle;
        margin-right: 0.5rem;
      }
      .link {
        font-size: 0.6em;
        color: rgb(38 106 186);
        font-family: sans-serif;
      }
      :last-child {
        margin-top: auto;
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

  .text-link {
    color: #0090ff;
    padding-bottom: 0.2rem;
    border-bottom: 2px solid;
    &:hover {
      padding-bottom: none;
      color: #0800ff;
    }
  }

  p {
    line-height: 1.8;
  }

  :not(pre) > code {
    padding: 0.2em 0.4em;
    background-color: #d8ffd8;
    border-radius: 6px;
    box-shadow: 2px 2px 2px lightgrey;
    margin-right: 0.2rem;
  }

  .code-block {
    border-radius: 0 6px 6px 6px;
    overflow: hidden;
    margin: 3rem 0;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: sans-serif;

    .head {
      width: 100%;
      background-color: #1e1e1e;
      color: white;
      border-radius: 6px 6px 0 0;
      display: flex;
      padding: 1em;
      box-sizing: border-box;
      .caption {
        line-height: 1;
        margin-left: auto;
        font-size: 0.8em;
        color: #979797;
      }
      .language {
        line-height: 1;
        color: black;
        text-transform: uppercase;
        padding: 0.2em 0.5em;
        background-color: gray;

        &.html {
          background-color: #ff9595;
        }
        &.css {
          background-color: #959dff;
        }
        &.javascript {
          background-color: #e4e464;
        }
      }
    }

    code {
      line-height: 1.6;
      padding-top: 0;
    }
  }

  hr {
    width: 100%;
    height: 3.5rem;
    border: 0;
    background-image: url(/images/divider.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 3rem 0;
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
  }

  em {
    color: #507ed1;
    box-shadow: inset 0 -10px 0 #74a7ff2b;
  }

  p {
    line-height: 2;
    margin-bottom: 0.5rem;
  }

  u {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid;
    text-decoration: none;
  }

  & > img {
    max-width: 100%;
    width: fit-content;
    margin: 3rem auto;
    border-radius: 8px;
  }
}
</style>
