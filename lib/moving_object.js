import * as Util from './util';

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

export default class MovingObject {
  constructor(settings) {
    this.pos = settings.pos;
    this.vel = settings.vel;
    this.color = settings.color;
    this.game = settings.game;
  }

  move(timeDelta) {
    const velocityScale = 1 || timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.vel = this.game.reboundWall(this, this.pos, this.vel);
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;
    const posOffsetX = (this.pos[0] + offsetX);
    const posOffsetY = (this.pos[1] + offsetY);

    this.pos = [posOffsetX, posOffsetY];
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < 30;
  }
}
