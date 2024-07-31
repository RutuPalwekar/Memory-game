const movesDisplay = document.getElementById("moves-count");
const timeDisplay = document.getElementById("timer"); 
const resultDisplay = document.getElementById("result");
const scoreDisplay = document.getElementById("score-display");
const gameContainer = document.querySelector(".game-container");
const resetBtn = document.getElementById("reset-btn");

const items = ["PEACH", "PEACH", "BANANA", "BANANA", "APPLE", "APPLE", "ORANGE", "ORANGE", "GRAPES", "GRAPES", "CHERRY", "CHERRY"];
let selectedCards = [];
let score = 0;
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let timer;

// Start game
const startGame = () => {
  movesCount = 0;
  score = 0;
  seconds = 0;
  minutes = 0;
  selectedCards = [];
  gameContainer.innerHTML = "";
  resultDisplay.textContent = "";
  updateScore();
  updateMovesCount();
  startTimer();
  initializeGameBoard();
};

// Timer
const startTimer = () => {
  clearInterval(timer); 
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    displayTimer();
  }, 1000);
};

// Display timer
const displayTimer = () => {
  let secondsValue = seconds;
  let minutesValue = minutes;

  if (seconds < 10) {
    secondsValue = '0' + seconds;
  }
  if (minutes < 10) {
    minutesValue = '0' + minutes;
  }
  timeDisplay.textContent = 'Time: ' + minutesValue + ':' + secondsValue;
};

// Update moves count
const updateMovesCount = () => {
  movesDisplay.textContent = `Moves: ${movesCount}`;
};



// Shuffle the items
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize game board
const initializeGameBoard = () => {
  const shuffledItems = shuffle(items);
  let cardsHTML = '';
  shuffledItems.forEach(item => {
    cardsHTML += `
      <div class="card-container">
        <div class="card" data-item="${item}">
          <div class="card-front"></div>
          <div class="card-back">${item}</div>
        </div>
      </div>
    `;
  });
  gameContainer.innerHTML = cardsHTML;
  
       // Add event listeners to the cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', handleCardClick);
  });
};

// Handle card click
const handleCardClick = (e) => {
  const clickedCard = e.target.closest(".card");

  if (!clickedCard || selectedCards.includes(clickedCard) || clickedCard.classList.contains("matched")) return;

  clickedCard.classList.add("flipped");
  selectedCards.push(clickedCard);

  if (selectedCards.length === 2) {
    movesCount++;
    updateMovesCount();
    setTimeout(checkForMatch, 300);
  }
};

// Check match
const checkForMatch = () => {
  const [firstCard, secondCard] = selectedCards;

  
  requestAnimationFrame(() => {
    if (firstCard.dataset.item === secondCard.dataset.item) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      selectedCards = [];
      score += 10;
      updateScore();
      console.log("Match found! Score: " + score);
    } 
else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        selectedCards = [];
        console.log("No match, try again! " + score);
      }, 100);
    }
  });
};
// Update score
const updateScore = () => {
  scoreDisplay.textContent = `Score: ${score}`;
};

// Reset game
const resetGame = () => {
  clearInterval(timer); 
  seconds = 0;
  minutes = 0;
  movesCount = 0;
  score = 0;
  selectedCards = [];
  resultDisplay.textContent = "";
  timeDisplay.textContent = 'Time: 00:00';
  movesDisplay.textContent = 'Moves: 0';
  scoreDisplay.textContent = 'Score: 0';
  gameContainer.innerHTML = "";
  startGame(); 
};

resetBtn.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', startGame);
