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
    this.health = 2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 28, 28);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#abad19';
    ctx.stroke();

    if (this.health < 2) {
      const percent = this.health / 2;
      const posX = this.pos[0] - 2;
      const posY = this.pos[1] + 35;
      const width = 30;
      const height = 5;

      ctx.fillStyle = '#676764';
      ctx.fillRect(posX, posY, width + 3, height + 3);
      ctx.stroke();

      ctx.fillStyle = '#76FF03';
      ctx.fillRect(posX + 1.5, posY + 1.5, width * percent, height);
    }
  }

  rebound() {
    this.vel = this.vel.map(el => -el);
  }
}
