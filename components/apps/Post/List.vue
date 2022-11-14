<template>
  <div class="list">
    <ul v-if="posts.length > 0">
      <li v-for="post of posts" :key="post.slug">
        <button @click="click(post.category, post.slug)">
          <div class="cover">
            <img v-if="post.cover" :src="post.cover" />
            <img v-else src="/logo.png" class="default" />
          </div>
          <section class="info">
            <h3 class="category">
              {{ post.oriCategory }}
            </h3>
            <h2>
              <img
                :src="
                  require(`@/assets/images/apps/post/${post.oriCategory}.png`)
                "
              />
              <span>{{ post.title }}</span>
            </h2>
            <p class="desc">
              {{ post.description }}
            </p>
            <div class="bottom">
              <div class="author">
                <img class="logo" src="/logo.png" />
                <p>
                  <span class="name">Vuelog</span>
                  <span class="created">
                    {{ $moment(post.createdAt).format("YYYY.MM.DD") }}
                  </span>
                </p>
              </div>
              <Tags :tags="post.tags" class="tags" />
            </div>
          </section>
        </button>
      </li>
    </ul>
    <ul v-else>
      <li v-for="n of 4" :key="n" class="skeleton">
        <button>
          <div class="cover"></div>
          <section class="info">
            <h2></h2>
            <p class="desc"></p>
            <p class="desc"></p>
            <p class="desc"></p>
            <div class="bottom">
              <div class="author">
                <div class="logo"></div>
                <p>
                  <span class="name"></span>
                  <span class="created"></span>
                </p>
              </div>
            </div>
          </section>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("post", ["posts", "categories"]),
  },
  methods: {
    click(category, slug) {
      this.$router.push(`/post/${category}/${slug}`);
      this.$store.dispatch("post/getPost", slug);
    },
  },
  fetch() {
    this.$store.dispatch("post/getPosts", this.$route.params.category);
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/mixins.scss";
@import "~/assets/scss/base/keyframes.scss";
.list {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 42rem;
    padding: 3rem;
    gap: 8rem 3rem;
    margin: 0 auto;
    max-width: $post-max-width;

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 1rem;
      box-shadow: 2px 4px 6px 2px lightgray;
      overflow: hidden;
      transition: all 0.4s;

      > button {
        display: flex;
        flex-direction: column;
        height: 100%;
        cursor: pointer;
        line-break: anywhere;
        .cover {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 20rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.4s;
          }

          .default {
            width: 50%;
            height: 50%;
            object-fit: contain;
            margin: auto;
          }
        }
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1.6rem 2rem;
          position: relative;
          .category {
            position: absolute;
            top: 0;
            display: inline-block;
            color: white;
            background-color: #a770ff;
            border-radius: 1rem;
            font-size: 1.4rem;
            padding: 0.4em 1em;
            line-height: 1;
            transform: translateY(-50%);
            box-shadow: 0px 0px 0px 4px white;
          }

          h2 {
            display: flex;
            margin-top: 2rem;
            font-size: 1.8rem;
            line-height: 1.4em;

            img {
              height: 2rem;
              margin-right: 0.5rem;
              height: 1.4em;
            }
          }
          .desc {
            font-size: 1.4rem;
            color: gray;
            font-family: Arial, Helvetica, sans-serif;
            margin-top: 1.2rem;
            @include textClip(3, 1.8em);
          }
          .bottom {
            display: flex;
            align-items: center;
            margin-top: auto;
            padding-top: 2rem;
            margin-top: auto;

            .author {
              display: flex;
              align-items: center;
              .logo {
                width: 3.5rem;
                height: 3.5rem;
                object-fit: contain;
              }
              p {
                margin-left: 1.3rem;
                display: flex;
                flex-direction: column;
                .name {
                  font-size: 1.3rem;
                  color: #333;
                }
                .created {
                  font-size: 0.9rem;
                  margin-left: auto;
                  color: gray;
                  margin-top: 0.6rem;
                }
              }
            }
            .tags {
              margin-left: auto;
            }
          }
        }
      }
      &:hover {
        // box-shadow: 2px 4px 6px 2px gray;
        transform: translateY(-20px);
        .cover {
          img {
            transform: scale(1.3);
          }
        }
      }

      &.skeleton {
        > button {
          cursor: auto;
          .cover {
            @include skeletonLoading;
          }
          .info {
            width: 100%;
            box-sizing: border-box;
            h2 {
              width: 70%;
              height: 2.8rem;
              margin-bottom: 1rem;
              @include skeletonLoading;
            }
            .desc {
              width: 100%;
              height: 1.3rem;
              @include skeletonLoading;
            }
            .bottom {
              .author {
                width: 100%;
                height: 3rem;

                .logo {
                  @include skeletonLoading;
                  border-radius: 50%;
                }

                p {
                  .name {
                    @include skeletonLoading;
                    width: 5rem;
                    height: 1.3rem;
                  }
                  .created {
                    @include skeletonLoading;
                    width: 8rem;
                    height: 1.4rem;
                  }
                }
              }
            }
          }
        }
        &:hover {
          transform: none;
        }
      }
    }
  }
}
</style>
