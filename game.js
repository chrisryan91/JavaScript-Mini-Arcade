const gridContainer = document.querySelector(".grid-container");
const attemptsElement = document.querySelector(".attempts");
const timerElement = document.querySelector(".timer");
const lowestElement = document.querySelector(".lowest");
const modal = document.getElementById("myModal");

const data = [
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
      "name": "ten",
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

const easyCards = data.slice(0, 6); // 6 cards for easy
const mediumCards = data.slice(0, 9); // 9 cards for medium
const difficultCards = data.slice(0, 12); // 12 cards for difficult

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

let easyLowest = parseInt(localStorage.getItem("easyLowest")) || "No attempts!";
let mediumLowest = parseInt(localStorage.getItem("mediumLowest")) || "No attempts!";
let difficultLowest = parseInt(localStorage.getItem("difficultLowest")) || "No attempts!";

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

function openModal() {
  modal.style.display = "";
}

function closeModal() {
  modal.style.display = "none";
}

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

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

function flipCard() {
    if (!timeStarted) {
      timeStarted = true;
      startTimer();
    }
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
        return;
        }
    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function updateLowestScore(currentDifficulty) {
  const storageKey = `${currentDifficulty}Lowest`;
  const storedScore = parseInt(localStorage.getItem(storageKey)) || Infinity;

  if (attempts < storedScore) {
    localStorage.setItem(storageKey, attempts);
    updateLowest(attempts);
  }
}

function checkForMatch() {
  attempts++;
  attemptsElement.textContent = attempts;
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    disableCards();
    pairs++;

    if (pairs === pairsToMatch) {
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

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function startTimer() {
  if (!timeRunning) {
      timerInterval = setInterval(() => {
          time++;
          timerElement.textContent = time;
      }, 1000);
  timeRunning = true;
    }
}

function stopTimer() {
  clearInterval(timerInterval);
  time = 0;
  timerElement.textContent = time;
  timeRunning = false;
  attempts = 0;
  document.querySelector(".attempts").textContent = attempts;
}

function startGame(difficulty) {
  console.log(`Starting the game with difficulty: ${difficulty}`);
  resetBoard();
  stopTimer();
  pairs = 0;
  gridContainer.innerHTML = "";
  currentDifficulty = difficulty;

  let selectedCards = [];

  if (currentDifficulty === "easy") {
    selectedCards = easyCards;
    pairsToMatch = easyCards.length;
    low = easyLowest;
    updateLowest(low);
  } else if (currentDifficulty === "medium") {
    selectedCards = mediumCards;
    pairsToMatch = mediumCards.length;
    low = mediumLowest;
    updateLowest(low);
  } else if (currentDifficulty === "difficult") {
    selectedCards = difficultCards;
    pairsToMatch = difficultCards.length;
    low = difficultLowest;
    updateLowest(low);
  }

  cards = [...selectedCards, ...selectedCards];
  shuffleCards();
  generateCards();
  openModal();
}

function updateLowest(currentDifficulty) {
  const storageKey = `${currentDifficulty}Lowest`;
  const storedScore = parseInt(localStorage.getItem(storageKey)) || "No attempts yet!";
  lowestElement.textContent = storedScore;
}

openModal();