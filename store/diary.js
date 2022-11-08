export const state = () => ({
  diary: [],
  page: 0,
  pageSize: 10000,
});

export const mutations = {
  setDiary(state, diary) {
    state.diary = diary;
  },
  nextPage(state) {
    state.page++;
  },
};

export const actions = {
  async getDiary({ state, commit }) {
    const result = await this.$axios.$get("/api/diary", {
      params: {
        pageSize: state.pageSize,
        page: state.page,
      },
    });
    commit("setDiary", result);
  },
  async moreDiary({ commit, dispatch }) {
    commit("nextPage");
    await dispatch("getDiary");
  },
};
