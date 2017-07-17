import * as Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
  COLOR: '#F44336',
  SPEED: 0.15,
  LENGTH: 10,
};

export default class Triangle extends MovingObject {
  constructor(settings = {}) {
    settings.color = DEFAULTS.COLOR;
    settings.pos = settings.game.randomPosition();
    settings.vel = settings.vel || Util.randomVec(DEFAULTS.SPEED);
    super(settings);
    this.health = 4;
  }

  draw(ctx) {
    // ctx.beginPath();
    // ctx.moveTo(60, 50);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.fillStyle = DEFAULTS.COLOR;
    // ctx.fill();
  }

  rebound() {
    this.vel = this.vel.map(el => -el);
  }
}
