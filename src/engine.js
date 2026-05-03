import { models } from "./models.js";

class Game {
    #board;
    #p1;
    #p2;
    constructor(p1, p2) {
        this.#p1 = p1;
        this.#p2 = p2;
        this.#board = new models.Gameboard();
    }

    getBoard = () => this.#board.board;
    getP1 = () => this.#p1;
    getP2 = () => this.#p2;

    placePiece = (col, player) => {
        if(col < 0 || col > 6) return false;
        for(let i = 5; i >= 0; i--) {
            if(this.#board.board[i][col] === ".") {
                this.#board.board[i][col] = player.getPiece();
                return true;
            }
        }
        return false;
    }
}

// const player1 = new models.Player("X");
// const player2 = new models.Player("O");
// const game = new Game(player1, player2);

const engine = { Game };
export { engine };