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
    this.speed = 2;

    this.pauseImg = new Image();
    this.pauseImg.src = "/images/tiles/stripes_sm.png";

    this.setControls();
    this.isPaused = false;
    this.soundtrack = new Audio("/sound/soulEater_LANG_KLEIN.mp3"); // from SonjaDeffner|Kalme
    this.soundtrack.loop = true;
    this.soundtrack.volume = 1;
    this.gameOverNoiseURL = "/sound/soulEater_gameOver.wav"; // from SonjaDeffner|Kalme
    this.gameOverNoise = new Audio(this.gameOverNoiseURL);
    this.reset();
  }

  reset() {
    this.soundtrack.play();
    this.score = 0;
    this.eater = new Eater(this);
    this.souls = [new Soul(this)];
  }

  setControls() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" && this.eater.direction !== "down") {
        this.eater.direction = "up";
      }
      if (event.key === "ArrowDown" && this.eater.direction !== "up") {
        this.eater.direction = "down";
      }
      if (event.key === "ArrowLeft" && this.eater.direction !== "right") {
        this.eater.direction = "left";
      }
      if (event.key === "ArrowRight" && this.eater.direction !== "left") {
        this.eater.direction = "right";
      }
      if (event.key === " ") {
        if (this.isPaused) {
          this.resumeGame();
        } else {
          this.pauseGame();
        }
      }
    });
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  runLogic() {
    this.eater.runLogic();
  }

  addSouls() {
    if (Math.random() < 0.1) {
      const soul = new Soul(this);
      this.souls.push(soul);
    }
  }

  draw() {
    this.souls.forEach((soul) => {
      soul.draw();
    });
    this.eater.draw();

    this.scoreElement.innerText = "Souls: " + this.score;
  }

  checkIfGameIsOver() {
    let gameOver = false;
    const headPart = this.eater.parts[this.eater.parts.length - 1];

    if (headPart.x < 0) {
      gameOver = true;
    } else if (headPart.x === this.tileCount) {
      gameOver = true;
    } else if (headPart.y < 0) {
      gameOver = true;
    } else if (headPart.y === this.tileCount) {
      gameOver = true;
    }

    for (let part of this.eater.parts) {
      if (part[0] === headPart) {
        gameOver = false;
      }
      if (part !== headPart && part.x === headPart.x && part.y === headPart.y) {
        gameOver = true;
      }
    }
    return gameOver;
  }

  start() {
    this.reset();
    this.intervalId = setInterval(() => {
      this.loop();
    }, 1000 / this.speed);
  }

  pauseGame() {
    clearInterval(this.intervalId);
    this.isPaused = true;
    this.context.fillStyle = "palegreen";
    this.context.font = "30px Lilliput Steps";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("Eating Paused", 200, 200);
  }

  resumeGame() {
    this.isPaused = false;
    this.clear();
    this.canvas.style.opacity = 1;
    this.intervalId = setInterval(() => {
      this.loop();
    }, 1000 / this.speed);
  }

  loop() {
    this.runLogic();
    this.clear();
    this.draw();

    let result = this.checkIfGameIsOver();
    if (result) {
      this.gameScreenElement.style.display = "none";
      this.gameOverScreenElement.style.display = "";
      console.dir(this.gameOverScreenElement);
      const counterElement =
        (this.gameOverScreenElement.children[1].firstElementChild.innerText =
          this.score);
      this.gameOverNoise.play();
      this.gameOverNoise.volume = 1;
      clearInterval(this.intervalId);
    }
  }
}
