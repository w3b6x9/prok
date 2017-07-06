const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

export default class MovingObject {
  constructor(settings) {
    this.pos = settings.pos;
    this.vel = settings.vel;
    this.color = settings.color;
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;
    const posOffsetX = this.pos[0] + offsetX;
    const posOffsetY = this.pos[1] + offsetY;

    this.pos = [posOffsetX, posOffsetY];
  }
}
