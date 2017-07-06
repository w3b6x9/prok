import Game from './game';

export default class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    window.setInterval(() => {
      this.game.step(1);
      this.game.draw(this.ctx);
    }, 1);
  }
}
