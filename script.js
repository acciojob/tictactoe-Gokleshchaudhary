const submitBtn = document.getElementById("submit");
const gameSection = document.querySelector(".game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = 1;
let moves = Array(9).fill(null);
let gameOver = false;

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";

  document.getElementById("player1").style.display = "none";
  document.getElementById("player2").style.display = "none";
  submitBtn.style.display = "none";
  gameSection.style.display = "block";

  messageDiv.textContent = `${player1}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || gameOver) return;

    const symbol = currentPlayer === 1 ? "x" : "o";
    cell.textContent = symbol;
    const cellIndex = parseInt(cell.id) - 1;
    moves[cellIndex] = symbol;

    if (checkWinner(symbol)) {
      const winner = currentPlayer === 1 ? player1 : player2;
      messageDiv.textContent = `${winner} congratulations you won!`;
      gameOver = true;
    } else if (moves.every(cell => cell !== null)) {
      messageDiv.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      const nextPlayer = currentPlayer === 1 ? player1 : player2;
      messageDiv.textContent = `${nextPlayer}, you're up`;
    }
  });
});

function checkWinner(symbol) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => moves[index] === symbol)
  );
}
