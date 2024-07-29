const gameContainer = document.querySelector(".game-container"); 
const items = [ "banana","banana","apple", "apple" , "orange", "orange", "watermelon", "watermelon", "cherry", "cherry"];
const selectedCards = [];

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

  gameContainer.addEventListener("click", function(e) {
    const clickedCard = e.target.closest(".card");
    
    if (!clickedCard || selectedCards.includes(clickedCard)) return; 
    
    clickedCard.classList.add("selected");
    selectedCards.push(clickedCard);
    
    if (selectedCards.length === 2) {
        const [firstCard, secondCard] = selectedCards;
        
        if (firstCard.innerText === secondCard.innerText && firstCard !== secondCard) {
           
            selectedCards.length = 0; 
            console.log("Match found!");

        } else {
            
            setTimeout(() => {
                firstCard.classList.remove("selected");
                secondCard.classList.remove("selected");
                selectedCards.length = 0; 
                console.log("No match, try again!");
            }, 1000);
        }
    }
});