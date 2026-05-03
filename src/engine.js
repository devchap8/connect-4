import { models } from "./models.js";

class Game {
    #board;
    #p1;
    #p2;
    #currPlayer;
    constructor(p1, p2) {
        this.#p1 = p1;
        this.#p2 = p2;
        this.#board = new models.Gameboard();
        this.#currPlayer = this.#p1;
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
}

// const player1 = new models.Player("X");
// const player2 = new models.Player("O");
// const game = new Game(player1, player2);

const engine = { Game };
export { engine };