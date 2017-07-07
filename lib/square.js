import * as Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
  COLOR: '#FFE95E',
  SPEED: 1,
  LENGTH: 10,
};

export default class Square extends MovingObject {
  constructor(settings = {}) {
    settings.color = DEFAULTS.COLOR;
    settings.pos = settings.pos || settings.game.randomPosition();
    settings.vel = settings.vel || Util.randomVec(DEFAULTS.SPEED);
    super(settings);
  }

  rebound() {
    this.vel = this.vel.map(el => -el);
  }
}
