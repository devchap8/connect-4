import { models } from "./models.js";
import { engine } from "./engine.js";

const player1 = new models.Player("X");
const player2 = new models.Player("O");
const game = new engine.Game(player1, player2);

test("piece places on board" , () => {
    expect(game.placePiece(0, player1)).toEqual(true);
    expect(game.getBoard()[5][0]).toEqual("X");
    expect(game.getBoard()[0][0]).toEqual(".");
    expect(game.getBoard()[4][0]).toEqual(".");

    expect(game.placePiece(0, player2)).toEqual(true);
    expect(game.getBoard()[5][0]).toEqual("X");
    expect(game.getBoard()[4][0]).toEqual("O");
    expect(game.getBoard()[0][0]).toEqual(".");
    expect(game.getBoard()[3][0]).toEqual(".");
    expect(game.getBoard()[5][1]).toEqual(".");

    expect(game.placePiece(1, player2)).toEqual(true);
    expect(game.getBoard()[5][0]).toEqual("X");
    expect(game.getBoard()[4][0]).toEqual("O");
    expect(game.getBoard()[5][1]).toEqual("O");
    expect(game.getBoard()[4][1]).toEqual(".");
    expect(game.getBoard()[0][1]).toEqual(".");
    expect(game.getBoard()[5][2]).toEqual(".");

    // fill the rest of the 0 column
    expect(game.placePiece(0, player2)).toEqual(true);
    expect(game.placePiece(0, player2)).toEqual(true);
    expect(game.placePiece(0, player2)).toEqual(true);
    expect(game.placePiece(0, player2)).toEqual(true);
    expect(game.getBoard()[0][0]).toEqual("O");
});

test("invalid piece placements return false", () => {
    expect(game.placePiece(0, player2)).toEqual(false);
    expect(game.placePiece(-1, player2)).toEqual(false);
    expect(game.placePiece(7, player2)).toEqual(false);
});