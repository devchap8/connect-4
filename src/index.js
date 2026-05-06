import "./style.css";
import { views } from "./views.js";
import { models } from "./models.js";
import { engine } from "./engine.js";

const gameContainer = document.querySelector(".game-container");
const singleplayerButton = document.querySelector(".singleplayer-button");
const twoplayerButton = document.querySelector(".twoplayer-button");

class GameController {
    #game
    constructor() {
        this.#game = null;
    }

    setupEventListeners = () => {
        gameContainer.addEventListener("click", this.handleClick);
        singleplayerButton.addEventListener("click", () => this.startGame(true));
        twoplayerButton.addEventListener("click", () => this.startGame(false));
    }

    startGame = (isSingleplayer) => {
        const p1 = new models.Player("X", true);
        let p2;
        isSingleplayer ? p2 = new models.CompPlayer("O", false) : p2 = new models.Player("O", false);
        this.#game = new engine.Game(p1, p2);
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
        const piece = views.makePiece(this.#game.getCurrPlayer().getIsPlayer1());
        views.placePieceInDom(piece, moveInfo.col, moveInfo.row);
        if(this.#game.checkWin(moveInfo.row, moveInfo.col)) this.gameWon();
        else this.newTurn();
    }

    newTurn = () => {
        this.#game.switchCurrPlayer();
        if(this.#game.getCurrPlayer().getIsPlayer1()) {
            
        }
    }

    gameWon = () => {
        this.#game.getCurrPlayer().getIsPlayer1() ? alert("Player 1 Wins!") : alert("Player 2 Wins!");
    }
}

views.setupBoard();
const controller = new GameController();
controller.setupEventListeners();