class Eater {
  constructor(game) {
    this.game = game;

    this.parts = [];

    this.direction = "down";

    this.soulNoiseUrl = "/sound/soulEater_Schnapp.wav"; // from SonjaDeffner|Kalme
    this.soulNoise = new Audio(this.soulNoiseUrl);

    for (let i = 0; i < 3; i++) {
      const part = new Part(this, 10 - i, 10);
      this.parts.push(part);
    }
  }

  consumSouls() {
    const headPart = this.parts[this.parts.length - 1];

    this.game.souls.forEach((soul) => {
      if (soul.x === headPart.x && soul.y === headPart.y) {
        soul.setRandomPosition();

        const lastPart = this.parts[0];
        let x = lastPart.x;
        let y = lastPart.y;

        const part = new Part(this, x, y, soul.color);
        this.parts.unshift(part);
        this.game.score++;
        this.game.addSouls();
        this.soulNoise.play();
        this.soulNoise.volume = 0.8;

        for (let i = 3; i < this.parts.length; i++) {
          if (this.parts > i) {
            this.game.speed++;
          }
        }
      }
    });
  }

  runLogic() {
    const headPart = this.parts[this.parts.length - 1];

    let x = headPart.x;
    let y = headPart.y;

    switch (this.direction) {
      case "up":
        y--;
        break;
      case "right":
        x++;
        break;
      case "down":
        y++;
        break;
      case "left":
        x--;
        break;
    }

    if (headPart.x < 0) {
      return;
    } else if (headPart.x === this.tileCount) {
      return;
    } else if (headPart.y < 0) {
      return;
    } else if (headPart.y === this.tileCount) {
      return;
    }

    const part = this.parts.shift();
    part.x = x;
    part.y = y;
    this.parts.push(part);

    this.consumSouls();
  }

  draw() {
    for (let part of this.parts) {
      part.draw();
    }
  }

  changeEaterPosition() {
    this.headX += this.xDirection;
    this.headY += this.yDirection;
  }
}
