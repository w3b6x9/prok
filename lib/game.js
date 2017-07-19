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
    this.addTanks();
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

  addSquares(n = NUM_SQUARES) {
    for (let i = 0; i < n; i++) {
      this.add(new Square({ game: this }));
    }
  }

  addTanks() {
    const tank = new Tank({
      game: this,
      background: '#0CD7E8',
      border: '#09acb9',
      pos: MID_POS,
    });

    this.add(tank);

    for (let i = 0; i < 4; i++) {
      this.compTank();
    }

    setInterval(() => this.compTank(), 3500);
  }

  compTank() {
    const randomPos = this.randomPosition();
    const compTank = new Tank({
      game: this,
      background: '#ff3232',
      border: '#cc0000',
      pos: randomPos,
      mousePos: MID_POS,
    });

    this.add(compTank);
  }

  allObjects() {
    return [].concat(this.tanks, this.squares, this.bullets);
  }

  randomPosition() {
    return [
      ((DIM_X - 40) * Math.random()),
      ((DIM_Y - 40) * Math.random())
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
        return [0.1, 0.1];
      } else if (pos[0] > DIM_X - 20 || pos[1] > DIM_Y - 20) {
        return [-0.1, -0.1];
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
    } else if ((firstObject instanceof Tank) && (secondObject instanceof Square)) {
      const centerDist = Util.dist(firstObject.pos, secondObject.pos);
      return centerDist < 54;
    } else if ((firstObject instanceof Bullet) && (secondObject instanceof Tank)) {
      const centerDist = Util.dist(firstObject.pos, secondObject.pos);
      return centerDist < 27;
    }
  }

  checkBulletSquareCollisions() {
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < this.squares.length; j++) {
        if (this.collidesTogether(this.bullets[i], this.squares[j])) {
          this.remove(this.bullets[i]);
          this.squares[j].health -= 1;
          if (this.squares[j].health === 0) {
            this.remove(this.squares[j]);
          }
        }
      }
    }
  }

  checkTankSquareCollisions() {
    for (let i = 0; i < this.tanks.length; i++) {
      for (let j = 0; j < this.squares.length; j++) {
        if (this.collidesTogether(this.tanks[i], this.squares[j])) {
          this.remove(this.squares[j]);
          this.tanks[i].health -= 1;
        }
      }
    }
  }

  checkBulletTankCollisions() {
    for (let i = 0; i < this.tanks.length; i++) {
      for (let j = 0; j < this.bullets.length; j++) {
        if (this.collidesTogether(this.bullets[j], this.tanks[i])) {
          this.remove(this.bullets[j]);
          this.tanks[i].health -= 2;

          if (i !== 0 && this.tanks[i].health <= 0) {
            this.remove(this.tanks[i]);
          }
        }
      }
    }
  }

  step(delta) {
    this.tanks[0].stop();
    this.moveObjects(delta);
    this.checkCollisions();
    this.checkBulletSquareCollisions();
    this.checkTankSquareCollisions();
    this.bulletRemoval();
    this.checkBulletTankCollisions();
  }

  remove(object) {
    if (object instanceof Square) {
      this.squares.splice(this.squares.indexOf(object), 1);
    } else if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Tank) {
      this.tanks.splice(this.tanks.indexOf(object), 1);
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

  isWon() {
    return this.tanks.length === 1;
  }

  isLost() {
    return this.tanks[0].health <= 0;
  }
}
export const DIM_X = window.innerWidth - 200;
export const DIM_Y = window.innerHeight - 150;
const MID_POS = [DIM_X / 2, DIM_Y / 2];
export const NUM_SQUARES = 20;
