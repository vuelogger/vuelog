<template>
  <div class="post-content">
    <template v-if="post.title">
      <div class="header">
        <div class="cover">
          <img :src="post.cover" />
        </div>
        <p class="category">{{ post.oriCategory }}</p>
        <h1>{{ post.title }}</h1>
        <p class="created">
          <img src="@/assets/images/ico/calendar.png" />
          <span>
            {{ $moment(post.createdAt).format("YYYY.MM.DD hh:mm") }}
          </span>
        </p>
        <div class="profile">
          <div class="img">
            <img src="/logo.png" />
          </div>
          <span>Vuelog</span>
        </div>
      </div>

      <Tags class="tags" :tags="post.tags" />

      <Article :body="post.body"></Article>
    </template>

    <template v-else>
      <div class="skeleton">
        <div class="header"></div>

        <div class="body">
          <div class="title"></div>
          <p v-for="n of 10" :key="n"></p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Article from "@/components/apps/Post/Article.vue";
export default {
  components: { Article },
  head() {
    if (this.post) {
      return {
        meta: [
          {
            hid: "twitter:title",
            name: "twitter:title",
            content: this.post.title,
          },
          {
            hid: "og:title",
            name: "og:title",
            content: this.post.title,
          },
          {
            hid: "og:image",
            property: "og:image",
            content: this.post.cover,
          },
          {
            hid: "twitter:image",
            name: "twitter:image",
            content: this.post.cover,
          },
          {
            hid: "og:url",
            property: "og:url",
            content: "/post/" + this.post.category + "/" + this.post.slug,
          },
          {
            hid: "description",
            name: "description",
            content: this.post.description,
          },
          {
            hid: "og:description",
            property: "og:description",
            content: this.post.description,
          },
          {
            hid: "twitter:description",
            name: "twitter:description",
            content: this.post.description,
          },
          {
            hid: "twitter:card",
            name: "twitter:card",
            content: "summary_large_image",
          },
        ],
      };
    }
  },

  computed: {
    ...mapState("post", ["post", "categories"]),
  },
  fetch() {
    this.$store.dispatch("post/getPost", this.$route.params.slug);
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/base/variable.scss";
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
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(4px);
        transform: scale(1.2);
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a1a9c;
      }
    }
    & > * {
      position: relative;
    }
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
      width: 80%;
      font-size: 2.7em;
      margin-top: 1rem;
      position: relative;
      line-height: 1.4;
      font-weight: bold;
      text-align: center;
      text-shadow: 2px 2px 2px black, -2px -2px 2px gray;
      margin-bottom: 1rem;
    }

    .created {
      color: lightgray;
      display: flex;
      align-items: center;
      margin-left: 2rem;
      margin-top: 2rem;
      img {
        height: 2rem;
        margin-right: 1rem;
      }
    }

    .profile {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.7rem;
      color: #eee;
      margin-top: 1.5rem;
      .img {
        filter: drop-shadow(0px 0px 3px white) drop-shadow(0px 0px 3px white)
          drop-shadow(0px 0px 3px white) drop-shadow(0px 0px 3px white);
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin-right: 1rem;
        overflow: hidden;
        img {
          width: 80%;
          height: 80%;
          object-fit: contain;
        }
      }
    }
  }

  .tags {
    margin-left: auto;
    margin-top: 2rem;
    margin-right: 2rem;
    width: fit-content;
  }

  .skeleton {
    height: 100%;

    .header {
      @include skeletonLoading;
    }
    .body {
      width: 100%;
      max-width: $post-max-width;
      padding: 0 2rem;
      box-sizing: border-box;
      margin: 3rem auto;

      .title {
        @include skeletonLoading;
        width: 50%;
        height: 4rem;
        margin-bottom: 3rem;
      }
      p {
        @include skeletonLoading;
        height: 1.6rem;
        width: 100%;
        margin-top: 1rem;
        &:nth-of-type(2) {
          width: 60%;
          margin-bottom: 3rem;
        }
        &:nth-of-type(6) {
          width: 30%;
          margin-bottom: 5rem;
        }
      }
    }
  }
}

@include mobile {
  .post-content {
    .header {
      h1 {
        font-size: 3rem;
      }
    }
  }
}
</style>
