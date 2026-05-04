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
        // get the column clicked
        // place the piece in that column in data and get the info from engine
        // based off the info, change the dom in views
        if(!event.target.classList.contains("slot")) return;
        const column = event.target.dataset.col;
        const moveInfo = this.#game.placePiece(column);
        console.log(moveInfo);
        console.log(this.#game.getBoard());
    }
}

views.setupBoard();
const controller = new GameController();
controller.setupEventListeners();