import "./style.css";
import { views } from "./views.js";
import { models } from "./models.js";
import { engine } from "./engine.js";

const gameContainer = document.querySelector(".game-container");
const singleplayerButtons = Array.from(document.querySelectorAll(".singleplayer-button"));
const twoplayerButtons = Array.from(document.querySelectorAll(".twoplayer-button"));

class GameController {
    #game
    constructor() {
        this.#game = null;
    }

    setupEventListeners = () => {
        gameContainer.addEventListener("click", this.handleClick);
        singleplayerButtons.forEach(b => b.addEventListener("click", () => this.startGame(true)));
        twoplayerButtons.forEach(b => b.addEventListener("click", () => this.startGame(false)));
        gameContainer.addEventListener("mouseover", views.highlightSlot);
        gameContainer.addEventListener("mouseout", views.unhighlightSlot);
    }

    startGame = (isSingleplayer) => {
        const p1 = new models.Player("X", true, true);
        let p2;
        isSingleplayer ? p2 = new models.Player("O", false, false) : p2 = new models.Player("O", false, true);
        this.#game = new engine.Game(p1, p2);
        views.clearDomPieces();
        views.changeScreen("game-screen");
    }

    handleClick = (event) => {
        if(!event.target.classList.contains("slot")) return;
        const column = event.target.dataset.col;
        this.makeMove(column);
    }

    makeMove = async (column) => {
        const moveInfo = this.#game.placePiece(column);
        if(!moveInfo) return;
        const piece = views.makePiece(this.#game.getCurrPlayer().getIsPlayer1());
        views.toggleBoardActive();
        views.placePieceInDom(piece, moveInfo.col, moveInfo.row);
        // wait the 750 ms until the animation is done and then make board clickable again
        await new Promise(() => setTimeout(() => {
            views.toggleBoardActive();
            if(this.#game.checkWin(moveInfo.row, moveInfo.col)) this.gameWon();
            else this.newTurn();
        }, 750));
    }

    newTurn = () => {
        this.#game.switchCurrPlayer();
        if(!this.#game.getCurrPlayer().getIsRealPlayer()) {
            this.aiTurn();
        }
    }

    aiTurn = async () => {
        const randCol = this.#game.getRandomColumn();
        views.toggleBoardActive();
        await new Promise(() => setTimeout(() => {
            this.makeMove(randCol);
            views.toggleBoardActive();
        }, 500));
    }

    gameWon = () => {
        views.displayWinner(this.#game.getCurrPlayer().getIsPlayer1())
        views.changeScreen("end-screen");
    }
}

views.setupBoard();
const controller = new GameController();
controller.setupEventListeners();