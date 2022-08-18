export const state = () => ({
  messages: [],
});

export const mutations = {
  setChats(state, messages) {
    state.messages = messages;
  },
};

export const actions = {
  async sendMsg({}, param) {
    try {
      await this.$axios.$post("/api/sendMsg", JSON.stringify(param), {
        headers: {
          "Content-Type": `application/json`,
        },
      });
    } catch (e) {
      console.error("ERROR!!", e);
    }
  },
  async getMsgs({ commit }) {
    const messages = await this.$axios.$get("/api/getMsgs");
    commit("setChats", messages);
  },
};
