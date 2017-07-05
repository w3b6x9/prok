document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;

  const ctx = gameCanvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;

    gamePlay();
  }

  resizeCanvas();

  function gamePlay() {
  }
});
