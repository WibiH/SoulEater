class Eater {
  constructor(game) {
    this.game = game;

    this.parts = [];

    this.extent = 3;

    /*
    this.x = 0;
    this.y = 0;
    this.headX = 10;
    this.headY = 10;
    this.tailLength = 2;
    this.xDirection = 0;
    this.yDirection = 0;
    */

    this.direction = "down";

    for (let i = 0; i < 3; i++) {
      const part = new Part(this, 10 - i, 10);
      this.parts.push(part);
    }
  }

  consumSouls() {
    const headPart = this.parts[this.parts.length - 1];

    if (this.game.soul.x === headPart.x && this.game.soul.y === headPart.y) {
      /*
      this.game.soulX = Math.floor(Math.random() * this.game.tileCount);
      this.game.soulY = Math.floor(Math.random() * this.game.tileCount);
      */
      this.game.soul.setRandomPosition();
      // this.extent++;
      const lastPart = this.parts[0];

      let x = lastPart.x;
      let y = lastPart.y;

      const part = new Part(this, x, y, this.game.soul.color);
      this.parts.unshift(part);
      this.game.score++;
    }
  }

  runLogic() {
    const headPart = this.parts[this.parts.length - 1];

    let x = headPart.x;
    let y = headPart.y;

    // it´s missing the case, where it´s not possible to go in the
    // opposite direction, butthis one doesn´t work :(
    /*
    if (this.direction = "up") {
        y--;
        if(this.direction === "down") return;
    }
    if (this.direction = "right") {
        x++;
        if(this.direction === "left") return;
      }
    if (this.direction = "down") {
        y++;
        if(this.direction === "up") return;
      }
    if (this.direction = "left") {
        x--;
        if(this.direction === "right") return;
      }
    } */

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

    // problem part

    const part = this.parts.shift();
    part.x = x;
    part.y = y;
    // const part = new Part(this, x, y);
    this.parts.push(part);

    /*
    // problem part
    if (this.parts.length > this.extent) {
      this.parts.shift();
    }
    */
    this.consumSouls();
  }

  draw() {
    for (let part of this.parts) {
      part.draw();
    }

    /*
    const context = this.game.context;

    context.fillStyle = "green";
    for (let i = 0; i < this.parts.length; i++) {
      let part = this.parts[i];
      context.fillRect(
        part.x * this.tileCount,
        part.y * this.tileCount,
        this.tileSize,
        this.tileSize
      );
    }

    this.parts.push(new Eater(this.headX, this.headY));

    if (this.parts.length > this.tailLength) {
      this.parts.shift();
    }
    context.fillStyle = "orange";
    context.fillRect(
      this.headX * this.tileCount,
      this.headY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
    */
  }

  changeEaterPosition() {
    this.headX += this.xDirection;
    this.headY += this.yDirection;
  }
}
