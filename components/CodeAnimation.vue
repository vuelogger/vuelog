<template>
  <div class="code-ani">
    <div v-for="(code, lang) of codes" :key="lang" class="code" :class="lang">
      <header>
        <svg
          class="saw-tooth"
          width="16"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 6.675l-1.8-.6c-.2-.1-.3-.3-.2-.4l.9-1.7c.6-1.2-.7-2.5-1.9-1.9l-1.7.9c-.1.1-.3 0-.4-.2l-.6-1.8c-.4-1.3-2.2-1.3-2.6 0l-.6 1.8c-.1.2-.3.3-.4.2l-1.7-.9c-1.2-.6-2.5.7-1.9 1.9l.9 1.7c.1.1 0 .3-.2.4l-1.8.6c-1.3.4-1.3 2.3 0 2.7l1.8.6c.2 0 .3.2.2.3l-.9 1.7c-.6 1.2.7 2.5 1.9 1.9l1.7-.9c.2-.1.4 0 .4.2l.6 1.8c.4 1.3 2.3 1.3 2.7 0l.6-1.8c.1-.2.3-.3.4-.2l1.7.9c1.2.6 2.5-.7 1.9-1.9l-1-1.7c-.1-.2 0-.4.2-.4l1.8-.6c1.3-.4 1.3-2.2 0-2.6zm-7 3.7c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4 1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4z"
            fill="#4C4F5A"
          ></path>
        </svg>
        <span>{{ lang }}</span>
        <svg
          class="arrow"
          width="16"
          height="8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.709 7.651l6.161-5.622c.241-.22.383-.517.383-.84 0-.323-.142-.62-.383-.84A1.361 1.361 0 0 0 13.95 0c-.354 0-.68.13-.921.349l-5.27 4.808L2.492.349A1.361 1.361 0 0 0 1.57 0C1.215 0 .89.13.648.336.38.569.253.879.253 1.189c0 .297.127.595.368.84 1.615 1.486 5.807 5.325 6.09 5.596l.03.026c.509.465 1.458.465 1.968 0z"
            fill="#4C4F5A"
          ></path>
        </svg>
      </header>
      <pre v-html="code.result"></pre>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";

export default {
  data() {
    return {
      codes: {
        html: {
          ori: `<div class="rect"></div>`,
          result: "",
        },
        css: {
          ori: `.rect {
    background: linear-gradient(
        -119deg,
        $gray 0%,
        $dark-gray 100%
    );
}`,
          result: "",
        },
        js: {
          ori: `const colors = [
    "#74B087",
    "#DE7300",
    "#74B087"
];
function animate() {};`,
          result: "",
        },
      },
    };
  },
  created() {
    for (const lang in this.codes) {
      this.codes[lang].result = hljs.highlight(this.codes[lang].ori, {
        language: lang,
      }).value;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";
.code-ani {
  position: absolute;
  top: 0;
  right: 0;
  font-family: sans-serif;
  font-size: 1.6rem;

  .code {
    position: absolute;
    width: 300px;
    background: #1d1e22;
    box-shadow: 3px 4px 16px rgb(103 103 103 / 50%);
    border-radius: 6px;
    color: white;
    padding: 1.5rem;
    padding-bottom: 3rem;
    line-height: 1.4;

    &.html {
      top: 10rem;
      right: 10rem;
    }
    &.css {
      top: 22rem;
      right: 4rem;
    }
    &.js {
      top: 48rem;
      right: 15rem;
    }

    header {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      font-weight: bold;
      padding: 0.5rem 0;
      .saw-tooth {
        margin-right: 1rem;
      }
      span {
        flex: 1;
      }
      .arrow {
      }
    }
  }
}

@include mobile {
  .code-ani {
    top: $mobile-header-height;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    display: flex;

    .code {
      position: absolute;

      &.html {
        top: 20rem;
        right: 8%;
      }

      &.css {
        top: 28rem;
        right: -7%;
      }

      &.js {
        top: 48rem;
        right: 13%;
      }
    }
  }
}
</style>
