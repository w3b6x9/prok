const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

export default class MovingObject {
  constructor(settings) {
    this.pos = settings.pos;
    this.vel = settings.vel;
    this.color = settings.color;
    this.game = settings.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], 20, 20);
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.vel = this.game.rebound(this.pos, this.vel);
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;
    const posOffsetX = this.pos[0] + offsetX;
    const posOffsetY = this.pos[1] + offsetY;

    this.pos = [posOffsetX, posOffsetY];
  }
}
