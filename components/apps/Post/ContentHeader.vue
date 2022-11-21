<template>
  <div class="header">
    <template v-if="post?.title">
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
    </template>

    <template v-else>
      <div class="skeleton"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/mixins.scss";
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

  .skeleton {
    width: 100%;
    height: 100%;
    @include skeletonLoading;
  }
}
</style>
