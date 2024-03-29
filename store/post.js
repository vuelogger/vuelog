const set = (key) => (state, val) => {
  state[key] = val;
};
// https://itnext.io/reusable-vuex-mutation-functions-9b4920aa737b
export const state = () => ({
  post: null,
  posts: [],
  page: 0,
  pageSize: 4,
  categories: [],
  category: "",
  sidebarShow: false,
  slug: null,
  postMode: null,
});

export const mutations = {
  setPost: set("post"),
  setPosts: set("posts"),
  setCategories: set("categories"),
  setSlug: set("slug"),
  setSidebarShow: set("sidebarShow"),
  updatePostMode: set("postMode"),
  setCategory: set("category"),
  setPage: set("page"),
  setPageSize: set("pageSize"),
};

export const actions = {
  async getPost({ commit }, slug) {
    commit("setPost", null);
    const result = await this.$axios.$get("/api/post", {
      params: {
        slug,
      },
    });
    commit("setPost", result);
    return result;
  },
  async getPosts({ state, commit }, category) {
    commit("setCategory", category);
    commit("setPosts", []);
    const result = await this.$axios.$get("/api/posts", {
      params: {
        category,
        pageSize: state.pageSize,
        page: state.page,
      },
    });
    commit("setPosts", result.data);
  },
  async getCategories({ commit }) {
    commit("setCategories", await this.$axios.$get("/api/categories"));
  },
};
