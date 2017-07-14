/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const randomVec = length => {
  const deg = 2 * Math.PI * Math.random();
  return scale([Math.sin(deg), Math.cos(deg)], length);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = randomVec;


const scale = (vec, length) => {
  return [vec[0] * length, vec[1] * length];
};
/* harmony export (immutable) */ __webpack_exports__["e"] = scale;


const dist = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
};
/* harmony export (immutable) */ __webpack_exports__["c"] = dist;


const norm = vec => {
  return dist([0, 0], vec);
};
/* unused harmony export norm */


const dir = vec => {
  return scale(vec, norm(vec));
};
/* harmony export (immutable) */ __webpack_exports__["b"] = dir;


const bulletVel = (deg, length) => {
  return scale([Math.cos(deg), Math.sin(deg)], length);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = bulletVel;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__square__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tank__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(0);





class Game {
  constructor() {
    this.squares = [];
    this.tanks = [];
    this.bullets = [];

    this.addSquares();
    this.addTank();
  }

  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__square__["a" /* default */]) {
      this.squares.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__tank__["a" /* default */]) {
      this.tanks.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]) {
      this.bullets.push(object);
    }
  }

  addSquares() {
    for (let i = 0; i < NUM_SQUARES; i++) {
      this.add(new __WEBPACK_IMPORTED_MODULE_0__square__["a" /* default */]({ game: this }));
    }
  }

  addTank() {
    const tank = new __WEBPACK_IMPORTED_MODULE_1__tank__["a" /* default */]({ game: this });
    this.add(tank);

    return tank;
  }

  allObjects() {
    return [].concat(this.tanks, this.squares, this.bullets);
  }

  randomPosition() {
    return [
      ((DIM_X - 30) * Math.random()),
      ((DIM_Y - 30) * Math.random())
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
    if (object instanceof __WEBPACK_IMPORTED_MODULE_1__tank__["a" /* default */]) {
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
    if ((firstObject instanceof __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]) && (secondObject instanceof __WEBPACK_IMPORTED_MODULE_0__square__["a" /* default */])) {
      const centerDist = __WEBPACK_IMPORTED_MODULE_3__util__["c" /* dist */](firstObject.pos, secondObject.pos);
      return centerDist < 27;
    } else if ((firstObject instanceof __WEBPACK_IMPORTED_MODULE_1__tank__["a" /* default */]) && (secondObject instanceof __WEBPACK_IMPORTED_MODULE_0__square__["a" /* default */])) {
      const centerDist = __WEBPACK_IMPORTED_MODULE_3__util__["c" /* dist */](firstObject.pos, secondObject.pos);
      return centerDist < 54;
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

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
    this.checkBulletSquareCollisions();
    this.checkTankSquareCollisions();
    this.bulletRemoval();
  }

  remove(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__square__["a" /* default */]) {
      this.squares.splice(this.squares.indexOf(object), 1);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }
  }

  bulletRemoval() {
    for (let i = 0; i < this.bullets.length; i++) {
      const distanceTravelled = __WEBPACK_IMPORTED_MODULE_3__util__["c" /* dist */](this.bullets[i].pos, this.bullets[i].originPos);
      if (distanceTravelled > 350) {
        this.remove(this.bullets[i]);
      }
    }
  }

  isWon() {
    return this.squares.length === 0;
  }

  isLost() {
    return this.tanks[0].health === 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Game;


const DIM_X = window.innerWidth - 200;
/* harmony export (immutable) */ __webpack_exports__["a"] = DIM_X;

const DIM_Y = window.innerHeight - 150;
/* harmony export (immutable) */ __webpack_exports__["b"] = DIM_Y;

const NUM_SQUARES = 10;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class MovingObject {
  constructor(settings) {
    this.pos = settings.pos;
    this.vel = settings.vel;
    this.color = settings.color;
    this.game = settings.game;
  }

  move(timeDelta) {
    const velocityScale = 1 || timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.vel = this.game.reboundWall(this, this.pos, this.vel);
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;
    const posOffsetX = (this.pos[0] + offsetX);
    const posOffsetY = (this.pos[1] + offsetY);

    this.pos = [posOffsetX, posOffsetY];
  }

  isCollidedWith(otherObject) {
    const centerDist = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* dist */](this.pos, otherObject.pos);
    return centerDist < 30;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MovingObject;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_game_view__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vendor_keymaster__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vendor_keymaster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vendor_keymaster__);




document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = window.innerWidth - 200;
  gameCanvas.height = window.innerHeight - 150;

  const ctx = gameCanvas.getContext('2d');

  startGame(gameCanvas, ctx);
});

const startGame = (gameCanvas, ctx) => {
  document.getElementById('input-player').addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      document.getElementById('start-game').style['display'] = 'none';
      return new __WEBPACK_IMPORTED_MODULE_1__lib_game_view__["a" /* default */](gameCanvas, new __WEBPACK_IMPORTED_MODULE_0__lib_game__["c" /* default */](), ctx).start(gameCanvas);
    }
  });
};
/* harmony export (immutable) */ __webpack_exports__["startGame"] = startGame;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__moving_object__ = __webpack_require__(2);



const DEFAULTS = {
  COLOR: '#0CD7E8',
  SPEED: 7,
};

class Bullet extends __WEBPACK_IMPORTED_MODULE_1__moving_object__["a" /* default */] {
  constructor(settings) {
    settings.color = DEFAULTS.COLOR;
    super(settings);
    this.originPos = settings.originPos;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 7, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = DEFAULTS.COLOR;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#09acb9';
    ctx.stroke();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__moving_object__ = __webpack_require__(2);



const DEFAULTS = {
  COLOR: '#FFE95E',
  SPEED: 0.15,
  LENGTH: 10,
};

class Square extends __WEBPACK_IMPORTED_MODULE_1__moving_object__["a" /* default */] {
  constructor(settings = {}) {
    settings.color = DEFAULTS.COLOR;
    settings.pos = settings.pos || settings.game.randomPosition();
    settings.vel = settings.vel || __WEBPACK_IMPORTED_MODULE_0__util__["d" /* randomVec */](DEFAULTS.SPEED);
    super(settings);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 28, 28);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#abad19';
    ctx.stroke();
  }

  rebound() {
    this.vel = this.vel.map(el => -el);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Square;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet__ = __webpack_require__(4);




const DEFAULTS = {
  COLOR: '#0CD7E8',
  SPEED: 4,
};

class Tank extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(settings = {}) {
    settings.pos = settings.pos || [0, 0];
    settings.vel = settings.vel || [0, 0];
    super(settings);
    this.pos = [100, 100];
    this.mousePos = [100, 100];
    this.direction = [0, 0];
    this.health = 10;
  }

  draw(ctx) {
    const degree = Math.atan2((this.mousePos[1] - 80 - this.pos[1]), (this.mousePos[0] - 80 - this.pos[0]));
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(degree);
    ctx.fillStyle = '#959595';
    ctx.rect(0, -8, 40, 15);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#676764';
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = DEFAULTS.COLOR;
    ctx.arc(
      0, 0, 20, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.translate(0, 0);
    ctx.restore();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#09acb9';
    ctx.stroke();

    if (this.health < 10) {
      const percent = this.health / 10;
      const posX = this.pos[0] - 22;
      const posY = this.pos[1] + 32;
      const width = 45;
      const height = 5;

      ctx.fillStyle = '#676764';
      ctx.fillRect(posX, posY, width + 3, height + 3);
      ctx.stroke();

      ctx.fillStyle = '#76FF03';
      ctx.fillRect(posX + 1.5, posY + 1.5, width * percent, height);
    }
  }

  fireBullet() {
    const relVel = __WEBPACK_IMPORTED_MODULE_1__util__["e" /* scale */](
      __WEBPACK_IMPORTED_MODULE_1__util__["b" /* dir */](this.tank.mousePos),
      5
    );
    const degree = Math.atan2((this.tank.mousePos[1] - 80 - this.tank.pos[1]), (this.tank.mousePos[0] - 80 - this.tank.pos[0]));
    const bulletOrigin = [this.tank.pos[0] + 40 * Math.cos(degree), this.tank.pos[1] + 40 * Math.sin(degree)];
    const bulletVel = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* bulletVel */](degree, 4);
    const bullet = new __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]({
      originPos: bulletOrigin,
      pos: bulletOrigin,
      vel: bulletVel,
      color: DEFAULTS.COLOR,
      game: this.game,
    });

    this.game.add(bullet);
  }

  power(direction) {
    if (Math.abs(this.vel[0]) < 2) {
      this.vel[0] += direction[0];
    }

    if (Math.abs(this.vel[1]) < 2) {
      this.vel[1] += direction[1];
    }
  }

  stop() {
    this.vel = [0, 0];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tank;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prok__ = __webpack_require__(3);




class GameView {
  constructor(gameCanvas, game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.gameCanvas = gameCanvas;
    this.tank = this.game.tanks[0];
  }

  bindKeyHandlers() {
    const tank = this.tank;

    Object.keys(MOVES).forEach(k => {
      let move = MOVES[k];

      document.addEventListener('keydown', e => {
        if (e.keyCode === Number(k)) {
          tank.power(move);
        }
      });

      document.addEventListener('keyup', e => {
        if (e.keyCode === Number(k)) {
          tank.stop();
        }
      });
    });
  }

  bindMousePos(gameCanvas) {
    window.addEventListener('mousemove', this.getMousePos.bind(this), false);
    gameCanvas.addEventListener('click', this.tank.fireBullet.bind(this));
  }

  getMousePos(e) {
    this.tank.mousePos = [e.clientX, e.clientY];
  }

  start(gameCanvas) {
    this.bindKeyHandlers();
    this.bindMousePos(gameCanvas);
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    const myReq = requestAnimationFrame(this.animate.bind(this));
    this.gameOver(myReq);
  }

  gameOver(myReq) {
    if (this.game.isLost()) {
      cancelAnimationFrame(myReq);
      this.playButton('lost');
    } else if (this.game.isWon()) {
      cancelAnimationFrame(myReq);
      this.playButton('won');
    }
  }

  playButton(result) {
    const playButton = document.getElementById('play-btn');
    const endGameNode = document.getElementById('end-game');
    const startGameNode = document.getElementById('start-game');
    const resultTextNode = document.getElementById('result-text');

    if (result === 'lost') {
      resultTextNode.innerHTML = 'Sorry, you\'ve lost.';
    } else if (result === 'won') {
      resultTextNode.innerHTML = 'Congrats, you\'ve won!';
    }

    playButton.addEventListener('click', () => {
      endGameNode.style['display'] = 'none';
      startGameNode.style['display'] = 'flex';
      this.ctx.clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__game__["a" /* DIM_X */], __WEBPACK_IMPORTED_MODULE_0__game__["b" /* DIM_Y */]);
      document.getElementById('input-player').focus();
    });

    endGameNode.style['display'] = 'flex';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameView;


const MOVES = {
  '87': [0, -2],
  '65': [-2,  0],
  '83': [0,  2],
  '68': [2,  0],
  '38': [0, -2],
  '37': [-2, 0],
  '39': [2,  0],
  '40': [0, 2],
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  };

  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  };

  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  };

  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0]
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
      }

      key = keys[keys.length - 1];
      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  };

  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all' };
  function getScope(){ return _scope || 'all' };

  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  };

  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  if(true) module.exports = assignKey;

})(this);


/***/ })
/******/ ]);