<template>
  <div class="related-articles">
    <h3>동일한 카테고리 글들</h3>
    <!-- Slider main container -->
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          class="swiper-slide"
          v-for="post of posts"
          :key="post.title"
          @click="click(post)"
        >
          <div class="cover">
            <img :src="post.cover" />
          </div>
          <div class="text">
            <p class="title">{{ post.title }}</p>
            <p class="created">{{ $moment(post.createdAt).format("LL") }}</p>
          </div>
        </div>
      </div>
    </div>
    <SwiperRoundBtn :swiper="swiper" />
  </div>
</template>
<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  data() {
    return {
      swiper: null,
    };
  },
  computed: {
    ...mapState("post", ["posts"]),
  },
  fetch() {
    self = this;
    this.$store
      .dispatch("post/getPosts", this.$route.params.category)
      .then(() => {
        self.swiper = new Swiper(".swiper", {
          // Optional parameters
          loop: true,
          slidesPerView: 1,
          spaceBetween: 30,
          breakpoints: {
            1024: {
              slidesPerView: 2,
            },
          },
        });
      });
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
  margin-top: 5rem;
  width: min(850px, 100%);
  padding: 0 2rem;
  box-sizing: border-box;
  margin: 5rem auto;

  h3 {
    font-size: 3rem;
    text-shadow: 2px 2px 2px lightgrey;
    font-weight: bold;
  }

  .swiper {
    width: 100%;
    margin-top: 3rem;
    .swiper-wrapper {
      display: flex;
      width: 100%;
      .swiper-slide {
        flex: 0 0 auto;
        aspect-ratio: 3 / 2;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 2px lightgray;
        position: relative;
        cursor: pointer;
        transition: transform 0.4s;

        &:hover {
          transform: translateY(-10%);
          .cover {
            img {
              transform: scale(1.3);
            }
          }
        }

        .cover {
          width: 100%;
          height: 100%;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0 0 8px 8px;
            transition: transform 0.4s;
          }
        }
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          transform: translate(-50%, -50%);
          font-weight: bold;
          padding: 0rem 1.5rem;
          text-align: center;
          line-height: 1.6;
          .title {
            color: #f9ff9f;
            font-size: 2.5rem;
            text-shadow: 2px 2px 2px black;
          }
          .created {
            font-size: 1.3rem;
            color: white;
            text-shadow: 2px 2px 2px black;
          }
        }
      }
    }
  }

  .swiper-round-btn {
    margin-top: 2rem;
    margin-left: auto;
    width: fit-content;
  }
}
@include mobile {
  .related-articles {
    .swiper-round-btn {
      margin-right: auto;
    }
  }
}
</style>
