import Square from './square';

export default class Game {
  constructor() {
    this.squares = [];

    this.addSquares();
  }

  add(object) {
    if (object instanceof Square) {
      this.squares.push(object);
    }
  }

  addSquares() {
    for (let i = 0; i < NUM_SQUARES; i++) {
      this.add(new Square({ game: this }));
    }
  }

  randomPosition() {
    return [
      DIM_X * Math.random(),
      DIM_Y * Math.random()
    ];
  }

  moveObjects(delta) {
    this.squares.forEach(square => {
      square.move(delta);
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.squares.forEach(object => {
      object.draw(ctx);
    });
  }

  rebound(pos, vel) {
    if (pos[0] < 0 || pos[0] > DIM_X) {
      return [-vel[0], vel[1]];
    } else if (pos[1] < 0 || pos[1] > DIM_Y) {
      return [vel[0], -vel[1]];
    } else {
      return vel;
    }
  }
}

const DIM_X = window.innerWidth;
const DIM_Y = window.innerHeight;
const NUM_SQUARES = 30;
