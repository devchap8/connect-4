const board = document.querySelector(".board");
const pieceContainer = document.querySelector(".piece-container");
const winnerColor = document.querySelector(".winner-color");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const endScreen = document.querySelector("#end-screen");
const screenList = [startScreen, gameScreen, endScreen];
const frontSlotList = [];
const pieceSlotList = [];

const setupBoard = () => {
    board.innerHTML = "";
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            // slots for the front of the board in dom
            const slot = document.createElement("div");
            slot.classList.add("slot");
            slot.setAttribute("data-row", i);
            slot.setAttribute("data-col", j);
            board.appendChild(slot);
            frontSlotList.push(slot);
            // spaces where piece will go, behind the board front
            const pieceSlot = document.createElement("div");
            pieceSlot.classList.add("piece-slot");
            pieceSlot.setAttribute("data-row", i);
            pieceSlot.setAttribute("data-col", j);
            pieceContainer.appendChild(pieceSlot);
            pieceSlotList.push(pieceSlot);
        }
    }
}

const makePiece = (isP1) => {
    const piece = document.createElement("div");
    isP1 ? piece.classList.add("piece") : piece.classList.add("p2-piece");
    return piece;
}

const placePieceInDom = (piece, col, row) => {
    const pieceSlot = document.querySelector(`.piece-slot[data-row="${row}"][data-col="${col}"]`);
    pieceSlot.appendChild(piece);
}

const changeScreen = (screenID) => {
    screenList.forEach((screen => {
        if(screen.id === screenID && !screen.classList.contains("active-screen")) screen.classList.add("active-screen");
        else if(screen.classList.contains("active-screen")) screen.classList.remove("active-screen")
    }));
}

const toggleBoardActive = () => {
    gameScreen.classList.contains("inactive") ? 
        gameScreen.classList.remove("inactive") : gameScreen.classList.add("inactive");
}

const displayWinner = (isP1) => {
    isP1 ? winnerColor.innerHTML = "RED WON!" : winnerColor.innerHTML = "YELLOW WON!";
}

const clearDomPieces = () => {
    pieceSlotList.forEach(s => s.innerHTML = "");
}

const views = {setupBoard, makePiece, placePieceInDom, changeScreen, toggleBoardActive,
    displayWinner, clearDomPieces
};
export {views};