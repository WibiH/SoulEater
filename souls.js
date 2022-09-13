class Soul {
  constructor(game) {
    this.game = game;

    // soulImages
    //this.soulSprites = {};

    this.x = 5;
    this.y = 5;

    // soulImages
    /*const colors = {
      happy: "/images/souls/happySoul.png",
      baby: "/images/souls/babySoul.png",
      dull: "/images/souls/dullSoul.png",
      unhappy: "/images/souls/unhappySoul.png",
      grumpy: "/images/souls/grumpySoul.png",
    };
    for (let one in colors) {
      this.soulSprites[one] = new Image();
      this.soulSprites[one].src = colors[one];
    }*/
  }

  setRandomPosition() {
    this.x = Math.floor(Math.random() * 20);
    this.y = Math.floor(Math.random() * 20);

    const eater = this.game.eater;
    if (eater.consumSouls()) {
      this.setRandomPosition();
    }
  }

  setRandomColor() {
    const context = this.game.context;

    // soulColor
    const colors = [
      "palegreen",
      "deepskyblue",
      "gold",
      "lightsalmon",
      "mediumslateblue",
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    // soulImages
    //this.color =
    //  this.soulSprites[Math.floor(Math.random() * this.soulSprites.length)];
  }

  draw() {
    const context = this.game.context;
    this.setRandomColor();

    // soulImages
    /* context.drawImage(
      this.color,
      this.x * this.game.tileCount,
      this.y * this.game.tileCount,
      this.game.tileSize,
      this.game.tileSize
    );*/

    // soulColor
    context.fillStyle = this.color;
    context.fillRect(
      this.x * this.game.tileCount,
      this.y * this.game.tileCount,
      this.game.tileSize,
      this.game.tileSize
    );
  }
}
