// Define an array of card deck
const deck = [
//Each object contains an image source and a name for the card
{
image: "assets/images/deck_of_cards/2_of_hearts.png",
name: "two",
},
{
image: "assets/images/deck_of_cards/3_of_hearts.png",
name: "three",
},
{
image: "assets/images/deck_of_cards/4_of_hearts.png",
name: "four",
},
{
image: "assets/images/deck_of_cards/5_of_hearts.png",
name: "five",
},
{
image: "assets/images/deck_of_cards/6_of_hearts.png",
name: "six",
},
{
image: "assets/images/deck_of_cards/7_of_hearts.png",
name: "seven",
},
{
image: "assets/images/deck_of_cards/8_of_hearts.png",
name: "eight",
},
{
image: "assets/images/deck_of_cards/9_of_hearts.png",
name: "nine",
},
{
image: "assets/images/deck_of_cards/10_of_hearts.png",
name: "ten",
},
{
image: "assets/images/deck_of_cards/jack_of_hearts.png",
name: "jack",
},
{
image: "assets/images/deck_of_cards/queen_of_hearts.png",
name: "queen",
},
{
image: "assets/images/deck_of_cards/king_of_hearts.png",
name: "king",
},
];

// Create array of cards for different difficulty levels
const easyGame = deck.slice(0, 6); // 6 cards for easy
const mediumGame = deck.slice(0, 9); // 9 cards for medium
const difficultGame = deck.slice(0, 12); // 12 cards for difficult


// Initialize game variables
let cards = [...deck, ...deck];
let choiceOne = null;
let choiceTwo = null;
let pauseGame = false;
let attempts = 0;
let time = 0;
let timerInterval;
let timeStarted = false;
let timeRunning = false;
let pairs = 0;
let pairsToMatch = 0;
let currentDifficulty = "";
let low;
let easyLowest;
let mediumLowest;
let difficultLowest;
let gameStarted;

// Selecting DOM elements
const gridContainer = document.querySelector(".game-board");
const attemptsElement = document.querySelector(".attempts");
const timerElement = document.querySelector(".timer");
const lowestElement = document.querySelector(".lowest");
const modal = document.querySelector("#myModal");
const easyBtn = document.querySelector('#easyBtn');
const mediumBtn = document.querySelector('#mediumBtn');
const difficultBtn = document.querySelector('#difficultBtn');

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

// Get lowest scores from localStorage or set to a default value
easyLowest = parseInt(localStorage.getItem("easyLowest")) || "No attempts!";
mediumLowest = parseInt(localStorage.getItem("mediumLowest")) || "No attempts!";
difficultLowest =
parseInt(localStorage.getItem("difficultLowest")) || "None yet!";

// Function to open the modal
function openModal() {
    modal.style.display = "";
};

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
};

// Function to shuffle the cards randomly using Fisher-Yates shuffle
function shuffle() {
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
};

// Function to deal the game cards
function dealCards() {
// Loop through each card in the array
    for (let card of cards) {
        // Create a new div for the card
        const cardDiv = document.createElement("div");
        // Add a "card" class
        cardDiv.classList.add("card");
        // Set the data-name attribute
        cardDiv.id = card.name;
        // Set the HTML of the card element with front and back elements
        cardDiv.innerHTML = `
            <div class="front">
              <img class="front-card" src=${card.image} />
            </div>
            <div class="back"></div>
            `;
        // Append the card to the game board
        gridContainer.appendChild(cardDiv);
        // Add event listener to turn the card over
        cardDiv.addEventListener("click", turnOver);
    }
};

// Function to handle card flipping when clicked
function turnOver() {
    // Start the timer
    if (!timeStarted) {
        timeStarted = true;
        startTimer();
    }
    // If the board is locked, do nothing
    if (pauseGame) return;
    // If the same card is clicked twice, do nothing
    if (this === choiceOne) return;
    this.classList.add("flipped");
    // If no card is flipped, set this as the first card
    if (!choiceOne) {
        choiceOne = this;
        return;
    }
    // Otherwise, set this as the second card and check for a match
    choiceTwo = this;
    pauseGame = true;
    check();
};

// Function to check if the two flipped cards match
function check() {
    attempts++;
    attemptsElement.textContent = attempts;
    const match = choiceOne.id === choiceTwo.id;
    if (match) {
        // Remove event listener on card
        choiceOne.removeEventListener("click", turnOver);
        choiceTwo.removeEventListener("click", turnOver);
        reset();    
        pairs++;
        if (pairs === pairsToMatch) {
            // If "low" is a string, then check if the player's attempts are lower
            if (typeof low === "string") {
                low = 100;
            }
            if (attempts < low) {
                updateLowestScore(currentDifficulty);
            }
            stopTimer();
            setTimeout(function() {
                alert("Congratulations! You've completed the game!");},1000);
            timeStarted = false;
            updateLowest(currentDifficulty);
            }
        } else {
            reTurn();
    }
};

// Function to return non-matching cards after a short delay
function reTurn() {
    setTimeout(() => {
        choiceOne.classList.remove("flipped");
        choiceTwo.classList.remove("flipped");
        reset();
    }, 1000);
};

// Function to reset the first and second cards and unlock the board
function reset() {
    choiceOne = null;
    choiceTwo = null;
    pauseGame = false;
    timeStarted = false;
};

// Function to start the game timer
function startTimer() {
    if (!timeRunning) {
        timerInterval = setInterval(() => {
        time++;
        timerElement.textContent = time;
        }, 1000);
        timeRunning = true;
    }
};

// Function to stop the game timer
function stopTimer() {
    clearInterval(timerInterval);
    time = 0;
    timerElement.textContent = time;
    timeRunning = false;
    attempts = 0;
};

// Function to start the game with the selected difficulty
function startGame(difficulty) {
    reset();
    stopTimer();
    document.querySelector(".attempts").textContent = attempts;
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
    shuffle();
    dealCards();
    openModal();
};

// Function to update the lowest score in localStorage
function updateLowestScore(currentDifficulty) {
  const storageKey = `${currentDifficulty}Lowest`;
  const storedScore = parseInt(localStorage.getItem(storageKey)) || Infinity;
  if (attempts < storedScore) {
      localStorage.setItem(storageKey, attempts);
      updateLowest(attempts);
  }
};

// Function to update the lowestElement in the HTML
function updateLowest(currentDifficulty) {
    const storageKey = `${currentDifficulty}Lowest`;
    const storedScore = parseInt(localStorage.getItem(storageKey)) || "None yet!";
    lowestElement.textContent = storedScore;
};

document.getElementById('restartButton').addEventListener('click', function () {
startGame();
});

// Opens the Modal to choose difficulty level and start game
openModal();