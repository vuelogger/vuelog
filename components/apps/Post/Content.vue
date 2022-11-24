<template>
  <div class="post-content">
    <ContentHeader :post="post" />
    <Tags v-if="post?.title" class="tags" :tags="post.tags" />
    <div class="wrapper">
      <template v-if="post?.title">
        <Article :body="post.body"></Article>
        <Comment />
        <RelatedArticles v-if="post?.category" :category="post.category" />
      </template>

      <!-- Loading -->
      <template v-else>
        <div class="skeleton">
          <div class="body">
            <div class="title"></div>
            <p v-for="n of 10" :key="n"></p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ContentHeader from "@/components/apps/Post/ContentHeader.vue";
import Article from "@/components/apps/Post/Article.vue";
import RelatedArticles from "@/components/apps/Post/RelatedArticles.vue";
import Comment from "@/components/apps/Post/Comment.vue";
export default {
  components: { ContentHeader, Article, RelatedArticles, Comment },
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
    ...mapState("post", ["post", "posts", "categories"]),
  },
  fetch() {
    let slug = this.$route.params.slug;
    if (!slug) {
      slug = this.$store.state.post.slug;
    }
    this.$store.dispatch("post/getPost", slug).then(() => {
      document.querySelector(".post").scrollTo(0, 0);
    });
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/base/variable.scss";
@import "~/assets/scss/base/mixins.scss";
.post-content {
  width: 100%;
  height: 100%;

  .tags {
    margin-left: auto;
    margin-top: 2rem;
    margin-right: 2rem;
    width: fit-content;
  }

  .wrapper {
    width: 100%;
    max-width: $post-max-width;
    box-sizing: border-box;
    padding: 0 2rem 5rem 2rem;
    margin: 0 auto;

    .skeleton {
      height: 100%;
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
