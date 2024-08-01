const movesDisplay = document.getElementById("moves-count");
const timeDisplay = document.getElementById("timer"); 
const resultDisplay = document.getElementById("result");
const scoreDisplay = document.getElementById("score-display");
const gameContainer = document.querySelector(".game-container");
const resetBtn = document.getElementById("reset-btn");
const startBtn = document.getElementById("start-btn");
const gameInfo = document.querySelector('.game-info');

const items = ["PAPAYA","PAPAYA","KIWI","KIWI","MANGO","MANGO","PEACH", "PEACH", "BANANA", "BANANA", "APPLE", "APPLE", "ORANGE", "ORANGE", "GRAPES", "GRAPES", "CHERRY", "CHERRY"];
let selectedCards = [];
let score = 0;
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let timer;
let lockBoard = false;

// Start game
const startGame = () => {
  movesCount = 0;
  score = 0;
  seconds = 0;
  minutes = 0;
  selectedCards = [];
  lockBoard = false; 
  gameContainer.innerHTML = "";
  resultDisplay.textContent = "";
  updateScore();
  updateMovesCount();
  startTimer();
  initializeGameBoard();

  gameContainer.style.display = 'grid';
  gameInfo.style.display = 'block'; 
  startBtn.style.display = 'none';
  resetBtn.style.display = 'inline-block';
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
  if (lockBoard) return;
  const clickedCard = e.target.closest(".card");

  if (!clickedCard || selectedCards.includes(clickedCard) || clickedCard.classList.contains("matched")) return;

  clickedCard.classList.add("flipped");
  selectedCards.push(clickedCard);

  if (selectedCards.length === 2) {
    movesCount++;
    updateMovesCount();
    lockBoard = true;
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
      selectedCards = [];
      lockBoard = false;

      // Check if all cards are matched
      if (document.querySelectorAll('.matched').length === items.length) {
        clearInterval(timer);
        resultDisplay.textContent = `Congratulations! You completed the game in ${movesCount} moves and ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} minutes.`;
      }
    }
     else {

      firstCard.classList.add("wrong");
      secondCard.classList.add("wrong"); 

      setTimeout(() => {
        firstCard.classList.remove("flipped" , "wrong");
        secondCard.classList.remove("flipped") , "wrong";
        selectedCards = [];
        lockBoard = false;
        console.log("No match, try again!");
      }, 800);
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
  gameContainer.style.display = 'none';
  gameInfo.style.display = 'none';
  startBtn.style.display = 'inline-block';
  resetBtn.style.display = 'none';
};

resetBtn.addEventListener('click', resetGame);
startBtn.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', () => {
  
  gameContainer.style.display = 'none';
  gameInfo.style.display = 'none'; 
  resetBtn.style.display = 'none';
});