import Square from './square';
import Tank from './tank';
import Bullet from './bullet';
import * as Util from './util';

export default class Game {
  constructor() {
    this.squares = [];
    this.tanks = [];
    this.bullets = [];

    this.addSquares();
  }

  add(object) {
    if (object instanceof Square) {
      this.squares.push(object);
    } else if (object instanceof Tank) {
      this.tanks.push(object);
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    }
  }

  addSquares() {
    for (let i = 0; i < NUM_SQUARES; i++) {
      this.add(new Square({ game: this }));
    }
  }

  addTank() {
    const tank = new Tank({ game: this });
    this.add(tank);

    return tank;
  }

  allObjects() {
    return [].concat(this.tanks, this.squares, this.bullets);
  }

  randomPosition() {
    return [
      DIM_X * Math.random(),
      DIM_Y * Math.random()
    ];
  }

  moveObjects(delta) {
    this.allObjects().forEach(object => {
      object.move(delta);
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  reboundWall(object, pos, vel) {
    if (object instanceof Tank) {
      if (pos[0] < 20 || pos[1] < 20) {
        return [0.3, 0.3];
      } else if (pos[0] > DIM_X - 20 || pos[1] > DIM_Y - 20) {
        return [-0.3, -0.3];
      } else {
        return vel;
      }
    } else if (pos[0] < 0 || pos[0] > DIM_X - 28) {
      return [-vel[0], vel[1]];
    } else if (pos[1] < 0 || pos[1] > DIM_Y - 28) {
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

  collidesTogether(firstObject, secondObject) {
    if ((firstObject instanceof Bullet) && (secondObject instanceof Square)) {
      const centerDist = Util.dist(firstObject.pos, secondObject.pos);
      return centerDist < 27;
    }
  }

  checkBulletSquareCollisions() {
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < this.squares.length; j++) {
        if (this.collidesTogether(this.bullets[i], this.squares[j])) {
          this.remove(this.squares[j]);
          this.remove(this.bullets[i]);
        }
      }
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
    this.checkBulletSquareCollisions();
    this.bulletRemoval();
  }

  remove(object) {
    if (object instanceof Square) {
      this.squares.splice(this.squares.indexOf(object), 1);
    } else if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }
  }

  bulletRemoval() {
    for (let i = 0; i < this.bullets.length; i++) {
      const distanceTravelled = Util.dist(this.bullets[i].pos, this.bullets[i].originPos);
      if (distanceTravelled > 350) {
        this.remove(this.bullets[i]);
      }
    }
  }
}

const DIM_X = window.innerWidth - 200;
const DIM_Y = window.innerHeight - 150;
const NUM_SQUARES = 15;
