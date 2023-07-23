const squares = document.querySelectorAll('.square');
const click = document.querySelector('.click');
const timeLeft = document.querySelector('#remaining-time');
const scoreClickGame = document.querySelector('#score');
let result = 0;
let hitPosition;
let currentTime = 60;
let top = localStorage.getItem("topScore");
let highScore = document.getElementById("highscorecg");

// set the highScore to the saved data in localStorage

highScore.innerHTML = top;

// Function which adds and removes the Click.png image from one of the 9 divs at random and gets the id of the randomly chosen div

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('click')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('click')
    
    hitPosition = randomSquare.id

    if (currentTime === 0 ) {
        return;
    }

}

// Function that adds an event listener on each of the square divs which checks if the clicked div is equal to the randomly chosen div with the Click.png image

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            scoreClickGame.textContent = result
            hitPosition = null
        }

    })
})

// Function to set the randomSquare function in motion at an interval 

function moveMole() {
    let timerId;
    timerId = setInterval(randomSquare, 750);
}


// Call the above function

moveMole();

// Function to count out one minute from 60 seconds to zero and display the countdown

function countDown () {
    currentTime--
    timeLeft.textContent = currentTime;

    // if statement which will determine the score of the game, save it in localStorage and update the DOM
    if (currentTime === 0) {
        clearInterval(countDownTimerId)
        if (result > top) {
            localStorage.setItem("topScore", result);
            highScore.textContent = top;
            }
    }
}

// Begin the countdown

let countDownTimerId = setInterval(countDown, 1000);

// Add a querySelection to the restart button to reload the page if the function is called

document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
    });

const userScoreSpan = document.getElementById("user-result");
const computerScoreSpan = document.getElementById("computer-result");
const rck_div = document.getElementById("Rock");
const ppr_div = document.getElementById("Paper");
const scssr_div = document.getElementById("Scissor");
const scoreBoard_div = document.querySelector(".score-board");
const winner_div = document.querySelector(".winner > p");
let userScore = 0;
let computerScore = 0;

// Function to generate a random choice from Rock, Paper or Scissors 

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissor'];
    const randomNumber = Math.floor(Math.random()*3);
    return choices[randomNumber];
}

// Function to addEventListener onto the three images to generate the players choice

function main() {
    ppr_div.addEventListener('click', function() {
        game("Paper");
    })

    rck_div.addEventListener('click', function() {
        game("Rock");
    })

    scssr_div.addEventListener('click', function() {
        game("Scissor");
    })

}

// Function using a switch expression to determine is the player wins, computer wins or if it ends in a draw

function game(userChoice) {
    const computerChoice = getComputerChoice();
        switch (userChoice + computerChoice){
            case "RockScissor":
            case "PaperRock":
            case "ScissorPaper":
                    win(userChoice, computerChoice);
                    break;
            case "RockPaper":
            case "PaperScissor":
            case "ScissorRock": 
                    lose(userChoice, computerChoice);
                    break;
            case "RockRock":
            case "PaperPaper":
            case "ScissorScissor":
                    draw(userChoice, computerChoice);
                    break;
        }
}

// Function that is called if a win is determined which increases the users score and changes the text of the html

function win(userChoice, computerChoice) {
    userScore++;
    userScoreSpan.innerHTML = userScore;
    computerScoreSpan.innerHTML = computerScore;
    winner_div.innerHTML = userChoice + " beats " + computerChoice + "!";
}

// Function that is called if a loss is determined which increases the computer score and changes the text of the html

function lose(userChoice, computerChoice) {
    computerScore++;
    computerScoreSpan.innerHTML = computerScore;
    userScoreSpan.innerHTML = userScore;
    winner_div.innerHTML = computerChoice + " beats " + userChoice + "!";
}

// Function that is called if a win is determined which changes the text of the html

function draw(userChoice, computerChoice) {
    computerScoreSpan.innerHTML = computerScore;
    userScoreSpan.innerHTML = userScore;
    winner_div.textContent = "Draw!";
}

// Main function called

main();

// querySelection added to the Restart Button which reloads the page and the game

document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
    })

// Variables for the canvas element we will create

var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context; 

// Variable for the snake at the beginning, the array for his body, food, game status and score!

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];
var foodX;
var foodY;
var gameOver = false;
let score = 0;

// Variables for updating the DOM with what is in local storage

let newScoreSpan = document.getElementById("new_score");
let highScoreSpan = document.getElementById("high_score");
let highest = localStorage.getItem("highScore");


// Function to load the canvas element when the DOM loads

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);

    // Run the update function with an interval

    setInterval(update, 1000/10);
}

// Update the DOM high score from the loca storage

highScoreSpan.innerHTML = highest;

// The update function which runs at an interval which fills in our canvas and details of game

function update() {

    if (gameOver) {
        return;
    }

    // Fill the canvas with a black background and then create a square block to serve as food for the snake

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="white";
    context.fillRect(foodX, foodY, blockSize, blockSize);


    // Functions to check if the snake and the food are on the same square. It will add the food to the snake array to serve as his body.

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood();
        score++;
        newScoreSpan.textContent = score;
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // This will fill in the end of the snakes body with the food he has eaten

    context.fillStyle="	#ffb3ba";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i=0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    // Functions to determine Game Over conditions - if the snake goes out of bounds or collides with himself

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over! :(")
        if (score > highest) {
            localStorage.setItem("highScore", score);
            highScoreSpan.innerHTML = highest;
        }
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver = true;
        alert("Game Over! :(")
        }
    }
}


// Functions for changing directions - listens for an arrow pressed down and will move up or down the X and Y axis accordingly

function changeDirection(e) {
    if (e.code == "ArrowUp"  && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Function to drop the food at a random place on the board

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Function to listen out for the button to be pressed, the DOM reloads to start a new game

document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
    })

const squaresConnectFour = document.querySelectorAll('.grid div')
const displayCurrentPlayer = document.querySelector('#current-player')
let currentPlayer = 1

let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneSpan = document.getElementById("playeronespan");
let playerTwoSpan = document.getElementById("playertwospan");
let playerOneTop = localStorage.getItem("playeronehighscore");
let playerTwoTop = localStorage.getItem("playertwohighscore");

// Update the dom with the high scores saved to localStorage

playerOneSpan.innerHTML = playerOneTop;
playerTwoSpan.innerHTML = playerTwoTop;


// Important const variables that show winning combinations

const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
]

// Function to check if that winning arrays are identical to the closen arrays for both player one and player two.

function checkBoard() {
        for (let y = 0; y < winningArrays.length; y++) {
        const square1 = squaresConnectFour[winningArrays[y][0]]
        const square2 = squaresConnectFour[winningArrays[y][1]]
        const square3 = squaresConnectFour[winningArrays[y][2]]
        const square4 = squaresConnectFour[winningArrays[y][3]]

        if (
        square1.classList.contains('player-one') &&
        square2.classList.contains('player-one') &&
        square3.classList.contains('player-one') &&
        square4.classList.contains('player-one')
        )
        {
        displayCurrentPlayer.innerHTML = 'Player One Wins!'
        playerOneScore++
        localStorage.setItem("playeronehighscore", playerOneScore)
        playerOneSpan.innerHTML = playerOneScore;
        }
        if (
        square1.classList.contains('player-two') &&
        square2.classList.contains('player-two') &&
        square3.classList.contains('player-two') &&
        square4.classList.contains('player-two')
        )
        {
        displayCurrentPlayer.innerHTML = 'Player Two Wins!'
        playerTwoScore++
        localStorage.setItem("playertwohighscore", playerTwoScore);
        playerTwoSpan.innerHTML = playerTwoScore;
        }
    }
}

// Function that will loop through the 42 and listen for click - then add an image to the div if it meets the right criteria. 
// The function will swtich from player one to player two.

for (let i = 0; i < squaresConnectFour.length; i++) {
        squaresConnectFour[i].onclick = () => {
            if (squaresConnectFour[i + 7].classList.contains('taken') &&!squaresConnectFour[i].classList.contains('taken')) {
                if (currentPlayer == 1) {
                    squaresConnectFour[i].classList.add('taken')
                    squaresConnectFour[i].classList.add('player-one')
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = "Player " + currentPlayer + " turn!"
                } else if (currentPlayer == 2){
                    squaresConnectFour[i].classList.add('taken')
                    squaresConnectFour[i].classList.add('player-two')
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = "Player " + currentPlayer + " turn!"
                } 
        } else alert('cant go here')

    // Calls the checkBoard function to check for a winning array after each click!

    checkBoard()
    }
} 

// Function that listens out for the button to be clicked where it will reload the page

document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
})
