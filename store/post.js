const set = (key) => (state, val) => {
  state[key] = val;
};
// https://itnext.io/reusable-vuex-mutation-functions-9b4920aa737b
export const state = () => ({
  post: null,
  posts: [],
  page: 0,
  pageSize: 100,
});

export const mutations = {
  setPost: set("post"),
  setPosts: set("posts"),
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
  },
  async getPosts({ state, commit }, category) {
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
};
