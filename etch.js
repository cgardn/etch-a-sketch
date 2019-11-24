let etchPad = document.querySelector('#etchPad');
let currentColor = "#000000";
let pointerDown = false;

document.querySelector('#resetButton').addEventListener('click', handleReset);
document.querySelector('#clearButton').addEventListener('click', clearBoard);
window.addEventListener('pointerdown', handlePointerDown);
window.addEventListener('pointerup', handlePointerUp);

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
    //test 123
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
// on pointer down, paint target pixel
// set flag for pointer down/remove for pointer up
// check on pointer enter if pointerdown-flag is true, paint if so
// 

function handlePointerUp() { pointerDown = false; }
function handlePointerDown(e) {
    if (e.target.classList.contains('pixel')) {
        e.target.style.backgroundColor = currentColor; 
    }
    pointerDown = true;
}

function handleMouseEnter(e) {
    if (pointerDown) {
        e.target.style.backgroundColor = currentColor;
    }
}


function handleReset(e) {
    deleteBoard();
    let newCount = prompt('How many pixels on a side for new board?');
    if (!newCount) {newCount = 16;}
    setGridLayout(newCount);
    createBoard(newCount);

    //let divArray = Array.from(document.querySelectorAll('.pixel'))

    //divArray.forEach = (div) => {div.style.backgroundColor = '#ffffff';};
    //document.querySelectorAll('.pixel').style.backgroundColor = '#ffffff';
}

setGridLayout(16);
createBoard(16);