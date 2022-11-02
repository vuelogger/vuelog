import Hill from "./hill_animation/hill";
import Character from "./hill_animation/character";
import Sun from "./hill_animation/sun";

class HillAni {
  constructor(canvasW, canvasH) {
    this.hills = [
      new Hill("#a8e7ff", 0.2, 12, canvasW, canvasH),
      new Hill("#73c7e8", 0.5, 8, canvasW, canvasH),
      new Hill("#3ea9d4", 1.4, 6, canvasW, canvasH),
    ];
    this.chars = [];
    this.initChars(canvasW, canvasH);

    this.sun = new Sun(canvasW, canvasH);
  }

  initChars(canvasW, canvasH) {
    const imgs = [
      // { name: "html", src: require("@/assets/images/apps/post/HTML.png") },
      // { name: "css", src: require("@/assets/images/apps/post/CSS.png") },
      // {
      //   name: "javascript",
      //   src: require("@/assets/images/apps/post/Javascript.png"),
      // },
      { name: "vue", src: require("@/assets/images/apps/post/Vue.png") },
    ];

    this.hills.forEach((v, i) => {
      const size = 50 / (this.hills.length - i);
      const opacity = 1 - (this.hills.length - i - 1) * 0.2;
      this.chars.push(
        imgs.map((img) => {
          return new Character(
            img.name,
            img.src,
            canvasW,
            canvasH,
            size,
            opacity
          );
        })
      );
    });
  }

  resize(width, height) {
    this.hills.forEach((h, i) => {
      h.resize(width, height);
      this.chars[i].forEach((c) => {
        c.resize(width, height);
      });
    });
    this.sun.resize(width, height);
  }

  click(ctx, x, y) {
    let selected = null;
    for (let i = 0; i < this.hills.length; i++) {
      // 앞에 있는 것부터 클릭 되도록 순서 뒤집기
      for (const c of [...this.chars[i]].reverse()) {
        selected = c.select(ctx, x, y);
        if (selected) break;
      }
      if (selected) break;
    }
    return selected;
  }

  draw(ctx) {
    // Draw Sun
    this.sun.draw(ctx);

    // Draw Hill
    this.hills.forEach((h, i) => {
      const dots = h.draw(ctx);

      // Draw Characters
      this.chars[i].forEach((c) => {
        c.draw(ctx, dots);
      });
    });
  }
}

export default ({ app }, inject) => {
  inject("HillAni", HillAni);
};
