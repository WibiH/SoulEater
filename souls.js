class Soul {
  constructor(game) {
    this.game = game;
    this.soul = {};

    this.x = 5;
    this.y = 5;
  }

  setRandomPosition() {
    this.x = Math.floor(Math.random() * 20);
    this.y = Math.floor(Math.random() * 20);

    const eater = this.game.eater;
    if (eater.consumSouls()) {
      this.setRandomPosition();
      //this.setRandomColor(); // gets overwritten by parts.fillstyle
    }
  }

  setRandomColor() {
    const context = this.game.context;
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "purple",
      "pink",
      "orange",
    ];

    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    const context = this.game.context;
    this.setRandomColor();

    context.fillStyle = this.color;
    context.fillRect(
      this.x * this.game.tileCount,
      this.y * this.game.tileCount,
      this.game.tileSize,
      this.game.tileSize
    );
  }
}
