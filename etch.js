let etchPad = document.querySelector('#etchPad');
let currentColor1 = "#000000";
let currentColor2 = "red";
let pointer1Down = false;
let pointer2Down = false;

document.querySelector('#resetButton').addEventListener('click', handleReset);
document.querySelector('#clearButton').addEventListener('click', clearBoard);
window.addEventListener('pointerdown', handlePointerDown);
window.addEventListener('pointerup', handlePointerUp);

let colorBtns = document.querySelectorAll('.colorButton');
for (let i=0; i<colorBtns.length; i++) {
    colorBtns[i].addEventListener('click', handlePaletteClick);
    colorBtns[i].style.backgroundColor = colorBtns[i].getAttribute('data-color');
}

function setGridLayout(divsPerSide) {

    etchPad.style.gridTemplateColumns = `repeat(${divsPerSide}, 1fr)`;
    etchPad.style.gridTemplateRows = `repeat(${divsPerSide}, 1fr)`;
    etchPad.style.gridAutoRows = '1fr';
}

function clearBoard() {
    const nodeList = document.getElementsByClassName('pixel');

    for (let i=0; i<nodeList.length; i++) {
        nodeList[i].style.backgroundColor = "#FFFFFF";
    }
}

function deleteBoard() {
    let pixels = document.querySelectorAll('.pixel');
    for (let i=0; i<pixels.length; i++) {
        pixels[i].remove();
    }
}

function createBoard(sideCount) {
    for (let i=0; i<(sideCount*sideCount); i++) {
        let thisDiv = document.createElement('div');
        thisDiv.classList.add('testBorder');
        thisDiv.classList.add('pixel');
        thisDiv.addEventListener('mouseenter', handleMouseEnter);

        document.querySelector('#etchPad').appendChild(thisDiv);
    }
}

function handlePaletteClick(e) {
    if (e.button == 0) {
        currentColor1 = e.target.getAttribute('data-color');
    } else if (e.button == 2) {
        currentColor2 = e.target.getAttribute('data-color');
    }
}

function handlePointerUp() { pointer1Down = false; pointer2Down = false; }
function handlePointerDown(e) {
    let pointerButton = e.button;

    if (e.button == 0) {
        pointer1Down = true;
        if (e.target.classList.contains('pixel')) {
            e.target.style.backgroundColor = currentColor1;
        }
    } else if (e.button == 2) {
        pointer2Down = true;
        if (e.target.classList.contains('pixel')) {
            e.target.style.backgroundColor = currentColor2;
        }
    }
}

function handleMouseEnter(e) {
    if (pointer1Down) {
        e.target.style.backgroundColor = currentColor1;
    }
    if (pointer2Down) {
        e.target.style.backgroundColor = currentColor2;
    }
}

function handleReset(e) {
    deleteBoard();
    let newCount = prompt('How many pixels on a side for new board?');
    if (!newCount) {newCount = 16;}
    setGridLayout(newCount);
    createBoard(newCount);
}

setGridLayout(16);
createBoard(16);