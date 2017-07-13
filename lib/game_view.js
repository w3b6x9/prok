import Game from './game';
import { DIM_X, DIM_Y } from './game';
import key from '../vendor/keymaster';
import { startGame } from '../prok';

export default class GameView {
  constructor(gameCanvas, game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.gameCanvas = gameCanvas;
    this.tank = this.game.tanks[0];
  }

  bindKeyHandlers() {
    const tank = this.tank;

    Object.keys(MOVES).forEach(k => {
      let move = MOVES[k];

      key(k, () => { tank.power(move); });
    });
  }

  bindMousePos(gameCanvas) {
    window.addEventListener('mousemove', this.getMousePos.bind(this), false);
    gameCanvas.addEventListener('click', this.tank.fireBullet.bind(this));
  }

  getMousePos(e) {
    this.tank.mousePos = [e.clientX, e.clientY];
  }

  start(gameCanvas) {
    this.bindKeyHandlers();
    this.bindMousePos(gameCanvas);
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    const myReq = requestAnimationFrame(this.animate.bind(this));
    this.gameOver(myReq);
  }

  gameOver(myReq) {
    if (this.game.isWon()) {
      cancelAnimationFrame(myReq);
      this.playButton();
    }
  }

  playButton() {
    const playButton = document.getElementById('play-btn');
    const endGameNode = document.getElementById('end-game');
    const startGameNode = document.getElementById('start-game');

    playButton.addEventListener('click', () => {
      endGameNode.style['display'] = 'none';
      startGameNode.style['display'] = 'flex';
      this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
      document.getElementById('input-player').focus();
    });

    endGameNode.style['display'] = 'flex';
  }
}

const MOVES = {
  'w':     [0, -1],
  'a':     [-1,  0],
  's':     [0,  1],
  'd':     [1,  0],
  'up':    [0, -1],
  'left':  [-1, 0],
  'right': [1,  0],
  'down':  [0, 1],
};
