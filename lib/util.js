export default class Util {
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return this.scale([Math.sin(deg), Math.cos(deg)], length);
  }

  scale(vec, length) {
    return [vec[0] * length, vec[1] * length];
  }
}
