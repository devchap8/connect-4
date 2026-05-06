import { models } from "./models.js";

class Game {
    #board;
    #p1;
    #p2;
    #currPlayer;
    #winOffsets;
    constructor(p1, p2) {
        this.#p1 = p1;
        this.#p2 = p2;
        this.#board = new models.Gameboard();
        this.#currPlayer = this.#p1;
        this.#winOffsets = {
            vert: {row: 1, col: 0},
            horiz: {row: 0, col: 1},
            diagFront: {row: 1, col: -1},
            diagBack: {row: 1, col: 1}
        };
    }

    getBoard = () => this.#board.board.map(row => [...row]);
    getP1 = () => this.#p1.clone();
    getP2 = () => this.#p2.clone();
    getCurrPlayer = () => this.#currPlayer === this.#p1 ? this.#p1.clone() : this.#p2.clone();

    switchCurrPlayer = () => {
        if(this.#currPlayer === this.#p1) this.#currPlayer = this.#p2;
        else this.#currPlayer = this.#p1;
    }

    getRandomColumn = () => {
        let cols = [0, 1, 2, 3, 4, 5, 6];
        while(cols.length > 0) {
            const randIndex = Math.floor(Math.random() * cols.length);
            if(this.isValidMove(cols[randIndex])) return cols[randIndex];
            cols.splice(randIndex, 1);
        }
    }

    isValidMove = (col) => {
        if(col < 0 || col > 6) return null;
        return this.#board.board[0][col] === ".";
    }

    placePiece = (col) => {
        if(!this.isValidMove(col)) return null;
        for(let i = 5; i >= 0; i--) {
            if(this.#board.board[i][col] === ".") {
                this.#board.update(i, col, this.#currPlayer.getPiece());
                return {row: +i, col: +col, piece: this.#currPlayer.getPiece()};
            }
        }
    }

    checkWin = (row, col) => {
        const piece = this.#board.board[row][col];
        return Object.values(this.#winOffsets).some((offset) => this.#checkWinCondition(row, col, piece, offset))
    }
    #checkWinCondition = (row, col, piece, offset) => {
        if(piece === ".") return false;
        let count = -1; // we increment count automatically twice, so its effectively 1
        let checkRow = row;
        let checkCol = col;
        while(checkRow <= 5 && checkCol <= 6 && checkRow >= 0 && checkCol >= 0) {
            if(this.#board.board[checkRow][checkCol] === piece) {
                count++;
                checkRow += offset.row;
                checkCol += offset.col;
            } else {
                break;
            }
        }
        // reset and check in the other direction for connections
        checkRow = row;
        checkCol = col;
        while(checkRow <= 5 && checkCol <= 6 && checkRow >= 0 && checkCol >= 0) {
            if(this.#board.board[checkRow][checkCol] === piece) {
                count++;
                checkRow -= offset.row;
                checkCol -= offset.col;
            } else {
                break;
            }
        } 
        console.log(count);
        return count >= 4;
    }

}

const engine = { Game };
export { engine };