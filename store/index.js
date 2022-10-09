export const actions = {
  async nuxtServerInit({ state, commit }) {
    if (this.$device.isDesktop) {
      commit("apps/init");
    }
  },
};
