// Selecting DOM elements
const gridContainer = document.querySelector(".grid-container");
const attemptsElement = document.querySelector(".attempts");
const timerElement = document.querySelector(".timer");
const lowestElement = document.querySelector(".lowest");
const modal = document.getElementById("myModal");

// Define an array of card data
const data = [
  //Each object contains an image source and a name for the card
  {
      "image": "assets/images/deck_of_cards/2_of_hearts.png",
      "name": "two"
  },
  {
      "image": "assets/images/deck_of_cards/3_of_hearts.png",
      "name": "three"
  },
  {
      "image": "assets/images/deck_of_cards/4_of_hearts.png",
      "name": "four"
  },
  {
      "image": "assets/images/deck_of_cards/5_of_hearts.png",
      "name": "five"
  },
  {
      "image": "assets/images/deck_of_cards/6_of_hearts.png",
      "name": "six"
  },
  {
      "image": "assets/images/deck_of_cards/7_of_hearts.png",
      "name": "seven"
  },
  {
      "image": "assets/images/deck_of_cards/8_of_hearts.png",
      "name": "eight"
  },
  {
      "image": "assets/images/deck_of_cards/9_of_hearts.png",
      "name": "nine"
  },
  {
      "image": "assets/images/deck_of_cards/10_of_hearts.png",
      "name": "ten"
  },
  {
      "image": "assets/images/deck_of_cards/jack_of_hearts.png",
      "name": "jack"
  },
  {
      "image": "assets/images/deck_of_cards/queen_of_hearts.png",
      "name": "queen"
  },
  {
      "image": "assets/images/deck_of_cards/king_of_hearts.png",
      "name": "king"
  }
];

// Create array of cards for different difficulty levels
const easyGame = data.slice(0, 6); // 6 cards for easy
const mediumGame = data.slice(0, 9); // 9 cards for medium
const difficultGame = data.slice(0, 12); // 12 cards for difficult

// Initialize game variables
let cards = [...data, ...data];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let time = 0;
let timerInterval;
let timeStarted = false;
let timeRunning = false;
let pairs = 0;
let pairsToMatch = 0;
let currentDifficulty = "";
let low;

// Get lowest scores from localStorage or set to a default value
easyLowest = parseInt(localStorage.getItem("easyLowest")) || "No attempts!";
mediumLowest = parseInt(localStorage.getItem("mediumLowest")) || "No attempts!";
difficultLowest = parseInt(localStorage.getItem("difficultLowest")) || "None yet!";

// Event listeners for difficulty selection buttons
easyBtn.addEventListener("click", function () {
  startGame("easy");
  currentDifficulty = "easy";
  closeModal();
  updateLowest(currentDifficulty);
});

mediumBtn.addEventListener("click", function () {
  startGame("medium");
  currentDifficulty = "medium";
  closeModal();
  updateLowest(currentDifficulty);
});

difficultBtn.addEventListener("click", function () {
  startGame("difficult");
  currentDifficulty = "difficult";
  closeModal();
  updateLowest(currentDifficulty);
});

// Function to open the modal
function openModal() {
  modal.style.display = "";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Function to shuffle the cards randomly
function shuffleCards() {
  let currentIndex = cards.length;
    let randomIndex;
    let temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

// Function to generate the game cards
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

// Function to handle card flipping when clicked
function flipCard() {
  // Start the timer
    if (!timeStarted) {
      timeStarted = true;
      startTimer();
    }
    // If the board is locked, do nothing
    if (lockBoard) return;
    // If the same card is clicked twice, do nothing
    if (this === firstCard) return;
    this.classList.add("flipped");
    // If no card is flipped, set this as the first card
    if (!firstCard) {
        firstCard = this;
        return;
        }
    // Otherwise, set this as the second card and check for a match
    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// Function to update the lowest score in localStorage
function updateLowestScore(currentDifficulty) {
  const storageKey = `${currentDifficulty}Lowest`;
  const storedScore = parseInt(localStorage.getItem(storageKey)) || Infinity;

  if (attempts < storedScore) {
    localStorage.setItem(storageKey, attempts);
    updateLowest(attempts);
  }
}

// Function to check if the two flipped cards match
function checkForMatch() {
  attempts++;
  attemptsElement.textContent = attempts;
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    disableCards();
    pairs++;

    if (pairs === pairsToMatch) {
      // If "low" is a string, then check if the player's attempts are lower
      if (typeof low === "string"){
        low = 100;
      }
      if (attempts < low) {
        updateLowestScore(currentDifficulty);
      }
      stopTimer();
      alert("Congratulations! You've completed the game!");
      timeStarted = false;
      updateLowest(currentDifficulty);
    }
  } else {
    unflipCards();
  }
}

// Function to disable matching cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Function to unflip non-matching cards after a short delay
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Function to reset the first and second cards and unlock the board
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Function to start the game timer
function startTimer() {
  if (!timeRunning) {
      timerInterval = setInterval(() => {
          time++;
          timerElement.textContent = time;
      }, 1000);
  timeRunning = true;
    }
}

// Function to stop the game timer
function stopTimer() {
  clearInterval(timerInterval);
  time = 0;
  timerElement.textContent = time;
  timeRunning = false;
  attempts = 0;
  document.querySelector(".attempts").textContent = attempts;
}

// Function to start the game with the selected difficulty
function startGame(difficulty) {
  resetBoard();
  stopTimer();
  pairs = 0;
  gridContainer.innerHTML = "";
  currentDifficulty = difficulty;

  let selectedCards = [];

  if (currentDifficulty === "easy") {
    selectedCards = easyGame;
    pairsToMatch = easyGame.length;
    low = easyLowest;
    updateLowest(low);
  } else if (currentDifficulty === "medium") {
    selectedCards = mediumGame;
    pairsToMatch = mediumGame.length;
    low = mediumLowest;
    updateLowest(low);
  } else if (currentDifficulty === "difficult") {
    selectedCards = difficultGame;
    pairsToMatch = difficultGame.length;
    low = difficultLowest;
    updateLowest(low);
  }

  cards = [...selectedCards, ...selectedCards];
  shuffleCards();
  generateCards();
  openModal();
}

// Function to update the lowestElement in the HTML
function updateLowest(currentDifficulty) {
  const storageKey = `${currentDifficulty}Lowest`;
  const storedScore = parseInt(localStorage.getItem(storageKey)) || "None yet!";
  lowestElement.textContent = storedScore;
}

openModal();