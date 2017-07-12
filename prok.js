import Game from './lib/game';
import GameView from './lib/game_view';
import key from './vendor/keymaster';

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = window.innerWidth - 200;
  gameCanvas.height = window.innerHeight - 150;

  const ctx = gameCanvas.getContext('2d');

  const game = new Game();

  document.getElementById('input-player').addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      gameCanvas.parentNode.removeChild(document.getElementById('start-game'));
      return new GameView(game, ctx).start(gameCanvas);
    }
  });
});
