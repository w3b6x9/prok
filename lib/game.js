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

  reboundWall(pos, vel) {
    if (pos[0] < 0 || pos[0] > DIM_X - 40) {
      return [-vel[0], vel[1]];
    } else if (pos[1] < 0 || pos[1] > DIM_Y - 40) {
      return [vel[0], -vel[1]];
    } else {
      return vel;
    }
  }

  checkCollisions() {
    for (let i = 0; i < this.squares.length - 1; i++) {
      const square1 = this.squares[i];
      for (let j = i + 1; j < this.squares.length; j++) {
        const square2 = this.squares[j];
        if (square1.isCollidedWith(square2)) {
          square1.rebound();
          square2.rebound();
        }
      }
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }
}

const DIM_X = window.innerWidth;
const DIM_Y = window.innerHeight;
const NUM_SQUARES = 30;