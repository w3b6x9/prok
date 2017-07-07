import * as Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
  COLOR: '#0CD7E8',
  SPEED: 7,
};

export default class Bullet extends MovingObject {
  constructor(settings) {
    super(settings);
  }
}
