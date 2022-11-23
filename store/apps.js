export const state = () => ({
  apps: {
    Post: {
      w: 1000,
      h: 800,
      minW: 500,
      minH: 400,
    },
    Twitter: {
      w: 400,
      h: 800,
      minW: 300,
      minH: 500,
    },
    // GuestBook: {
    //   w: 300,
    //   h: 200,
    //   minW: 200,
    //   minH: 100,
    // },
    MusicPlayer: {
      w: 300,
      h: 500,
      minW: 270,
      minH: 450,
    },
    BlogDiary: {
      w: 500,
      h: 800,
      minW: 300,
      minH: 500,
    },
  },

  maxZIndex: 0,
  boundary: { top: 0, left: 0 }, // Window가 움직일 수 있는 범위
});

export const mutations = {
  desktopInit(state) {
    const top = this.$getScssLength("headerHeight");
    const left =
      this.$getScssLength("dockWidth") +
      this.$getScssLength("dockPad") * 2 +
      this.$getScssLength("dockMarginLeft");

    state.boundary = { top, left };

    for (const name in state.apps) {
      state.maxZIndex += 1;
      state.apps[name] = {
        ...state.apps[name],
        opened: false,
        minimized: false,
        x: left,
        y: top,
        zIndex: state.maxZIndex,
      };
    }
  },
  mobileInit(state) {
    for (const name in state.apps) {
      state.apps[name] = {
        opened: false,
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
  closeAll(state) {
    for (const name in state.apps) {
      state.apps[name].opened = false;
    }
  },
  minimize(state, name) {
    state.apps[name].minimized = true;
  },
};
