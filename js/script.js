const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let score = 0;

// Array con le immagini del tema
const images = [
    'images/marvel/spiderman.png',
    'images/marvel/spiderman2.png',
    'images/marvel/blackpanther.png',
    'images/marvel/captainamerica.png',
    'images/marvel/daredevil.png',
    'images/marvel/deadpool.png',
    'images/marvel/ironman.png',
    'images/marvel/ironman2.png',
    'images/marvel/vision.png',
    'images/marvel/wolverine.png',
];
const cards = [...images, ...images]; // Doppio array per le coppie

// Mischia le carte
cards.sort(() => 0.5 - Math.random());

// Crea dinamicamente la griglia di carte
cards.forEach(image => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">
      <img style="width: 100%" src="${image}" alt="">
      </div>
    </div>`;
  grid.appendChild(card);

  card.addEventListener('click', flipCard);
});

function flipCard() {
  if (lockBoard) return;
  const cardInner = this.querySelector('.card-inner');

  if (cardInner.classList.contains('flipped')) return;
  cardInner.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  lockBoard = true;
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  
}

function unflipCards() {
  setTimeout(() => {
    firstCard.querySelector('.card-inner').classList.remove('flipped');
    secondCard.querySelector('.card-inner').classList.remove('flipped');
    resetBoard();
  }, 1000);
  score++;
  scoreDisplay.textContent = score;
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
