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
    constructor(piece) {
        super(piece);
        this.isRealPlayer = false;
    }

    getMoveColumn = () => {
        // function to get ai move column
    }

}

const models = {Gameboard, Player, CompPlayer};
export {models};