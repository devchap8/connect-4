import "./style.css";
import { views } from "./views.js";
import { models } from "./models.js";
import { engine } from "./engine.js";

const gameContainer = document.querySelector(".game-container");
const singleplayerButton = document.querySelector(".singleplayer-button");
const twoplayerButton = document.querySelector(".twoplayer-button");

class GameController {
    #p1
    #p2
    #game
    constructor() {
        // this.#p1 = null;
        // this.#p2 = null;
        // this.#game = null;
        this.#p1 = new models.Player("X");
        this.#p2 = new models.Player("O");
        this.#game = new engine.Game(this.#p1, this.#p2);
        // in final build game and players will be null and declared depending on if the
        // user presses 1p game or 2p game on start screen
    }

    setupEventListeners = () => {
        gameContainer.addEventListener("click", this.handleClick);
        singleplayerButton.addEventListener("click", () => this.startGame(true));
        twoplayerButton.addEventListener("click", () => this.startGame(false));
    }

    startGame = (isSingleplayer) => {
        console.log("start game")
        // make p1
        // if isSingleplayer make p2 a bot, else make p2 a player
        // make the game with the players
        // change to the game screen

        views.changeScreen("game-screen");
    }

    handleClick = (event) => {
        if(!event.target.classList.contains("slot")) return;
        const column = event.target.dataset.col;
        this.makeMove(column);
    }

    makeMove = (column) => {
        // ai will also use this function after getting its column
        const moveInfo = this.#game.placePiece(column);
        if(!moveInfo) return;
        const piece = views.makePiece();
        views.placePieceInDom(piece, moveInfo.col, moveInfo.row);
    }
}

views.setupBoard();
const controller = new GameController();
controller.setupEventListeners();