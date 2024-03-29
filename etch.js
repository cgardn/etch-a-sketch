let etchPad = document.querySelector('#etchPad');
let currentColor1 = "#000000";
let currentColor2 = "red";
let pointer1Down = false;
let pointer2Down = false;
let isGridVisible = true;

document.querySelector('#resetButton').addEventListener('click', handleReset);
document.querySelector('#clearButton').addEventListener('click', clearBoard);
document.querySelector('#toggleGrid').addEventListener('pointerdown', toggleGrid);
window.addEventListener('pointerdown', handlePointerDown);
window.addEventListener('pointerup', handlePointerUp);

let colorBtns = document.querySelectorAll('.colorButton');
for (let i=0; i<colorBtns.length; i++) {
    colorBtns[i].addEventListener('pointerdown', handlePaletteClick);
    colorBtns[i].style.backgroundColor = colorBtns[i].getAttribute('data-color');
}

document.querySelector('#indicator1').style.backgroundColor = currentColor1;
document.querySelector('#indicator2').style.backgroundColor = currentColor2;

function setGridLayout(divsPerSide) {

    etchPad.style.gridTemplateColumns = `repeat(${divsPerSide}, 1fr)`;
    etchPad.style.gridTemplateRows = `repeat(${divsPerSide}, 1fr)`;
    etchPad.style.gridAutoRows = '1fr';
}

function toggleGrid() {

    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach( (pix) => {
        pix.classList.toggle('drawGrid');

        // if (pix.style.border == "hidden") {
        //     pix.style.border = "1px dotted rgb(179, 179, 179)";
        // }
        // else {
        //     pix.style.border = "hidden";
        // }
    });
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
        thisDiv.classList.add('drawGrid');
        thisDiv.classList.add('pixel');
        thisDiv.addEventListener('mouseenter', handleMouseEnter);

        document.querySelector('#etchPad').appendChild(thisDiv);
    }
}

function handlePaletteClick(e) {
    console.log(e.button);
    if (e.button == 0) {
        currentColor1 = e.target.getAttribute('data-color');
        document.querySelector('#indicator1').style.backgroundColor = currentColor1;
    } else if (e.button == 2) {
        currentColor2 = e.target.getAttribute('data-color');
        document.querySelector('#indicator2').style.backgroundColor = currentColor2;
    }
}

function handlePointerUp() { pointer1Down = false; pointer2Down = false; }
function handlePointerDown(e) {

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
    let newCount = prompt('How many pixels on a side for new board?');
    if (!newCount) {return;}
    deleteBoard();
    setGridLayout(newCount);
    createBoard(newCount);
}

setGridLayout(16);
createBoard(16);