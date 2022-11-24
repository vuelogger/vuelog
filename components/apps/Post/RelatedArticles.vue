<template>
  <div class="related-articles" v-if="hasContent">
    <h3>동일한 카테고리 글들</h3>
    <!-- Slider main container -->
    <ul>
      <li v-for="post of relatedPosts" :key="post.title" @click="click(post)">
        <div class="text">
          <p class="title">{{ post.title }}</p>
          <p class="desc">{{ post.description }}</p>
          <div class="bottom">
            <p class="category">{{ post.oriCategory }}</p>
            <p class="created">
              <img src="@/assets/images/ico/calendar.png" />
              <span>{{ $moment(post.createdAt).format("LL") }}</span>
            </p>
          </div>
        </div>

        <div class="cover">
          <img :src="post.cover" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      hasContent: false,
    };
  },
  computed: {
    ...mapState("post", ["posts", "post"]),
    relatedPosts() {
      const result = [];
      for (const p of this.posts) {
        if (p.slug != this.post.slug) {
          result.push(p);
        }
      }
      return result.slice(0, 4);
    },
  },
  fetch() {
    self = this;
    this.$store.commit("post/setPageSize", 5);
    this.$store
      .dispatch("post/getPosts", this.$route.params.category)
      .then(() => {
        self.hasContent = self.posts.length > 1;
      });
    this.$store.commit("post/setPageSize", 4);
  },
  methods: {
    click(post) {
      this.$router.push(`/post/${post.category}/${post.slug}`);
      this.$store.dispatch("post/getPost", post.slug).then(() => {
        document.querySelector(".post").scrollTo(0, 0);
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/base/mixins.scss";
.related-articles {
  width: 100%;
  box-sizing: border-box;
  margin: 5rem auto;

  h3 {
    font-size: 3rem;
    text-shadow: 2px 2px 2px lightgrey;
    font-weight: bold;
  }
  ul {
    margin-top: 3rem;
    li {
      display: flex;
      align-items: center;
      height: 25rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      overflow: hidden;
      border: 1px solid #ccc;
      padding: 2rem;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 7px gray;
      }

      .text {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        font-size: 2rem;
        padding: 1rem 3rem;
        box-sizing: border-box;
        .title {
          @include textClip(2, 1.6);
        }
        .desc {
          margin-top: 1.5rem;
          font-size: 0.7em;
          color: gray;
          @include textClip(3, 1.6);
        }
        .bottom {
          display: flex;
          align-items: center;
          margin-top: auto;
          .category {
            font-size: 0.6em;
            padding: 0.3em 0.7em;
            border-radius: 6px;
            background-color: #f2f2f2;
            color: black;
            margin-right: 1rem;
          }
          .created {
            color: #a7a7a7;
            font-size: 0.5em;
            img {
              width: 1.5rem;
              height: 1.5rem;
              object-fit: contain;
              vertical-align: sub;
              filter: invert(1) opacity(0.3);
            }
          }
        }
      }

      .cover {
        border-radius: 8px;
        height: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border: 1px solid lightgray;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
@include mobile {
  .related-articles {
    ul {
      li {
        height: 10rem;
        padding: 0;

        .text {
          font-size: 1.6rem;
          padding: 0.7em 1.2em;
          .desc {
            display: none;
          }
        }
      }
    }
  }
}
</style>
