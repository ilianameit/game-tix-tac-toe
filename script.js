const playerText = document.querySelector('#player-text');
const restart = document.querySelector('#restart');
const boxes = Array.from(document.querySelectorAll('.box'));
const winBlock = getComputedStyle(document.body).getPropertyValue('--win-block');
const gameBoard = document.querySelector('#game-board');
const neco = document.querySelector('#neco');

const PLAYER = {x: 'X', o: 'O'};
let currentPlayer = PLAYER.x;
let spaces = Array(boxes.length).fill(null);

function startGame() {
    gameBoard.addEventListener('click', boxClicked);
    gameBoard.addEventListener('mouseover', boxHover);
    playerText.textContent = `player turn: ${currentPlayer}`;
}

function boxHover(evt) {
    const target = evt.target;
    const related = evt.relatedTarget;
    if(target.className === 'box' && related && !spaces[related.id]){
        spaces.forEach((item, i) => {
            if(!item) {
                boxes[i].textContent = '';
                boxes[i].style.opacity = 1;
            }
        });
    }
    if(target.className === 'box' && target.id && !spaces[target.id]) {
        target.style.opacity = .5;
        target.textContent = currentPlayer;
    }
}

function boxClicked(evt) {
    const target = evt.target;

    if(target.className === 'box') {
        const id = target.id;
        if(!spaces[id]) {
            target.style.opacity = 1;
            spaces[id] = currentPlayer;
            boxes[id].textContent = currentPlayer;
            
            if(isCurrentPlayerWon()) {
                playerText.textContent = `player ${currentPlayer} was won!`;
                neco.src = './img/neco-win.gif'
                
                const winningBlocks = isCurrentPlayerWon();
                winningBlocks.map(block => {boxes[block].style.backgroundColor = winBlock});
                return;
            }
            const isDrawGame = spaces.every(item => {return (item !== null)})
            if(isDrawGame) {
                drawGame();
                return;
            }

            currentPlayer = currentPlayer == PLAYER.x ? PLAYER.o : PLAYER.x;
            playerText.textContent = `player turn ${currentPlayer}`;
        }
    }
}

function restartGame() {
    neco.src = './img/neco.gif';
    currentPlayer = PLAYER.x;
    playerText.textContent = `player turn: ${currentPlayer}`;
    spaces.fill(null)
    boxes.forEach((box) => {
        box.textContent = '';
        box.style.backgroundColor ='';
    });
}

function isCurrentPlayerWon() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if(spaces[a]  && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return combo;
        }
    }
    return false;
}

function drawGame() {
    playerText.textContent = 'Draw Game. Click Restart';
    neco.src = './img/neco-draw.gif';
}

const winningCombos = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

startGame();
restart.addEventListener('click', restartGame);