let etchPad = document.querySelector('#etchPad');

document.querySelector('#resetButton').addEventListener('click', handleReset);

function setGridLayout(divsPerSide) {

    etchPad.style.gridTemplateColumns = `repeat(${divsPerSide}, 1fr)`;
    etchPad.style.gridTemplateRows = `repeat(${divsPerSide}, 1fr)`;
    etchPad.style.gridAutoRows = '1fr';
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


function handleMouseEnter(e) {
    e.target.style.backgroundColor = "rgb(32,32,32)";
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