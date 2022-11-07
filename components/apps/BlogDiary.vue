<template>
  <div class="vuelog">
    <h1>My Blog Diary</h1>
    <ul>
      <li v-for="d of diary" :key="d.title">
        <div class="created">
          {{ $moment(d.created).format("YYYY. MM. DD.") }}
        </div>
        <h3>{{ d.title }}</h3>
        <img v-if="d.image" :src="d.image" />
        <p>{{ d.content }}</p>
      </li>
    </ul>
    <button @click="more">더 보기</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("diary", ["diary"]),
  },
  // async fetch() {
  //   await this.$store.dispatch("diary/getDiary");
  // },
};
</script>

<style lang="scss" scoped>
$key-color: #6885ff;
$bg-color: #1e1e1e;
.vuelog {
  background-color: $bg-color;
  color: white;
  padding: 6rem 3rem;
  box-sizing: border-box;
  h1 {
    font-size: 4.5rem;
    line-height: 1.4;
  }

  ul {
    margin-top: 3rem;
    margin-left: 3rem;
    padding-left: 3rem;
    border-left: 2px solid $key-color;
    li {
      margin-top: 3rem;

      .created {
        font-size: 1.2rem;
        color: gray;
        padding-bottom: 0.5rem;
      }

      h3 {
        position: relative;
        font-size: 2rem;
        color: #ddd;
        line-height: 1.6;
        &::before {
          content: "";
          position: absolute;
          right: calc(100% + 3rem + 1px);
          top: 0;
          width: 12px;
          height: 12px;
          transform: translate(50%, -100%);
          border-radius: 50%;
          background-color: $key-color;
        }
      }
      img {
        width: 100%;
        border-radius: 8px;
        margin-top: 2rem;
      }

      p {
        margin-top: 2rem;
        font-size: 1.4rem;
        line-height: 1.6;
        color: #83808d;
      }

      &:first-child {
        .created {
          position: relative;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            right: calc(100% + 3rem);
            width: 2px;
            height: 100%;
            background-color: $bg-color;
          }
        }
      }

      &:last-child {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          right: calc(100% + 3rem);
          width: 2px;
          height: 100%;
          background-color: $bg-color;
        }

        .created {
          position: relative;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            right: calc(100% + 3rem);
            width: 2px;
            height: 100%;
            background-color: $key-color;
          }
        }
      }
    }
  }
}
</style>
