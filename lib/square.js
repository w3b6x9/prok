import Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
  COLOR: '#FFE95E',
  SPEED: 4,
  LENGTH: 10,
};

export default class Square extends MovingObject {
  constructor(settings = {}) {
    settings.color = DEFAULTS.COLOR;
    settings.pos = settings.pos || settings.game.randomPosition();
    settings.vel = settings.vel || Util.prototype.randomVec(DEFAULTS.SPEED);
    super(settings);
  }
}
