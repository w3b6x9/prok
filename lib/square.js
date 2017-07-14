import * as Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
  COLOR: '#FFE95E',
  SPEED: 0.15,
  LENGTH: 10,
};

export default class Square extends MovingObject {
  constructor(settings = {}) {
    settings.color = DEFAULTS.COLOR;
    settings.pos = settings.pos || settings.game.randomPosition();
    settings.vel = settings.vel || Util.randomVec(DEFAULTS.SPEED);
    super(settings);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 28, 28);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#abad19';
    ctx.stroke();
  }

  rebound() {
    this.vel = this.vel.map(el => -el);
  }
}
