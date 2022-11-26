<template>
  <div class="header" :style="style">
    <template v-if="post?.title">
      <div class="cover">
        <img :src="post.cover" />
      </div>
      <div class="text">
        <p class="category">{{ post.oriCategory }}</p>

        <h1>{{ post.title }}</h1>
        <p class="created">
          {{ $moment(post.createdAt).format("YYYY.MM.DD hh:mm") }}
        </p>
        <p class="creator">by <strong>Vuelogger</strong></p>
      </div>

      <div class="wave">
        <div class="line" v-for="n of 3" :key="n" />
      </div>
    </template>

    <template v-else>
      <div class="skeleton"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      height: null,
    };
  },
  computed: {
    style() {
      const appHead = this.$getScssLength("appHeadHeight");
      if (this.$device.isMobileOrTablet) {
        return { height: this.height ? this.height - appHead + "px" : "100vh" };
      } else {
        return {};
      }
      // if (this.$device.isMobileOrTablet) {
      //   return { height: this.height ? this.height - appHead + "px" : "100vh" };
      // } else {
      //   return { null };
      // }
    },
  },
  mounted() {
    this.height = window.innerHeight;
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/mixins.scss";
.header {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #dfe9ff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(2px);
      transform: scale(1.2);
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #1a1a1a7c;
    }
  }

  .text {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #eee;
    font-size: 1.5rem;

    .category {
      font-size: 1.3em;
      margin-bottom: 1rem;
      background-color: #59cea1;
      border-radius: 4px;
      line-height: 1;
      color: white;
      padding: 0.2em 0.5em;
    }

    h1 {
      position: relative;
      width: 80%;
      font-size: 2.7em;
      margin: 1rem auto;
      position: relative;
      line-height: 1.4;
      font-weight: bold;
      text-align: center;
      color: white;
    }

    .created {
      margin-top: 1rem;
      font-size: 0.8em;
    }

    .creator {
      margin-top: 2rem;
      font-size: 1.2rem;

      strong {
        margin-left: 0.5rem;
        color: rgb(255, 194, 120);
        font-size: 1.4em;
      }
    }
  }

  .scroll-mouse {
    margin-bottom: 7rem;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    @keyframes wave {
      0% {
        background-position-x: 0;
      }
      100% {
        background-position-x: 1000px;
      }
    }

    .line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 7rem;
      background-image: url("/wave.png");
      background-size: 1000px 7rem;
      animation: wave 5s linear;
      animation-delay: 0s;
      animation-iteration-count: infinite;

      opacity: 1;
      z-index: 1;

      &:nth-child(2) {
        opacity: 0.6;
        animation-delay: -6s;
        animation-duration: 10s;
        height: 10rem;
        background-size: 1000px 10rem;
        z-index: 2;
      }
      &:nth-child(3) {
        opacity: 0.3;
        height: 12rem;
        background-size: 1000px 12rem;
        animation-delay: 4s;
        animation-duration: 35s;
        z-index: 3;
        animation-direction: reverse;
      }
    }
  }

  .skeleton {
    width: 100%;
    height: 100%;
    @include skeletonLoading;
  }
}

@include mobile {
  .header {
    height: calc(100vh - #{$app-head-height});
  }
}
</style>
