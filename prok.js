import Game from './lib/game';
import GameView from './lib/game_view';

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;

  gameCanvas.addEventListener('mousemove', e => {
    console.log(e.clientX, e.clientY);
  }, false);

  const ctx = gameCanvas.getContext('2d');
  const game = new Game();

  return new GameView(game, ctx).start();
});
