class Game {
  constructor(gameScreenElement, gameOverScreenElement) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;

    this.canvas = document.getElementById("game");
    this.context = this.canvas.getContext("2d");

    this.scoreElement = document.getElementById("score");

    // gridders
    this.tileCount = 20;
    this.tileSize = this.canvas.width / this.tileCount;
    this.speed = 4;

    // this.tileMap = new TileMap(this.tileSize);

    this.setControls();
    this.reset();
  }

  reset() {
    this.score = 0;
    this.eater = new Eater(this);
    // this.souls = [];
    this.soul = new Soul(this);
    // this.score = new Score(this);
  }

  setControls() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        this.eater.direction = "up";
        //if (this.eater.direction === "down") return;

        // if (this.eater.yDirection === 1) return;
        // this.eater.yDirection = -1;
        // this.eater.xDirection = 0;
      }
      if (event.key === "ArrowDown") {
        this.eater.direction = "down";
        // if (this.eater.direction === "up") return;

        // if (this.eater.yDirection === -1) return;
        // this.eater.yDirection = 1;
        // this.eater.xDirection = 0;
      }
      if (event.key === "ArrowLeft") {
        this.eater.direction = "left";
        // if (this.eater.direction === "right") return;

        // if (this.eater.yDirection === 1) return;
        // this.eater.yDirection = 0;
        // this.eater.xDirection = -1;
      }
      if (event.key === "ArrowRight") {
        this.eater.direction = "right";
        // if (this.eater.direction === "left") return;

        // if (this.eater.yDirection === -1) return;
        // this.eater.yDirection = 0;
        // this.eater.xDirection = 1;
      }
    });
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  runLogic() {
    this.eater.runLogic();
  }

  /* doesn´t work
  addSouls() {
    if (Math.random() < 0.03) {
      this.soul = new Soul(this);
      this.souls.push(soul);
      console.log("random souls");
    }
  }
  */

  draw() {
    this.soul.draw();
    this.eater.draw();
    // this.tilemap.draw();
    // this.score.draw();

    this.scoreElement.innerText = "Souls: " + this.score;
  }

  checkIfGameIsOver() {
    let gameOver = false;
    const headPart = this.eater.parts[this.eater.parts.length - 1];

    /*    // prevent starting with GameOver
    if (this.eater.yDirection === 0 && this.eater.xDirection === 0) {
      return false;
    }   */

    // Boundries
    if (headPart.x < 0) {
      gameOver = true;
    } else if (headPart.x === this.tileCount) {
      gameOver = true;
    } else if (headPart.y < 0) {
      gameOver = true;
    } else if (headPart.y === this.tileCount) {
      gameOver = true;
    }

    /*
    // wibis
    if (this.eater.headX < 0) {
      gameOver = true;
    } else if (this.eater.headX === this.tileCount) {
      gameOver = true;
    } else if (this.eater.headY < 0) {
      gameOver = true;
    } else if (this.eater.headY === this.tileCount) {
      gameOver = true;
    }
    */

    // AutoCollision
    for (let part of this.eater.parts) {
      if (part !== headPart && part.x === headPart.x && part.y === headPart.y) {
        gameOver = true;
      }
    }
    // it´s missing the case, where it´s not possible to go in the
    // opposite direction, butthis one doesn´t work :(
    /*
    for (let part of this.eater.parts) {
      if (part === 0 && headPart === 0) {
        gameOver = false;
      }
      if (part.x === headPart.x && part.y === headPart.y) {
        gameOver = true;
      }
    }
    */

    /* 
    // wibis
    for (let i = 0; i > this.eater.eaterParts.length; i++) {
      let part = eaterParts[i];
      if (
        part.eater.x === this.eater.headX &&
        part.eater.y === this.eater.headY
      ) {
        gameOver = true;
        break;
      }
    }
    */

    return gameOver;
  }

  start() {
    this.reset();
    this.intervalId = setInterval(() => {
      this.loop();
    }, 1000 / this.speed);
  }

  loop() {
    this.runLogic();

    this.clear();
    this.draw();

    //stopps if GameOver
    let result = this.checkIfGameIsOver();
    if (result) {
      this.gameScreenElement.style.display = "none";
      this.gameOverScreenElement.style.display = "";

      clearInterval(this.intervalId);
    }
  }
}
