class Ripple {
  constructor(x, width, c, speed, dir) {
    this.x = x;
    this.width = width;
    this.speed = speed;
    this.dir = dir;
    this.color = c;
  }

  update() {
    this.x += this.speed * this.dir;
    if (this.x <= 0 || this.x >= width - this.width) this.dir *= -1;
  }

  show() {
    fill(this.color);
    rect(this.x, 0, this.width, height);
  }
}