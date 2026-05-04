import { models } from "./models.js";
import { engine } from "./engine.js";

const player1 = new models.Player("X");
const player2 = new models.Player("O");
let game;

beforeEach(() => {
    game = new engine.Game(player1, player2);
});

test("piece places on board" , () => {
    expect(game.placePiece(0)).toEqual({row: 5, col: 0, piece: "X"});
    expect(game.getBoard()[5][0]).toEqual("X");
    expect(game.getBoard()[0][0]).toEqual(".");
    expect(game.getBoard()[4][0]).toEqual(".");

    game.switchCurrPlayer();
    expect(game.placePiece(0)).toEqual({row: 4, col: 0, piece: "O"});
    expect(game.getBoard()[5][0]).toEqual("X");
    expect(game.getBoard()[4][0]).toEqual("O");
    expect(game.getBoard()[0][0]).toEqual(".");
    expect(game.getBoard()[3][0]).toEqual(".");
    expect(game.getBoard()[5][1]).toEqual(".");

    expect(game.placePiece(1)).toEqual({row: 5, col: 1, piece: "O"});
    expect(game.getBoard()[5][0]).toEqual("X");
    expect(game.getBoard()[4][0]).toEqual("O");
    expect(game.getBoard()[5][1]).toEqual("O");
    expect(game.getBoard()[4][1]).toEqual(".");
    expect(game.getBoard()[0][1]).toEqual(".");
    expect(game.getBoard()[5][2]).toEqual(".");
});

test("invalid piece placements return false", () => {
    // fill the 0 column
    game.switchCurrPlayer();
    expect(game.placePiece(0)).toEqual({row: 5, col: 0, piece: "O"});
    expect(game.placePiece(0)).toEqual({row: 4, col: 0, piece: "O"});
    expect(game.placePiece(0)).toEqual({row: 3, col: 0, piece: "O"});
    expect(game.placePiece(0)).toEqual({row: 2, col: 0, piece: "O"});
    expect(game.placePiece(0)).toEqual({row: 1, col: 0, piece: "O"});
    expect(game.placePiece(0)).toEqual({row: 0, col: 0, piece: "O"});
    expect(game.getBoard()[0][0]).toEqual("O");

    expect(game.placePiece(0)).toBeNull();
    expect(game.placePiece(-1)).toBeNull();
    expect(game.placePiece(7)).toBeNull();
});

test("vertical win", () => {
    expect(game.checkWin(5, 0)).toBe(false);
    game.placePiece(0); // row 5 col 0
    expect(game.checkWin(5, 0)).toBe(false);
    game.placePiece(0); // row 4 col 0
    game.placePiece(0); // row 3 col 0
    expect(game.checkWin(5, 0)).toBe(false);
    expect(game.checkWin(3, 0)).toBe(false);
    game.placePiece(0); // row 2 col 0 -- win
    expect(game.checkWin(5, 0)).toBe(true);
    expect(game.checkWin(2, 0)).toBe(true);
    expect(game.checkWin(3, 0)).toBe(true);
    expect(game.checkWin(1, 0)).toBe(false);
    expect(game.checkWin(0, 0)).toBe(false);
    expect(game.checkWin(5, 1)).toBe(false);
    game.placePiece(0); // row 1 col 0
    game.placePiece(0); // row 0 col 0
    // checking that the second while loop doesnt underflow into accessing board[-1]
    expect(game.checkWin(0, 0)).toBe(true);
});

test("horizontal win", () => {
    game.placePiece(0); // row 5 col 0
    game.placePiece(1); // row 5 col 1
    game.placePiece(2); // row 5 col 2
    expect(game.checkWin(5, 2)).toBe(false);
    expect(game.checkWin(5, 0)).toBe(false);
    game.placePiece(4) // row 5 col 4, 1 gap off from win
    expect(game.checkWin(5, 2)).toBe(false);
    expect(game.checkWin(5, 3)).toBe(false);
    expect(game.checkWin(5, 4)).toBe(false);
    game.placePiece(3); // row 5 col 3, win
    expect(game.checkWin(5, 3)).toBe(true);
    game.placePiece(5);
    game.placePiece(6);
    expect(game.checkWin(5, 6)).toBe(true);
});

test("diagonal forward win", () => {
    // setup pieces so test player can place diagonal
    // staircase in middle of board for other player to play on top of
    for(let i = 1; i < 6; i++) {
        for(let j = 0; j < i; j++) {
            game.placePiece(i);
        }
    }
    game.switchCurrPlayer();
    game.placePiece(0); // row 5 col 0
    game.placePiece(1); // row 4 col 1
    game.placePiece(2); // row 3 col 2
    expect(game.checkWin(3, 2)).toBe(false);
    expect(game.checkWin(5, 0)).toBe(false);
    game.placePiece(4); // row 1 col 4
    game.placePiece(5); // row 0 col 5
    expect(game.checkWin(0, 5)).toBe(false);
    expect(game.checkWin(1, 4)).toBe(false);
    expect(game.checkWin(4, 1)).toBe(false);
    game.placePiece(3); // row 2 col 3, all 6 pieces connected diagonally
    expect(game.checkWin(3, 2)).toBe(true);
    expect(game.checkWin(5, 0)).toBe(true);
    expect(game.checkWin(0, 5)).toBe(true);
    expect(game.checkWin(1, 4)).toBe(true);
    expect(game.checkWin(4, 1)).toBe(true);
    expect(game.checkWin(2, 3)).toBe(true);
});

test("diagonal backward win", () => {
    // same staircase as diagonal forwards but reversed
    for(let i = 5; i > 0; i--) {
        for(let j = 0; j < 6 - i; j++) {
            game.placePiece(i);
        }
    }
    game.switchCurrPlayer();
    game.placePiece(1); // row 0 col 1
    game.placePiece(2); // row 1 col 2
    game.placePiece(3); // row 2 col 3
    expect(game.checkWin(0, 1)).toBe(false);
    expect(game.checkWin(2, 3)).toBe(false);
    game.placePiece(5); // row 4 col 5
    game.placePiece(6); // row 5 col 6
    expect(game.checkWin(5, 6)).toBe(false);
    game.placePiece(4); // row 3 col 4, all pieces connected diagonally
    expect(game.checkWin(3, 4)).toBe(true);
    expect(game.checkWin(0, 1)).toBe(true);
    expect(game.checkWin(5, 6)).toBe(true);
});