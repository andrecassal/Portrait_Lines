/* eslint-disable no-undef, no-unused-vars */
let img;

function preload() {
  img = loadImage("mona.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  img.resize(0, height);

  noStroke();
  // strokeWeight(1);
  fill(0);
  // image(img, 0, 0);

  for (let x = 0; x < img.width; x += 20) {
    new Line(img, x, 0, height).render();
  }

  noLoop();
}

class Line {
  constructor(img, x, y, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.minBrightness = 30;
    this.maxBrightness = 200;
    this.minWidth = 0;
    this.maxWidth = 10;
    this.yPoint = 20;
    this.h = h;
  }
  getPX(x, y) {
    const p = this.img.get(x, y);
    // R+G+B/3
    return (p[0] + p[1] + p[2]) / 3;
  }
  getWidth(x, y) {
    return map(
      this.getPX(x, y),
      this.maxBrightness,
      this.minBrightness,
      this.minWidth,
      this.maxWidth,
      true
    );
  }
  render() {
    let y = this.y;
    let x = this.x;
    let down = true;
    let up = false;
    // rect(this.x, this.y, 10, height);
    beginShape();
    curveVertex(x, y);
    while (down || up) {
      if (down) {
        y += this.yPoint;
        x = this.x - this.getWidth(x, y);
        if (y > this.h) {
          down = false;
          up = true;
        }
      } else if (up) {
        y -= this.yPoint;
        x = this.x + this.getWidth(x, y);
        if (y < 0) {
          up = false;
          down = false;
        }
      }
      curveVertex(x, y);
    }
    curveVertex(x, y);
    endShape(CLOSE);
  }
}
