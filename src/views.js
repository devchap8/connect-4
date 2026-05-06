const board = document.querySelector(".board");
const pieceContainer = document.querySelector(".piece-container");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const screenList = [startScreen, gameScreen];

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
            // spaces where piece will go, behind the board front
            const pieceSlot = document.createElement("div");
            pieceSlot.classList.add("piece-slot");
            pieceSlot.setAttribute("data-row", i);
            pieceSlot.setAttribute("data-col", j);
            pieceContainer.appendChild(pieceSlot);
        }
    }
}

const makePiece = () => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    return piece;
}

const placePieceInDom = (piece, col, row) => {
    const pieceSlot = document.querySelector(`.piece-slot[data-row="${row}"][data-col="${col}"]`);
    // console.log(pieceSlot);
    // console.log(piece);
    pieceSlot.appendChild(piece);
}

const changeScreen = (screenID) => {
    screenList.forEach((screen => {
        if(screen.id === screenID && !screen.classList.contains("active-screen")) screen.classList.add("active-screen");
        else if(screen.classList.contains("active-screen")) screen.classList.remove("active-screen")
    }));
}

const views = {setupBoard, makePiece, placePieceInDom, changeScreen};
export {views};