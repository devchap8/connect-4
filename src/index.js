import "./style.css";
import { views } from "./views.js";
import { models } from "./models.js";
import { engine } from "./engine.js";

const gameContainer = document.querySelector(".game-container");

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
    }

    setupEventListeners = () => {
        gameContainer.addEventListener("click", this.handleClick);
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