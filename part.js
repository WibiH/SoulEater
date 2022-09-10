class Part {
  constructor(eater, x, y, color) {
    this.eater = eater;
    this.x = x;
    this.y = y;
    this.color = color;

    this.eaterImage = new Image();
    this.eaterImage.src = "images/skull_w.png";
  }

  draw() {
    const partIsHead =
      this.eater.parts.indexOf(this) === this.eater.parts.length - 1;

    if (partIsHead) {
      this.eater.game.context.drawImage(
        this.eaterImage,
        this.x * this.eater.game.tileCount,
        this.y * this.eater.game.tileCount,
        this.eater.game.tileSize,
        this.eater.game.tileSize
      );
    } else {
      if (this.color) {
        this.eater.game.context.fillStyle = this.color;
      } else {
        this.eater.game.context.fillStyle = "white";
      }

      this.eater.game.context.fillRect(
        this.x * this.eater.game.tileCount,
        this.y * this.eater.game.tileCount,
        this.eater.game.tileSize,
        this.eater.game.tileSize
      );
    }
  }
}
