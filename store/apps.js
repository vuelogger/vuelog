export const state = () => ({
  apps: {
    Post: {
      w: 800,
      h: 800,
      minW: 500,
      minH: 400,
    },
    // Guestbook: {
    //   w: 300,
    //   h: 200,
    //   minW: 200,
    //   minH: 100,
    // },
    // Musicplayer: {
    //   w: 300,
    //   h: 200,
    //   minW: 200,
    //   minH: 100,
    // },
    // Vuelog: {
    //   w: 300,
    //   h: 200,
    //   minW: 200,
    //   minH: 100,
    // },
  },

  maxZIndex: 0,
  boundary: { top: 0, left: 0 }, // Window가 움직일 수 있는 범위

  loadedNames: [], // 현재 로드되었는지 체크 (값이 들어가면 계속 들고 있음)
  openedName: "", // 현재 사용자에게 보여주는 앱
  // 이렇게 하는 이유는 닫힐 때 component 가 사라지면서 자연스럽지 않게 닫히는 문제가 있다.

  // Post
  postMode: null,
});

export const mutations = {
  init(state) {
    const top = this.$getScssLength("headerHeight");
    const left =
      this.$getScssLength("dockWidth") +
      this.$getScssLength("dockPad") * 2 +
      this.$getScssLength("dockMarginLeft");

    state.boundary = { top, left };

    for (const app in state.apps) {
      state.maxZIndex += 1;
      state.apps[app] = {
        ...state.apps[app],
        ...{
          opened: false,
          minimized: false,
          x: left,
          y: top,
          zIndex: state.maxZIndex,
        },
      };
    }
  },
  updateZIndex(state, name) {
    state.apps[name].zIndex = ++state.maxZIndex;
  },
  updateRect(state, payload) {
    state.apps[payload.name] = {
      ...state.apps[payload.name],
      x: payload.x,
      y: payload.y,
      w: payload.w,
      h: payload.h,
    };
  },
  open(state, name) {
    state.apps[name].opened = true;
    state.apps[name].minimized = false;
    state.apps[name].zIndex = ++state.maxZIndex;
  },
  close(state, name) {
    state.apps[name].opened = false;
  },
  minimize(state, name) {
    state.apps[name].minimized = true;
  },

  updatePostMode(state, mode) {
    state.postMode = mode;
  },
};
