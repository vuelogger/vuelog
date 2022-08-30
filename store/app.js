export const state = () => ({
  names: ["Post", "KakaoTalk"],

  loadedNames: [], // 현재 로드되었는지 체크 (값이 들어가면 계속 들고 있음)
  openedName: "", // 현재 사용자에게 보여주는 앱
  // 이렇게 하는 이유는 닫힐 때 component 가 사라지면서 자연스럽지 않게 닫히는 문제가 있다.
});

export const mutations = {
  setOpenedName(state, name) {
    state.openedName = name;
  },
  addLoadedNames(state, name) {
    if (!state.loadedNames.includes(name)) {
      state.loadedNames.push(name);
    }
  },
};

export const actions = {
  openApp({ commit }, name) {
    commit("setOpenedName", name);
    commit("addLoadedNames", name);
  },
  closeApp({ commit }) {
    commit("setOpenedName", "");
  },
};
