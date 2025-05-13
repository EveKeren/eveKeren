'use strict'
const bingoCard = document.getElementById('bingoCard');
const callPicDisplay = document.getElementById('callPicture');
const messageDisplay = document.getElementById('message');
let card = [];
let calledPictures = [];

// array with the pictures
const picturePool = [
    'pictures/Eve.png',
    'pictures/Gili.png',
    'pictures/Hagai.png',
    'pictures/Meir.png',
    'pictures/Nikolay.png',
    'pictures/Nir.png',
    'pictures/Rona.png',
    'pictures/Shahar.png',
    'pictures/Shimi.png',
    'pictures/Sofi.png',
    'pictures/Asaf_Granit.png',
    'pictures/Barbie.png',
    'pictures/Beyonce.png',
    'pictures/Einstein.png',
    'pictures/Elon_Musk.png',
    'pictures/Gal_Gadot.png',
    'pictures/Indiana_Jones.png',
    'pictures/Jobs.png',
    'pictures/Mad_Hatter.png',
    'pictures/Messi.png',
    'pictures/Napoleon.png',
    'pictures/Pickachu.png',
    'pictures/Salvador_Dali.png',
    'pictures/Sherlock.png',
    'pictures/Shrek.png',
    'pictures/Spiderman.png',
    'pictures/Sponge_Bob.png',
    'pictures/Trump.png',
    'pictures/Uri_Geller.png',
    'pictures/Shakespear.png',
    'pictures/Charlie_Chaplin.png',
    'pictures/Yonit_Levi.png'
];

function generateCard() {
    card = [];
    const shuffledPictures = picturePool.sort(() => Math.random() - 0.5).slice(0, 32);
    let index = 0;
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            if (i === 2 && j === 2) {
                row.push('BINGO');
            } else {
                row.push(shuffledPictures[index++]);
            }
        }
        card.push(row);
    }
    renderCard();
}

function renderCard() {
    bingoCard.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (card[i][j] === 'BINGO') {
                cell.textContent = 'BINGO';
                cell.classList.add('bingo', 'marked');
            } else {
                const img = document.createElement('img');
                img.src = card[i][j];
                cell.appendChild(img);
            }
            cell.addEventListener('click', () => markCell(i, j));
            bingoCard.appendChild(cell);
        }
    }
}

function markCell(i, j) {
    if (card[i][j] === 'BINGO' || !calledPictures.includes(card[i][j])) return;
    const cells = bingoCard.children;
    const index = i * 5 + j;
    cells[index].classList.add('marked');
    checkWin();
}

function callPicture() {
    let availablePictures = picturePool.filter(pic => !calledPictures.includes(pic));
    if (availablePictures.length === 0) {
        callPicDisplay.textContent = 'No more pics to call!';
        return;
    }
    const pic = availablePictures[Math.floor(Math.random() * availablePictures.length)];
    calledPictures.push(pic);
    callPicDisplay.innerHTML = `<img src="${pic}" alt="Called Picture">`;
    checkWin();
}

function checkWin() {
    let win = false;
    // Check rows
    for (let i = 0; i < 5; i++) {
        if (card[i].every((_, j) => {
            const cell = bingoCard.children[i * 5 + j];
            return cell.classList.contains('marked');
        })) {
            win = true;
        }
    }
    // Check columns
    for (let j = 0; j < 5; j++) {
        let colWin = true;
        for (let i = 0; i < 5; i++) {
            const cell = bingoCard.children[i * 5 + j];
            if (!cell.classList.contains('marked')) {
                colWin = false;
                break;
            }
        }
        if (colWin) win = true;
    }
    // Check diagonals
    let diag1 = true, diag2 = true;
    for (let i = 0; i < 5; i++) {
        if (!bingoCard.children[i * 5 + i].classList.contains('marked')) diag1 = false;
        if (!bingoCard.children[i * 5 + (4 - i)].classList.contains('marked')) diag2 = false;
    }
    if (diag1 || diag2) win = true;

    if (win) {
        messageDisplay.textContent = 'BINGO! You win! Good Job:)';
    }
}

function resetGame() {
    calledPictures = [];
    callPicDisplay.textContent = 'Click "Call Image" to start!';
    messageDisplay.textContent = '';
    generateCard();
}

// Initialize game
generateCard();