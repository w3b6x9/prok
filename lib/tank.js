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
    this.direction = [0, 0];
    this.health = 10;
    this.power = this.power.bind(this);
    this.stop = this.stop.bind(this);
  }

  draw(ctx) {
    const degree = Math.atan2((this.mousePos[1] - 80 - this.pos[1]), (this.mousePos[0] - 80 - this.pos[0]));
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(degree);
    ctx.fillStyle = '#959595';
    ctx.rect(0, -8, 40, 15);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#676764';
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = DEFAULTS.COLOR;
    ctx.arc(
      0, 0, 20, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.translate(0, 0);
    ctx.restore();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#09acb9';
    ctx.stroke();

    if (this.health < 10) {
      const percent = this.health / 10;
      const posX = this.pos[0] - 22;
      const posY = this.pos[1] + 32;
      const width = 45;
      const height = 5;

      ctx.fillStyle = '#676764';
      ctx.fillRect(posX, posY, width + 3, height + 3);
      ctx.stroke();

      ctx.fillStyle = '#76FF03';
      ctx.fillRect(posX + 1.5, posY + 1.5, width * percent, height);
    }
  }

  fireBullet() {
    const relVel = Util.scale(
      Util.dir(this.mousePos),
      5
    );
    const degree = Math.atan2((this.mousePos[1] - 80 - this.pos[1]), (this.mousePos[0] - 80 - this.pos[0]));
    const bulletOrigin = [this.pos[0] + 40 * Math.cos(degree), this.pos[1] + 40 * Math.sin(degree)];
    const bulletVel = Util.bulletVel(degree, 4);
    const bullet = new Bullet({
      originPos: bulletOrigin,
      pos: bulletOrigin,
      vel: bulletVel,
      color: DEFAULTS.COLOR,
      game: this.game,
    });

    this.game.add(bullet);
  }

  power(direction) {
    if (Math.abs(this.vel[0]) <= 4 || Math.abs(this.vel[1] <= 4)) {
      this.vel[0] += Math.sqrt(Math.pow(direction[0], 2) + Math.pow(this.vel[1], 2)) * direction[0] / 2;
      this.vel[1] += Math.sqrt(Math.pow(direction[1], 2) + Math.pow(this.vel[0], 2)) * direction[1] / 2;
    }

    // if (Math.abs(this.vel[1]) <= 2) {
    //   this.vel[1] += direction[1];
    // }

    if (this.vel[0] > 4) {
      this.vel[0] = 4;
    }

    if (this.vel[0] < -4) {
      this.vel[0] = -4;
    }

    if (this.vel[1] > 4) {
      this.vel[1] = 4;
    }

    if (this.vel[1] < -4) {
      this.vel[1] = -4;
    }
  }

  stop() {
    this.vel[0] = this.vel[0] * .99;
    this.vel[1] = this.vel[1] * .99;
  }
}
