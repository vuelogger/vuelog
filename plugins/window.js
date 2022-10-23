/**
 * 메뉴 항목을 추가한다.
 * @param {object} pt {x, y} 좌표
 * @param {object} rect {l, r, t, b} window의 상하좌우 위치
 * @param {number} tolerance pt와 rect 위치 차이 허용 거리
 * @param {number} headHeight move가 적용되는 높이
 * @returns {string} 마우스 모드
 *  - resize-tl: Resize top left
 *  - resize-tr: Resize top right
 *  - resize-bl: Resize bottom left
 *  - resize-br: Resize bottom right
 *  - resize-t: Resize top
 *  - resize-l: Resize left
 *  - resize-r: Resize right
 *  - resize-b: Resize bottom
 *  - move: Move
 */

const getWindowMode = function (app) {
  const headHeight = app.$getScssLength("appHeadHeight");
  return function ({ x, y }, { l, r, t, b }, tolerance = 8) {
    const isLeft = Math.abs(x - l) < tolerance;
    const isRight = Math.abs(x - r) < tolerance; // 오른쪽은 좀 더 필요함
    const isTop = Math.abs(y - t) < tolerance;
    const isBottom = Math.abs(y - b) < tolerance;

    let result = null;
    // Window 안에 있는지
    if (
      l - tolerance < x &&
      x < r + tolerance &&
      t - tolerance < y &&
      y < b + tolerance
    ) {
      result = "in";

      if (isLeft && isTop) {
        result = "resize-tl";
      } else if (isRight && isTop) {
        result = "resize-tr";
      } else if (isLeft && isBottom) {
        result = "resize-bl";
      } else if (isRight && isBottom) {
        result = "resize-br";
      } else if (isTop) {
        result = "resize-t";
      } else if (isLeft) {
        result = "resize-l";
      } else if (isRight) {
        result = "resize-r";
      } else if (isBottom) {
        result = "resize-b";
      } else if (y < headHeight + t) {
        result = "move";
      }
    }

    return result;
  };
};

/**
 * 클릭했을 떄 해당 범위 안에 있는 App들 중 가장 최상단에 있는 것의 이름을 반환한다.
 * @param {object} pt {x, y} 좌표
 * @param {object} apps 앱들 (store/app.js state 값 참조)
 * @return {object} {name, mode} 앱 이름과 마우스 모드(resize, move 등)
 */
const getTopWindow = function (app) {
  const apps = app.store.state.apps.apps;
  const _func = getWindowMode(app);

  return function (pt) {
    let maxZIndex = -1;
    let windowName = null;
    let windowMode = null;

    for (const name in apps) {
      const app = apps[name];

      // App이 열려 있고 최소화되어있지 않으며
      // 윈도우가 클릭한 곳 안에 있어야 된다.(not null)
      // 그리고 현재 최상단 z-index 보다 커야한다.
      if (!app.minimized && app.opened) {
        const rect = {
          l: app.x,
          t: app.y,
          r: app.x + app.w,
          b: app.y + app.h,
        };
        const mode = _func(pt, rect);

        if (mode && maxZIndex < app.zIndex) {
          windowName = name;
          windowMode = mode;
          maxZIndex = app.zIndex;
        }
      }
    }
    return { name: windowName, mode: windowMode };
  };
};

const resize = function (app) {
  const apps = app.store.state.apps.apps;
  const boundaryTop = app.store.state.apps.boundary.top;

  return function (pt, mode, name) {
    if (pt.y < boundaryTop) {
      pt.y = boundaryTop;
    }

    const nx = pt.x;
    const ny = pt.y;

    let x = apps[name].x;
    let y = apps[name].y;
    let w = apps[name].w;
    let h = apps[name].h;

    let l = apps[name].x;
    let r = apps[name].x + apps[name].w;
    let t = apps[name].y;
    let b = apps[name].y + apps[name].h;

    let minW = apps[name].minW;
    let minH = apps[name].minH;

    if (mode === "resize-tl") {
      if (minW < r - nx) {
        x = nx;
        w = r - nx;
      }
      if (minH < b - ny) {
        y = ny;
        h = b - ny;
      }
    } else if (mode === "resize-tr") {
      if (minH < b - ny) {
        y = ny;
        h = b - ny;
      }
      if (minW < nx - l) {
        w = nx - l;
      }
    } else if (mode === "resize-bl") {
      if (minW < r - nx) {
        x = nx;
        w = r - nx;
      }
      if (minH < ny - t) {
        h = ny - t;
      }
    } else if (mode === "resize-br") {
      if (minW < nx - l) {
        w = nx - l;
      }
      if (minH < ny - t) {
        h = ny - t;
      }
    } else if (mode === "resize-t") {
      if (minH < b - ny) {
        y = ny;
        h = b - ny;
      }
    } else if (mode === "resize-b") {
      if (minH < ny - t) {
        h = ny - t;
      }
    } else if (mode === "resize-l") {
      if (minW < r - nx) {
        x = nx;
        w = r - nx;
      }
    } else if (mode === "resize-r") {
      if (minW < nx - l) {
        w = nx - l;
      }
    }

    app.store.commit("apps/updateRect", { name, x, y, w, h });
  };
};

const move = function (app) {
  const apps = app.store.state.apps.apps;
  const boundaryTop = app.store.state.apps.boundary.top;

  return function (startPt, currPt, name) {
    let newX = apps[name].x + (currPt.x - startPt.x);
    let newY = apps[name].y + (currPt.y - startPt.y);

    if (newY < boundaryTop) {
      newY = boundaryTop;
    }

    app.store.commit("apps/updateRect", {
      name,
      x: newX,
      y: newY,
      w: apps[name].w,
      h: apps[name].h,
    });

    return currPt;
  };
};

export default ({ app }, inject) => {
  inject("getWindowMode", getWindowMode(app));
  inject("getTopWindow", getTopWindow(app));
  inject("focus", function (name) {
    app.store.commit("apps/updateZIndex", name);
  });
  inject("resize", resize(app));
  inject("move", move(app));
};
