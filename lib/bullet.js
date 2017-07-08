import * as Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
  COLOR: '#0CD7E8',
  SPEED: 7,
};

export default class Bullet extends MovingObject {
  constructor(settings) {
    settings.color = DEFAULTS.COLOR;
    super(settings);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 25, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = DEFAULTS.COLOR;
    ctx.fill();
  }
}
