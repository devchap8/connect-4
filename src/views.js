const board = document.querySelector(".board");
const pieceContainer = document.querySelector(".piece-container");
const winnerColor = document.querySelector(".winner-color");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const endScreen = document.querySelector("#end-screen");
const screenList = [startScreen, gameScreen, endScreen];
const frontSlotList = [[], [], [], [], [], [], []]; // store them by column for animations
const pieceSlotList = [[], [], [], [], [], [], []];
const styles = window.getComputedStyle(document.body);
const floatingOffset = initFloatingOffset();

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
            frontSlotList[j].push(slot);
            // spaces where piece will go, behind the board front
            const pieceSlot = document.createElement("div");
            pieceSlot.classList.add("piece-slot");
            pieceSlot.setAttribute("data-row", i);
            pieceSlot.setAttribute("data-col", j);
            pieceContainer.appendChild(pieceSlot);
            pieceSlotList[j].push(pieceSlot);
        }
    }
}

const makePiece = (isP1) => {
    let piece = document.createElement("div");
    isP1 ? piece.classList.add("piece") : piece.classList.add("p2-piece");
    return piece;
}

const changeFloatOffset = (piece, row) => {
    const offset = ((1 + +row) * +floatingOffset) - 50;
    piece.style.setProperty("transform", `translateY(${offset}px)`);
    return piece;
}

const dropPieceAnimation = async (piece) => {
    await new Promise(() => setTimeout(() => {
        piece.style.setProperty("transform", "translateY(0px)");
    }, 50));
}

const placePieceInDom = async (piece, col, row) => {
    const pieceSlot = document.querySelector(`.piece-slot[data-row="${row}"][data-col="${col}"]`);
    piece = changeFloatOffset(piece, row);
    pieceSlot.appendChild(piece);
    await dropPieceAnimation(piece);
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
    pieceSlotList.forEach(col => col.forEach(s => {
        s.innerHTML = "";
        if(s.classList.contains("highlighted")) s.classList.remove("highlighted");
    }));

}

const highlightSlot = (event) => {
    if(!event.target.classList.contains("slot")) return;
    const pieceSlot = getLowestPieceSlot(event);
    pieceSlot.classList.add("highlighted");
}
const unhighlightSlot = (event) => {
    if(!event.target.classList.contains("slot")) return;
    const pieceSlot = getLowestPieceSlot(event);
    pieceSlot.classList.remove("highlighted");
}
const getLowestPieceSlot = (event) => {
    const targetCol = event.target.dataset.col;
    for(let i = pieceSlotList[targetCol].length - 1; i >= 0; i--) {
        if(pieceSlotList[targetCol][i].innerHTML === "") {
            return pieceSlotList[targetCol][i];
        }
    }
}

function initFloatingOffset() {
    const slotSize = styles.getPropertyValue("--slot-size").replace("px", "");
    const slotGap = styles.getPropertyValue("--slot-gap").replace("px", "");
    return (-1 * (+slotGap + +slotSize));
}

const views = {setupBoard, makePiece, placePieceInDom, changeScreen, toggleBoardActive,
    displayWinner, clearDomPieces, highlightSlot, unhighlightSlot
};
export {views};