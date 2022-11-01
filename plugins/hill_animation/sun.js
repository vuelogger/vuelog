export default class Sun {
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.radius = Math.ceil(canvasH < canvasW ? canvasH / 6 : canvasW / 6);

    this.x = -this.radius;
    this.y = canvasH / 7;
  }

  resize(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.x = 0;
    this.y = canvasH / 7;

    this.radius = Math.ceil(canvasH < canvasW ? canvasH / 6 : canvasW / 6);
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#ffb200";

    this.x += 0.3;
    if (this.x > this.canvasW + this.radius) {
      this.x = -this.radius;
    }
    const total = this.canvasW + this.radius * 2;
    const x = ((this.x + this.radius) / total) * Math.PI;
    this.y = (1 - Math.sin(x)) * (this.canvasH / 2);

    // console.log(percent);
    // this.y = (this.canvasH / 2) * percent; // + this.canvasH / 2;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }
}
