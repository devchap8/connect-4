class Gameboard {
    constructor() {
        this.board = this.setupBoard();
    }

    setupBoard = () => {
        const board = [];
        for(let i = 0; i < 6; i++) {
            board.push([]);
        }
        board.forEach(row => {
            for(let i = 0; i < 7; i++) {
                row.push(".");
            }
        });
        return board;
    }

    update = (row, col, piece) => {
        this.board[row][col] = piece;
    }

}

class Player {
    #piece;
    #isPlayer1
    #isRealPlayer;
    constructor(piece, isPlayer1, isRealPlayer) {
        this.#piece = piece;
        this.#isPlayer1 = isPlayer1;
        this.#isRealPlayer = isRealPlayer;
    }
    getPiece = () => this.#piece;
    getIsRealPlayer = () => this.#isRealPlayer;
    getIsPlayer1 = () => this.#isPlayer1;

    clone = () => new Player(this.#piece, this.#isPlayer1, this.#isRealPlayer);
}

const models = {Gameboard, Player};
export {models};