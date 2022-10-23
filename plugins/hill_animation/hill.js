export default class Hill {
  /**
   * 언덕을 그리기 위한 애니메이션 클래스
   * @param {String} color 언덕 색상
   * @param {Number} speed 언덕이 이동하는 속도 (Float)
   * @param {Number} total 곡선을 그리기 위한 x축 점 개수
   */
  constructor(color, speed, total, width, height) {
    if (total < 2) {
      total = 2;
    }
    this.color = color;
    this.speed = speed;
    this.total = total;
    this.width = width;
    this.height = height;

    this.hillPts = [];

    this.gap = Math.ceil(width / (total - 2)); // 가로 길이를 좀 더 넉넉하게 해서 바깥쪽에서 들어오는 느낌

    for (let i = 0; i < total; i++) {
      this.hillPts[i] = {
        x: i * this.gap,
        y: this.getRandomY(),
      };
    }
  }

  getRandomY() {
    const min = this.height / (this.total - 2);
    const max = this.height - min;
    return min + Math.random() * max;
  }

  resize(width, height) {
    const prevW = this.width;
    const prevH = this.height;

    this.width = width;
    this.height = height;

    for (let i = 0; i < this.hillPts.length; i++) {
      const ratioX = this.hillPts[i].x / prevW;
      const ratioY = this.hillPts[i].y / prevH;
      this.hillPts[i].x = width * ratioX;
      this.hillPts[i].y = height * ratioY;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let curr = this.hillPts[0];
    let prev = curr;
    curr.x += this.speed;

    if (curr.x > -this.gap) {
      this.hillPts.unshift({
        x: -(this.gap * 2),
        y: this.getRandomY(),
      });
    }

    let dots = [];

    ctx.moveTo(curr.x, curr.y);

    let prevCenterPt = curr;

    for (let i = 1; i < this.hillPts.length; i++) {
      curr = this.hillPts[i];
      curr.x += this.speed;

      const cx = (prev.x + curr.x) / 2;
      const cy = (prev.y + curr.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({
        pt1: prevCenterPt,
        pt2: prev,
        pt3: { x: cx, y: cy },
      });

      prev = curr;
      prevCenterPt = { x: cx, y: cy };
    }

    ctx.lineTo(prev.x, prev.y); // 마지막 좌표
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(this.hillPts[0].x, this.height);
    ctx.fill();

    ctx.restore();

    return dots;
  }
}
