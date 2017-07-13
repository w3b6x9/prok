import Game from './game';
import { DIM_X, DIM_Y } from './game';
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

      document.addEventListener('keydown', e => {
        if (e.keyCode === Number(k)) {
          tank.power(move);
        }
      });

      document.addEventListener('keyup', e => {
        if (e.keyCode === Number(k)) {
          tank.stop();
        }
      });
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
    if (this.game.isLost()) {
      cancelAnimationFrame(myReq);
      this.playButton('lost');
    } else if (this.game.isWon()) {
      cancelAnimationFrame(myReq);
      this.playButton('won');
    }
  }

  playButton(result) {
    const playButton = document.getElementById('play-btn');
    const endGameNode = document.getElementById('end-game');
    const startGameNode = document.getElementById('start-game');
    const resultTextNode = document.getElementById('result-text');

    if (result === 'lost') {
      resultTextNode.innerHTML = 'Sorry, you\'ve lost.';
    } else if (result === 'won') {
      resultTextNode.innerHTML = 'Congrats, you\'ve won!';
    }

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
  '87': [0, -2],
  '65': [-2,  0],
  '83': [0,  2],
  '68': [2,  0],
  '38': [0, -2],
  '37': [-2, 0],
  '39': [2,  0],
  '40': [0, 2],
};
