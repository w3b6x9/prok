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
    this.originPos = settings.originPos;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 7, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = DEFAULTS.COLOR;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#09acb9';
    ctx.stroke();
  }
}
