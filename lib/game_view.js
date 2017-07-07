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

  bindMousePos() {
    window.addEventListener('mousemove', this.getMousePos.bind(this), false);
  }

  getMousePos(e) {
    this.tank.mousePos = [e.clientX, e.clientY];
  }

  start() {
    this.bindKeyHandlers();
    this.bindMousePos();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
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
