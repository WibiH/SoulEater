class Score {
  constructor(game) {
    this.game = game;
  }

  draw() {
    const context = this.game.context;
    const scoreElement = document.getElementsById("score");
    const score = 0;
    scoreElement.innerText = "Souls: " + score;

    const scoreGameOver = document.getElementById("endScore");
    scoreGameOver.innerText = score;

    context.save();

    context.restore();
  }
}
