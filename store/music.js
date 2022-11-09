export const state = () => ({
  musics: [],
});

export const mutations = {
  setMusics(state, musics) {
    state.musics = musics;
  },
};

export const actions = {
  async getMusics({ commit }) {
    const result = await this.$axios.$get("/api/musics");
    commit("setMusics", result);
  },
};
