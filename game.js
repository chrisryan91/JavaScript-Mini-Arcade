const gridContainer = document.querySelector(".grid-container");
const attemptsElement = document.querySelector(".attempts");
const timerElement = document.querySelector(".timer");

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
      "name": "ten"
  }
]

let cards = [...data, ...data];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let attempts = 0;
let timer = 0;
let timeStarted = false;
let pairs = 0;

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
      startTimer();
      timeStarted = true;
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

function checkForMatch() {
    attempts++;
    document.querySelector(".attempts").textContent = attempts;
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
      disableCards();
      pairs++;
      console.log(pairs);
      if (pairs === 9) {
        // Display an alert when the game is completed
        alert("Congratulations! You've completed the game!");
      };
    } else {
      unflipCards();
    };
  };

if (pairs === data.lenght) {
  alert("Congratulations! You have completed the game!");
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

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".attempts").textContent = attempts;
  attempts = 0;
  gridContainer.innerHTML = "";
  generateCards();
}

function startTimer() {
    let timerElement = document.querySelector(".timer");
    let time = 0;
    setInterval(() => {
        time++;
        timerElement.textContent = time;
    }, 1000);
}

shuffleCards();
generateCards();

