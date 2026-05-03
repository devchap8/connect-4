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