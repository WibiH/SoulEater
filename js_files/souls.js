const colors = [
  "palegreen",
  "deepskyblue",
  "gold",
  "lightsalmon",
  "mediumslateblue",
];

const imageUrlByColor = {
  mediumslateblue: "/images/sprites/happySoul.png",
  palegreen: "/images/sprites/babySoul.png",
  lightsalmon: "/images/sprites/dullSoul.png",
  gold: "/images/sprites/unhappySoul.png",
  deepskyblue: "/images/sprites/grumpySoul.png",
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
