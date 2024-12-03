const boardSize = 10;
const numMines = 10;
let board = [];
let gameOver = false;
let minesLeft = numMines;
let timerInterval;
let startTime;


function createBoard() {
    board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                flagged: false,
                count: 0
            };
        }
    }

    for (let i = 0; i < numMines; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);
        } while (board[x][y].isMine);
        board[x][y].isMine = true;
    }

      // Count adjacent mines
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (!board[i][j].isMine) {
                board[i][j].count = countAdjacentMines(i, j);
            }
        }
    }
}


function countAdjacentMines(x, y) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            let nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny].isMine) {
                count++;
            }
        }
    }
    return count;
}

function revealCell(x, y) {

    if (gameOver || board[x][y].revealed || board[x][y].flagged) return;

        if(startTime === null){
            ensureFirstMoveSafe(x,y);
            startTimer();
        }


    board[x][y].revealed = true;
    let cell = document.getElementById(`cell-${x}-${y}`);


    if (board[x][y].isMine) {
        cell.classList.add('mine');
        gameOver = true;
        clearInterval(timerInterval)
        document.getElementById('status').textContent = 'Game Over!';
    } else {
        cell.textContent = board[x][y].count || '';
        cell.classList.add('revealed');
        if (board[x][y].count === 0) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    let nx = x + dx, ny = y + dy;
                    if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
                        revealCell(nx, ny);
                    }
                }
            }
        }
    }
}

function ensureFirstMoveSafe(x,y){
    if(board[x][y].isMine || board[x][y].count > 0){
        createBoard();
        ensureFirstMoveSafe(x,y)
    }
}

function toggleFlag(x, y) {
    if (gameOver) return;
    board[x][y].flagged = !board[x][y].flagged;
    let cell = document.getElementById(`cell-${x}-${y}`);
    if (board[x][y].flagged) {
        cell.classList.add('flagged');
        minesLeft--;
        document.getElementById('mines-count').textContent = minesLeft;
    } else {
        cell.classList.remove('flagged');
        minesLeft++;
        document.getElementById('mines-count').textContent = minesLeft;
    }
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}


function updateTimer() {
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    document.getElementById('timer').textContent = `Time: ${elapsed}`;
}


function resetGame(){
    clearInterval(timerInterval);
    startTime = null; // Properly reset startTime to null
    gameOver = false;
    minesLeft = numMines;
    document.getElementById('status').textContent = 'Click to start!';
    document.getElementById('mines-count').textContent = minesLeft;
    document.getElementById('timer').textContent = 'Time: 0';

  initGame(); 
}

function initGame() {
    createBoard();
    let boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            let cell = document.createElement('div');
            cell.id = `cell-${i}-${j}`;
            cell.classList.add('cell');
            cell.addEventListener('click', () => revealCell(i, j));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                toggleFlag(i, j);
            });
            boardElement.appendChild(cell);
        }
    }
        document.getElementById('mines-count').textContent = minesLeft;    
        document.getElementById('restart').addEventListener('click', resetGame);
}

// Call initGame when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame);
