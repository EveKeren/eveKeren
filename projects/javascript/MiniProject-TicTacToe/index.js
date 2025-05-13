'use strict'
let player = "X";
let cells = document.querySelectorAll(".cell");
let gameActive = true;
let scores = { X: 0, O: 0 };
let currentPlayerDisplay = document.getElementById("current-player");
let gameStatus = document.getElementById("game-status");
let xScore = document.getElementById("x-score");
let oScore = document.getElementById("o-score");

document.querySelector(".restart-button").addEventListener("click", resetGame);

function makeMove(cell) {
  if (cell.innerText === "" && gameActive) {
    cell.innerText = player;

    let result = checkWinner();

    if (result.winner) {
      gameActive = false;
      scores[player]++;
      updateScores();
      gameStatus.textContent = `${player} wins!`;
      highlightWinningLine(result.line);
      return;
    }
    if (result.draw) {
      gameActive = false;
      gameStatus.textContent = "It's a draw!";
      return;
    }

    player = player === "X" ? "O" : "X";
    currentPlayerDisplay.textContent = player;
    gameStatus.textContent = "";
  }
}
function checkWinner() {
  let board = Array.from(cells).map((c) => c.innerText);
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combo of winningCombinations) {
    if (board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]) {
      return { winner: true, line: combo };
    }
  }

  return { winner: false, draw: !board.includes("") };
}

function highlightWinningLine(line) {
  line.forEach(index => {
    cells[index].classList.add("winner");
  });
}

function updateScores() {
  xScore.textContent = scores.X;
  oScore.textContent = scores.O;
}

function resetGame() {
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("winner");
  });
  player = "X";
  gameActive = true;
  currentPlayerDisplay.textContent = player;
  gameStatus.textContent = "";
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => makeMove(cell));
});