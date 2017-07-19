import Game from './game';
import { DIM_X, DIM_Y, NUM_SQUARES } from './game';
import { startGame } from '../prok';
import * as Util from './util';

export default class GameView {
  constructor(gameCanvas, game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.gameCanvas = gameCanvas;
    this.tank = this.game.tanks[0];
    this.keys = {
      37: {down:false, action:() => this.tank.power([-1.5, 0])},
      38: {down:false, action:() => this.tank.power([0, -1.5])},
      39: {down:false, action:() => this.tank.power([1.5, 0])},
      40: {down:false, action:() => this.tank.power([0, 1.5])},

      65: {down:false, action:() => this.tank.power([-1.5, 0])},
      68: {down:false, action:() => this.tank.power([1.5, 0])},
      83: {down:false, action:() => this.tank.power([0, 1.5])},
      87: {down:false, action:() => this.tank.power([0, -1.5])},
    };
  }

  bindMousePos(gameCanvas) {
    window.addEventListener('mousemove', this.getMousePos.bind(this), false);
    gameCanvas.addEventListener('click', this.tank.fireBullet.bind(this.tank));
  }

  getMousePos(e) {
    this.tank.mousePos = [e.clientX, e.clientY];
  }

  compTanksFire() {
    const tanks = this.game.tanks;

    for (let i = 1; i < tanks.length; i++) {
      setInterval(() => {
        tanks[i].fireBullet();
      }, (1000 * Math.random() + 300));
    }
  }

  compTanksFirePos() {
    const tanks = this.game.tanks;

    for (let i = 1; i < tanks.length; i++) {

      setInterval(() => {
        tanks[i].mousePos = [tanks[0].pos[0] + 80, tanks[0].pos[1] + 80];
      }, 3000);
    }
  }

  compTanksMove() {
    const tanks = this.game.tanks;

    for (let i = 1; i < tanks.length; i++) {
      const distance = Util.dist(tanks[0].pos, tanks[i].pos);
      const x = .5 / distance * (tanks[0].pos[0] - tanks[i].pos[0]);
      const y = .5 / distance * (tanks[0].pos[1] - tanks[i].pos[1]);

      tanks[i].vel = [x, y];
    }
  }


  replaceSquare() {
    if (this.game.squares.length !== NUM_SQUARES) {
      this.game.addSquares(1);
    }
  }

  start(gameCanvas) {
    document.addEventListener('keydown', e => {
      if (this.keys[e.keyCode]) {
        this.keys[e.keyCode].down = true ;
      }
    });

    document.addEventListener('keyup', e => {
      if (this.keys[e.keyCode]) {
        this.keys[e.keyCode].down = false;
      }
    });

    document.addEventListener('keypress', e => {
      if (e.keyCode === 32) {
        this.tank.fireBullet();
      }
    });

    this.bindMousePos(gameCanvas);
    this.compTanksFire();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    for (var key in this.keys) {
      if (this.keys[key].down) {
        this.keys[key].action();
      }
    }

    const timeDelta = time - this.lastTime;

    this.replaceSquare(1);
    this.compTanksFirePos();
    this.compTanksMove();

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
