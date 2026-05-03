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
    constructor(piece) {
        this.#piece = piece;
        this.#isRealPlayer = true;
    }
    getPiece = () => this.#piece;
    getIsRealPlayer = () => this.#isRealPlayer;
}

class CompPlayer extends Player {
    #isRealPlayer;
    constructor(piece) {
        super(piece);
        this.#isRealPlayer = false;
    }

    getMoveColumn = () => {
        // function to get ai move column
    }

}

const models = {Gameboard, Player, CompPlayer};
export {models};