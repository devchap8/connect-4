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
    #isRealPlayer;
    #isPlayer1
    constructor(piece, isPlayer1, isReal = true) {
        this.#piece = piece;
        this.#isPlayer1 = isPlayer1;
        this.#isRealPlayer = isReal;
    }
    getPiece = () => this.#piece;
    getIsRealPlayer = () => this.#isRealPlayer;
    getIsPlayer1 = () => this.#isPlayer1;

    clone = () => new Player(this.#piece, this.#isRealPlayer);
}

class CompPlayer extends Player {
    constructor(piece) {
        super(piece, false, false);
    }

    getMoveColumn = () => {
        // function to get ai move column
    }

}

const models = {Gameboard, Player, CompPlayer};
export {models};