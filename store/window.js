const widths = {
  Post: {
    w: 1080,
    h: 700,
  },
  GuestBook: {
    w: 400,
    h: 650,
  },
};

export const state = () => ({
  boundary: {
    top: 0,
    left: 0,
  },

  maxZIndex: 1,

  // Mac window들에 대한 정보를 담고있다.
  windows: {},

  categoryWidth: 200,
  listWidth: 350,
});

export const mutations = {
  initWindows(state, appNames) {
    for (const name of appNames) {
      let w = 1080,
        h = 700;

      if (name in widths) {
        w = widths[name].w;
        h = widths[name].h;
      }

      state.windows[name] = {
        opened: false,
        minimized: false,
        x: 0,
        y: 0,
        w,
        h,
        zIndex: 0,
        minW: w * 0.75,
        minH: h * 0.75,
      };
    }
  },
  setBoundary(state, { top, left }) {
    state.boundary.top = top;
    state.boundary.left = left;

    for (const name in state.windows) {
      state.windows[name].x = left;
      state.windows[name].y = top;
    }
  },
  setOpened(state, { name, opened }) {
    state.windows[name].opened = opened;
  },
  setMinimized(state, { name, minimized }) {
    state.windows[name].minimized = minimized;
  },
  setRect(state, { name, x, y, h, w }) {
    state.windows[name].x = x;
    state.windows[name].y = y;
    state.windows[name].w = w;
    state.windows[name].h = h;
  },
  setPos(state, { name, x, y }) {
    state.windows[name].x = x;
    state.windows[name].y = y;
  },
  setWindowIdx(state, { name, zIndex }) {
    state.windows[name].zIndex = zIndex;
  },
  plusMaxZIndex(state) {
    state.maxZIndex += 1;
  },
  setCategoryWidth(state, width) {
    state.categoryWidth = width;
  },
  setListWidth(state, width) {
    state.listWidth = width;
  },
};

export const actions = {
  open({ state, commit }, name) {
    const window = state.windows[name];
    if (!window.opened) {
      commit("setOpened", { name, opened: true });
    } else {
      commit("setMinimized", { name, minimized: false });
    }
  },
  close({ commit }, name) {
    commit("setOpened", { name, opened: false });
  },
  minimize({ commit }, name) {
    commit("setMinimized", { name, minimized: true });
  },
  maximize({ commit }, { name, x, y, h, w }) {
    commit("setRect", { name, x, y, h, w });
  },
  unMaximize({ commit }, { name, x, y, h, w }) {
    commit("setRect", { name, x, y, h, w });
  },
  move({ commit }, { name, x, y }) {
    commit("setPos", { name, x, y });
  },
  focus({ state, commit }, name) {
    commit("setWindowIdx", { name, zIndex: state.maxZIndex });
    commit("plusMaxZIndex");
  },
};
