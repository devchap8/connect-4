import { models } from "./models.js";

class Game {
    #board;
    #p1;
    #p2;
    #currPlayer;
    #winOffests;
    constructor(p1, p2) {
        this.#p1 = p1;
        this.#p2 = p2;
        this.#board = new models.Gameboard();
        this.#currPlayer = this.#p1;
        this.#winOffests = {
            vert: {row: 1, col: 0},
            horiz: {row: 0, col: 1},
            diagFront: {row: 1, col: 1},
            diagBack: {row: 1, col: -1}
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

    placePiece = (col) => {
        if(col < 0 || col > 6) return null;
        for(let i = 5; i >= 0; i--) {
            if(this.#board.board[i][col] === ".") {
                this.#board.update(i, col, this.#currPlayer.getPiece());
                return {row: i, col: col, piece: this.#currPlayer.getPiece()};
            }
        }
        return null;
    }

    checkWin = (row, col) => {
        const piece = this.#board.board[row][col];
        return (this.#checkWinVertical(row, col, piece));
    }
    #checkWinVertical = (row, col, piece) => {
        if(piece === ".") return false;
        let count = -1; // we increment count automatically twice, so its effectively 1
        let checkRow = row;
        let checkCol = col;
        while(checkRow <= 5 && checkCol <= 6 && checkRow >= 0 && checkCol >= 0) {
            if(this.#board.board[checkRow][checkCol] === piece) {
                count++;
                checkRow += this.#winOffests.vert.row;
                checkCol += this.#winOffests.vert.col;
            } else {
                break;
            }
        }
        checkRow = row;
        checkCol = col;
        while(checkRow <= 5 && checkCol <= 6 && checkRow >= 0 && checkCol >= 0) {
            if(this.#board.board[checkRow][checkCol] === piece) {
                count++;
                checkRow -= this.#winOffests.vert.row;
                checkCol -= this.#winOffests.vert.col;
            } else {
                break;
            }
        } 
        return count >= 4;
    }

}

const player1 = new models.Player("X");
const player2 = new models.Player("O");
const game = new Game(player1, player2);
game.placePiece(0);
game.placePiece(0);
game.checkWin(5, 0);

const engine = { Game };
export { engine };