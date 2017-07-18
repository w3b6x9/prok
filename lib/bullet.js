import * as Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
  SPEED: 7,
};

export default class Bullet extends MovingObject {
  constructor(settings) {
    settings.background = settings.background;
    settings.border = settings.border;
    super(settings);
    this.originPos = settings.originPos;
    this.background = settings.background;
    this.border = settings.border;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 7, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = this.background;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.border;
    ctx.stroke();
  }
}
