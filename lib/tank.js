import MovingObject from './moving_object';
import * as Util from './util';
import Bullet from './bullet';

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
    this.mousePos = [100, 100];
  }

  draw(ctx) {
    const degree = Math.atan2((this.mousePos[1] - this.pos[1]), (this.mousePos[0] - this.pos[0]));
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(degree);
    ctx.fillStyle = '#959595';
    ctx.fillRect(-2, -10, 50, 20);

    ctx.fillStyle = DEFAULTS.COLOR;
    ctx.beginPath();
    ctx.arc(
      0, 0, 25, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.translate(0, 0);
    ctx.restore();
  }

  fireBullet() {
    const relVel = Util.scale(
      Util.dir(this.tank.mousePos),
      5
    );

    const degree = Math.atan2((this.tank.mousePos[1] - this.tank.pos[1]), (this.tank.mousePos[0] - this.tank.pos[0]));
    console.log(degree);
    const bulletVel = Util.bulletVel(degree, 5);
    console.log(bulletVel);
    const bullet = new Bullet({
      pos: this.tank.pos,
      vel: bulletVel,
      color: DEFAULTS.COLOR,
      game: this.game,
    });

    this.game.add(bullet);
  }

  power(direction) {
    this.vel[0] += direction[0];
    this.vel[1] += direction[1];
  }
}
