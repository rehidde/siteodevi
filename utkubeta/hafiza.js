const sections = document.querySelectorAll('.content-section');

function showSection(id) {
    sections.forEach(sec => sec.classList.remove('active-section'));
    document.getElementById(id).classList.add('active-section');
}

function showConfirmation() {
    document.getElementById('confirmationBox').classList.remove('d-none');
}

function startCountdown(mode) {
    document.getElementById('confirmationBox').classList.add('d-none');
    const countdownEl = document.getElementById('countdown');
    let count = 3;
    countdownEl.textContent = count;
    countdownEl.classList.remove('d-none');

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else if (count === 0) {
            countdownEl.textContent = 'Başla!';
        } else {
            clearInterval(interval);
            countdownEl.classList.add('d-none');
            startGame(mode);
        }
    }, 1000);
}

let score = 0;
let timer;
let timeLeft;
let firstCard = null;
let lockBoard = false;
let difficulty = 'easy';
let matchedCards = 0;

function startGame(mode) {
    difficulty = mode;
    score = 0;
    matchedCards = 0;
    updateScore();
    timeLeft = mode === 'easy' ? 60 : 30;
    updateTimer();
    clearInterval(timer);
    document.getElementById('winMessage').classList.add('d-none');

    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            showGameOver();
        }
    }, 1000);

    const board = document.getElementById('gameBoard');
    const gridSize = mode === 'easy' ? 4 : 6;
    board.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;
    const totalCards = gridSize * gridSize;

    const symbols = [];
    for (let i = 0; i < totalCards / 2; i++) {
        const symbol = String.fromCharCode(65 + i);
        symbols.push(symbol, symbol);
    }
    symbols.sort(() => 0.5 - Math.random());

    board.innerHTML = '';
    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.innerHTML = '?';
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

function updateScore() {
    document.getElementById('score').textContent = 'Skor: ' + score;
}

function updateTimer() {
    document.getElementById('timer').textContent = 'Süre: ' + timeLeft;
}

function showGameOver() {
    const countdownEl = document.getElementById('countdown');
    countdownEl.textContent = 'Süre Doldu!';
    countdownEl.classList.remove('d-none');
    setTimeout(() => countdownEl.classList.add('d-none'), 3000);
}

function flipCard(card) {
    if (lockBoard || card.textContent !== '?') return;
    card.textContent = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    if (firstCard.dataset.symbol === card.dataset.symbol) {
        score += (difficulty === 'easy') ? 10 : 30;
        matchedCards += 2;
        updateScore();
        firstCard = null;

        const totalCards = (difficulty === 'easy') ? 16 : 36;
        if (matchedCards === totalCards) {
            clearInterval(timer);
            const winEl = document.getElementById('winMessage');
            winEl.classList.remove('d-none');
        }
    } else {
        score -= (difficulty === 'easy') ? 2 : 5;
        updateScore();
        lockBoard = true;
        setTimeout(() => {
            firstCard.textContent = '?';
            card.textContent = '?';
            firstCard = null;
            lockBoard = false;
        }, 800);
    }
}