import Hill from "./hill_animation/hill";
import Character from "./hill_animation/character";

let hills = [];
const chars = [];

const initHills = function (width, height) {
  hills = [
    new Hill("#a8e7ff", 0.2, 12, width, height),
    new Hill("#73c7e8", 0.5, 8, width, height),
    new Hill("#3ea9d4", 1.4, 6, width, height),
  ];
};

const initChars = function (width) {
  chars.push(
    new Character(require("@/assets/images/apps/post/HTML.png"), width),
    new Character(require("@/assets/images/apps/post/CSS.png"), width),
    new Character(require("@/assets/images/apps/post/Javascript.png"), width),
    new Character(require("@/assets/images/apps/post/Vue.png"), width)
  );
};

const canvasResize = function (width, height) {
  hills.forEach((h) => h.resize(width, height));
};

const drawHills = function (ctx) {
  let dots = null;
  hills.forEach((h) => {
    dots = h.draw(ctx);
  });
  return dots;
};

const drawChars = function (ctx, dots) {
  chars.forEach((c) => {
    c.draw(ctx, dots);
  });
};

const draw = function (ctx) {
  const dots = drawHills(ctx);
  drawChars(ctx, dots);
};

export default ({ app }, inject) => {
  inject("initHills", initHills);
  inject("initChars", initChars);
  inject("canvasResize", canvasResize);
  inject("drawHillAni", draw);
};
