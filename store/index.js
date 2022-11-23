export const actions = {
  async nuxtServerInit({ state, commit }) {
    if (this.$device.isDesktop) {
      commit("apps/desktopInit");
    } else {
      commit("apps/mobileInit");
    }
  },
};
