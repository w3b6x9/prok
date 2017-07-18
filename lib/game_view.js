import Game from './game';
import { DIM_X, DIM_Y } from './game';
import { startGame } from '../prok';

export default class GameView {
  constructor(gameCanvas, game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.gameCanvas = gameCanvas;
    this.tank = this.game.tanks[0];
    this.keys = {
    37:{down:false, action:() => this.tank.power([-1, 0])},
    38:{down:false, action:() => this.tank.power([1, 0])},
    39:{down:false, action:() => this.tank.power([0, 1])},
    40:{down:false, action:() => this.tank.power([0, -1])},

    65:{down:false, action:() => this.tank.power([-1, 0])},
    68:{down:false, action:() => this.tank.power([1, 0])},
    83:{down:false, action:() => this.tank.power([0, 1])},
    87:{down:false, action:() => this.tank.power([0, -1])},

};
  }


  bindMousePos(gameCanvas) {
    window.addEventListener('mousemove', this.getMousePos.bind(this), false);
    gameCanvas.addEventListener('click', this.tank.fireBullet.bind(this.tank));
  }

  getMousePos(e) {
    this.tank.mousePos = [e.clientX, e.clientY];
  }

  start(gameCanvas) {
    document.addEventListener('keydown', e => {
      debugger
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
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {


  for(var key in this.keys) {

    if(this.keys[key].down) {
      this.keys[key].action();
    }
  }
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
