const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector(".turn");
const resultText = document.querySelector(".result");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    let winningCombo = [];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombo = condition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;

        // Animate winning cells
        winningCombo.forEach(index => {
            cells[index].classList.add("win");
            cells[index].classList.add("bounce");
        });

        // Delay message for effect
        setTimeout(() => {
            resultText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
            launchConfetti();
        }, 500);

        return;
    }

    if (!board.includes("")) {
        resultText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win", "bounce");
    });
    turnText.textContent = `Player X's turn`;
    resultText.textContent = "";
}

// 🎊 Confetti Effect
function launchConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
