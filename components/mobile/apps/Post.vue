<template>
  <div class="m-post">
    <Title
      class="m-post__head"
      :mode="mode"
      :listTitle="listTitle"
      :categoryTitle="categoryTitle"
      @clickCategory="changeMode('category')"
      @clickList="changeMode('list')"
    />
    <main class="m-post__body" :class="mode">
      <Category @clickCategory="goToList" />
      <List :mode="mode" @clickContent="goToContent" />
      <Content />
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Title from "~/components/mobile/apps/post/Title";
import Category from "~/components/mobile/apps/post/Category";
import List from "~/components/mobile/apps/post/List";
import Content from "~/components/mobile/apps/post/Content";
export default {
  data() {
    return {
      mode: "category",
      categoryTitle: "Category",
      listTitle: "",
    };
  },
  computed: {
    ...mapState("notion", ["post"]),
  },

  methods: {
    changeMode(mode) {
      this.mode = mode;
    },
    goToList({ oriCategory, category }) {
      this.mode = "list";
      this.listTitle = oriCategory;
      this.$store.dispatch("notion/getPosts", category);
    },
    async goToContent(id) {
      this.mode = "content";
      this.$store.dispatch("notion/getPost", id);
    },
  },
  components: { Category, List, Content, Title },
  async created() {
    const params = this.$route.params || {};
    let category = params ? params.category : "";
    let postId = params ? params.id : null;

    await this.$store.dispatch("notion/fetch", { category, postId });

    if (category == "all") category = "";
    for (const c of this.$store.state.notion.categories) {
      if (c.category == category) {
        this.listTitle = c.oriCategory;
        break;
      }
    }

    if (postId) {
      this.mode = "content";
    } else if (category || category == "") {
      this.mode = "list";
    }

    this.$store.dispatch("loadingEnd");
  },
};
</script>
