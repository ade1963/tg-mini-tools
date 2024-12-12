class Minesweeper {
    constructor(width, height, numMines) {
        this.width = width;
        this.height = height;
        this.numMines = numMines;
        this.board = [];
        this.gameOver = false;
        this.timer = 0;
        this.timerInterval = null;
        this.flagsLeft = numMines;
        this.status = document.getElementById('status');
        this.minesLeftDisplay = document.getElementById('mines-left');
        this.timerDisplay = document.getElementById('timer');
        this.boardElement = document.getElementById('board');
        this.restartButton = document.getElementById('restart');

        this.restartButton.addEventListener('click', () => this.restartGame());
        this.init();
    }

    init() {
        this.createBoard();
        this.placeMines();
        this.calculateNeighborMines();
        this.renderBoard();
        this.updateMinesLeft();
        this.updateTimer();
    }

    createBoard() {
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push({
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                });
            }
            this.board.push(row);
        }
    }

    placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.numMines) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            if (!this.board[y][x].isMine) {
                this.board[y][x].isMine = true;
                minesPlaced++;
            }
        }
    }

    calculateNeighborMines() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!this.board[y][x].isMine) {
                    this.board[y][x].neighborMines = this.countNeighborMines(x, y);
                }
            }
        }
    }

    countNeighborMines(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                    if (this.board[ny][nx].isMine) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.board[y][x];
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.x = x;
                cellElement.dataset.y = y;

                if (cell.isRevealed) {
                    cellElement.classList.add('revealed');
                    if (cell.isMine) {
                        cellElement.classList.add('mine');
                        cellElement.textContent = '💣';
                    } else {
                        cellElement.textContent = cell.neighborMines > 0 ? cell.neighborMines : '';
                    }
                } else if (cell.isFlagged) {
                    cellElement.classList.add('flagged');
                    cellElement.textContent = '🚩';
                }

                cellElement.addEventListener('click', (event) => this.handleCellClick(event));

                cellElement.addEventListener('contextmenu', (event) => this.handleCellRightClick(event));
                this.boardElement.appendChild(cellElement);
            }
        }
    }

    handleCellClick(event) {
        if (this.gameOver) return;

        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        const cell = this.board[y][x];

        if (!this.timerInterval) {
            this.startTimer();
        }

        if (cell.isRevealed || cell.isFlagged) return;

        if (cell.isMine) {
            this.revealAllMines();
            this.gameOver = true;
            this.status.textContent = 'Game Over!';
            this.stopTimer();
        } else {
            this.revealCell(x, y);
            if (this.checkWinCondition()) {
                this.gameOver = true;
                this.status.textContent = 'You Win!';
                this.stopTimer();
            }
        }
    }

    handleCellRightClick(event) {
        event.preventDefault();
        if (this.gameOver) return;

        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        const cell = this.board[y][x];

        if (cell.isRevealed) return;

        if (cell.isFlagged) {
            cell.isFlagged = false;
            this.flagsLeft++;
        } else {
            if (this.flagsLeft === 0) return;
            cell.isFlagged = true;
            this.flagsLeft--;
        }

        this.updateMinesLeft();
        this.renderBoard();
    }

    revealCell(x, y) {
        const cell = this.board[y][x];
        if (cell.isRevealed || cell.isFlagged) return;

        cell.isRevealed = true;

        if (cell.neighborMines === 0) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                        this.revealCell(nx, ny);
                    }
                }
            }
        }

        this.renderBoard();
    }

    revealAllMines() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.board[y][x].isMine) {
                    this.board[y][x].isRevealed = true;
                }
            }
        }
        this.renderBoard();
    }

    checkWinCondition() {
        let nonMineCellsRevealed = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!this.board[y][x].isMine && this.board[y][x].isRevealed) {
                    nonMineCellsRevealed++;
                }
            }
        }
        return nonMineCellsRevealed === (this.width * this.height - this.numMines);
    }

    updateMinesLeft() {
        this.minesLeftDisplay.textContent = `Mines Left: ${this.flagsLeft}`;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }

    updateTimer() {
        this.timerDisplay.textContent = `Time: ${this.timer}`;
    }

    restartGame() {
        this.stopTimer();
        this.timer = 0;
        this.flagsLeft = this.numMines;
        this.gameOver = false;
        this.status.textContent = '';
        this.board = [];
        this.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Minesweeper(10, 10, 10);
});
