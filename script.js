let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameMode = 'ai'; // 'ai' o 'pvp'
let gameOver = false;

const statusEl = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

function setMode(mode) {
  gameMode = mode;
  resetGame();
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  statusEl.textContent = `Turno de ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const index = parseInt(e.target.dataset.index);
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusEl.textContent = `¡Gana ${currentPlayer}!`;
    gameOver = true;
    return;
  }

  if (board.every(Boolean)) {
    statusEl.textContent = 'Empate';
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `Turno de ${currentPlayer}`;

  if (gameMode === 'ai' && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

function checkWin() {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // filas
    [0,3,6], [1,4,7], [2,5,8], // columnas
    [0,4,8], [2,4,6]           // diagonales
  ];
  return lines.some(line =>
    line.every(i => board[i] === currentPlayer)
  );
}

function aiMove() {
  const empty = board.map((v, i) => v === null ? i : null).filter(i => i !== null);
  if (empty.length === 0) return;

  const move = empty[Math.floor(Math.random() * empty.length)];
  board[move] = 'O';
  cells[move].textContent = 'O';

  if (checkWin()) {
    statusEl.textContent = '¡Gana la IA!';
    gameOver = true;
    return;
  }

  if (board.every(Boolean)) {
    statusEl.textContent = 'Empate';
    gameOver = true;
    return;
  }

  currentPlayer = 'X';
  statusEl.textContent = `Turno de ${currentPlayer}`;
}

resetGame();
