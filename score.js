class Score {
  constructor(game) {
    this.game = game;
  }

  draw() {
    const context = this.game.context;
    const scoreElement = document.getElementById("score");
    const score = 0;
    scoreElement.innerText = "Souls: " + score;

    context.save();

    context.restore();
  }
}
