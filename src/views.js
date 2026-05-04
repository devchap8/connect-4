const setupBoard = () => {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            const slot = document.createElement("div");
            slot.classList.add("slot");
            slot.setAttribute("data-row", i);
            slot.setAttribute("data-col", j);
            board.appendChild(slot);
        }
    }
}

const views = {setupBoard};
export {views};