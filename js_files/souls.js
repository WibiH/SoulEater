const colors = [
  "palegreen",
  "deepskyblue",
  "gold",
  "lightsalmon",
  "mediumslateblue",
];

const imageUrlByColor = {
  mediumslateblue: "/images/sprites/happySoulcube.png",
  palegreen: "/images/sprites/babySoulcube.png",
  lightsalmon: "/images/sprites/dullSoulcube.png",
  gold: "/images/sprites/unhappySoulcube.png",
  deepskyblue: "/images/sprites/grumpySoulcube.png",
};

const imagesByColor = {};

for (let color in imageUrlByColor) {
  imagesByColor[color] = new Image();
  imagesByColor[color].src = imageUrlByColor[color];
}

class Soul {
  constructor(game) {
    this.game = game;

    this.x = 5;
    this.y = 5;

    this.setRandomColor();
  }

  setRandomPosition() {
    this.x = Math.floor(Math.random() * 20);
    this.y = Math.floor(Math.random() * 20);

    const eater = this.game.eater;
    if (eater.consumSouls()) {
      this.setRandomPosition();
    }
    this.setRandomColor();
  }

  setRandomColor() {
    const context = this.game.context;

    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    const context = this.game.context;

    const image = imagesByColor[this.color];
    context.drawImage(
      image,
      this.x * this.game.tileCount,
      this.y * this.game.tileCount,
      this.game.tileSize,
      this.game.tileSize
    );
  }
}
