const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let score = 0;

// array immagini 
// marvel
const marvels = [
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
const marvelCards = [...marvels, ...marvels]; 


// crea dinamicamente la griglia di carte
marvelButton.addEventListener('click', () => { 
  
  // svuoto la griglia 
  grid.innerHTML = '';
  
  // mischio le carte
  marvelCards.sort(() => 0.5 - Math.random());

  score = 0;
  scoreDisplay.textContent = score;

  marvelCards.forEach(marvel => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner ">
        <div class="card-front" style="background-image: url('images/marvel/sfondo-marvel.jpg');"></div>
        <div class="card-back" style="background-color: rgb(122, 3, 3);">
        <img style="width: 100%" src="${marvel}" alt="">
        </div>
      </div>`;
    grid.appendChild(card);
  
    card.addEventListener('click', flipCard);
  });

})

// pokemon
const pokemons = [
  'images/pokemon/bulbasaur.png',
  'images/pokemon/charmender.png',
  'images/pokemon/eevee.png',
  'images/pokemon/meowth.png',
  'images/pokemon/mew.png',
  'images/pokemon/pikachu.png',
  'images/pokemon/psyduck.png',
  'images/pokemon/snorlax.png',
  'images/pokemon/squirtle.png',
  'images/pokemon/zubat.png', 
];
const pokemonCards = [...pokemons, ...pokemons]; 


// crea dinamicamente la griglia di carte
pokemonButton.addEventListener('click', () => { 


  // svuoto la griglia 
  grid.innerHTML = '';
  
  // mischio le carte
  pokemonCards.sort(() => 0.5 - Math.random());


  score = 0;
  scoreDisplay.textContent = score;

  pokemonCards.forEach(pokemon => {
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front" style="background-image: url('images/pokemon/sfondo-pokemon.jpg');"></div>
        <div class="card-back" style="background-color: #FFD54F;">
        <img style="width: 100%" src="${pokemon}" alt="">
        </div>
      </div>`;
    grid.appendChild(card);

    card.addEventListener('click', flipCard);
  });

})

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


 