import MovingObject from './moving_object';
import * as Util from './util';

const DEFAULTS = {
  COLOR: '#0CD7E8',
  SPEED: 4,
};

export default class Tank extends MovingObject {
  constructor(settings = {}) {
    settings.pos = settings.pos || [0, 0];
    settings.vel = settings.vel || [0, 0];
    super(settings);
    this.pos = [100, 100];
  }

  draw(ctx) {
    ctx.fillStyle = '#959595';
    ctx.fillRect(this.pos[0] - 2, this.pos[1] - 10, 49, 20);

    ctx.fillStyle = DEFAULTS.COLOR;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 25, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  power(direction) {
    this.vel[0] += direction[0];
    this.vel[1] += direction[1];
  }
}
