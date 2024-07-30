const moves = document.getElementById("moves-count");
const timeCal = document.getElementById("timer");
const gameContainer = document.querySelector(".game-container"); 
const items = [ "banana","banana","apple", "apple" , "orange", "orange", "watermelon", "watermelon", "cherry", "cherry"];
const selectedCards = [];
let score = 0;
let seconds = 0;
let minutes = 0;
let movesCount = 0;

// Timer
const startTimer= () => {
  setInterval(()=>{
    seconds++;
    if(seconds === 60){
      seconds = 0;
      minutes++
    }
    displayTimer();
  }, 1000)
};

const displayTimer =() => {
  let secondsValue = seconds;
  let minutesValue = minutes;

  if(seconds < 10){
    secondsValue = '0' + seconds;
    minutesValue = '0' + minutes;
  }
  document.getElementById('timer').textContent = 'Time: ' + minutesValue + ':' + secondsValue;
} ;

// Moves Count
const incrementMovesCount = () => {
  movesCount++;
  document.getElementById('moves-count').textContent = `Moves: ${movesCount}`;
};
startTimer();


// Shuffle the items
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const shuffledWords = shuffle(items);

  shuffledWords.forEach(items => {
    gameContainer.innerHTML += `
      <div class="card-container">
        <div class="card">${items}</div>
      </div>
    `;
  });

  const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
    card.addEventListener('click', function() {
        card.classList.toggle('is-flipped');
    });
});


  gameContainer.addEventListener("click", function(e) {
    const clickedCard = e.target.closest(".card");
    
    if (!clickedCard || selectedCards.includes(clickedCard)) return; 
    
    clickedCard.classList.add("selected");
    selectedCards.push(clickedCard);
    incrementMovesCount();

    
    if (selectedCards.length === 2) {
        const [firstCard, secondCard] = selectedCards;
        
        if (firstCard.innerText === secondCard.innerText && firstCard !== secondCard) {
           
            selectedCards.length = 0; 
            score +=10;
            updateScore();
            console.log("Match found! Score: "+ score);

        } else {
            
            setTimeout(() => {
                firstCard.classList.remove("selected");
                secondCard.classList.remove("selected");
                selectedCards.length = 0; 
                console.log("No match, try again!"+ score);
            }, 1000);
        }
    }
});
function updateScore() {
    document.getElementById("score-display").textContent = `Score: ${score}`;
}
