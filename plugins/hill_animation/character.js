export default class Character {
  constructor(imgSrc, canvasWidth) {
    this.isLoaded = false;
    this.img = new Image();
    this.img.src = imgSrc;
    this.img.onload = (data) => {
      this.isLoaded = true;
    };

    this.width = 50;
    this.height = 50;

    this.halfW = this.width / 2;
    this.canvasWidth = canvasWidth;
    this.x = canvasWidth + this.width * Math.random() * 5;
    this.y = 0;
    this.speed = Math.random() * 3 + 1;
  }

  draw(ctx, dots) {
    if (this.isLoaded) {
      ctx.save();
      this.x -= this.speed;
      if (this.x < -this.width) {
        this.x = this.canvasWidth;
        this.speed = Math.random() * 3 + 1;
      }
      const closest = this.getY(this.x, dots);
      this.y = closest.y;

      ctx.translate(this.x, this.y);
      ctx.rotate(closest.rotation);
      ctx.translate(-this.width / 2, -this.height);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
      ctx.restore();
    }
  }

  //
  getY(x, dots) {
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      if (dot.pt1.x <= x && x <= dot.pt3.x) {
        return this.getBezierYFrom(x, dot);
      }
    }
    return {
      x: 0,
      y: 0,
      rotation: 0,
    };
  }

  // At x, get Bezier point between two points
  getBezierYFrom(x, dot, total = 200) {
    let pt = this.getBezierPt(dot.pt1, dot.pt2, dot.pt3, 0);
    let prevX = pt.x;
    for (let i = 1; i < total; i++) {
      const t = i / total;
      pt = this.getBezierPt(dot.pt1, dot.pt2, dot.pt3, t);
      if (prevX <= x && x <= pt.x) {
        return pt;
      }
      prevX = pt.x;
    }
    return pt;
  }

  getQuadValue(dot1, dot2, dot3, t) {
    const p1 = (1 - t) * (1 - t) * dot1;
    const p2 = 2 * (1 - t) * t * dot2;
    const p3 = t * t * dot3;
    return p1 + p2 + p3;
  }

  getBezierPt(pt1, pt2, pt3, t) {
    const { tx, ty } = this.quadTangent(pt1, pt2, pt3, t);
    const rotation = -Math.atan2(tx, ty) + (90 * Math.PI) / 180;
    return {
      x: this.getQuadValue(pt1.x, pt2.x, pt3.x, t),
      y: this.getQuadValue(pt1.y, pt2.y, pt3.y, t),
      rotation,
    };
  }

  quadTangent(pt1, pt2, pt3, t) {
    return {
      tx: 2 * (1 - t) * (pt2.x - pt1.x) + 2 * (pt3.x - pt2.x) * t,
      ty: 2 * (1 - t) * (pt2.y - pt1.y) + 2 * (pt3.y - pt2.y) * t,
    };
  }
}
