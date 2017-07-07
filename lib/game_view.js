import Game from './game';
import key from '../vendors/keymaster';

export default class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.tank = this.game.addTank();
  }

  bindKeyHandlers() {
    const tank = this.tank;

    Object.keys(MOVES).forEach(k => {
      let move = MOVES[k];
      key(k, () => { tank.power(move); });
    });
  }

  start() {
    this.bindKeyHandlers();
    window.setInterval(() => {
      this.game.step(1);
      this.game.draw(this.ctx);
    }, 1);
  }
}

const MOVES = {
  'w':     [0, -1],
  'a':     [-1,  0],
  's':     [0,  1],
  'd':     [1,  0],
  'up':    [0, -1],
  'left':  [-1, 0],
  'down':  [0, 1],
  'right': [1,  0],
};
