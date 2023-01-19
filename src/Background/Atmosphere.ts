class Atmosphere {
  y: number;
  speed: number;
  alphaValue: number;
  isDisplayed: boolean;

  constructor() {
    this.y = 0;
    this.speed = 2;
    this.alphaValue = 255;
    this.isDisplayed = false;
  }

  draw() {
    noStroke();
    fill(135, 206, 235, this.alphaValue);
    ellipse(width / 2, this.y + height / 2, width * 2.3, height * 2);
    this.isDisplayed = true;
  }

  update() {
    this.y += this.speed;
    this.alphaValue -= 0.4;
    if (!this.isDisplayed) {
      this.y += this.speed;
      this.alphaValue -= 0.5;
    }
  }
}
