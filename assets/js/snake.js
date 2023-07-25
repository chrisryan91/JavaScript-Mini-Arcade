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
};

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

    context.fillStyle="#ffffba";
    context.fillRect(foodX, foodY, blockSize, blockSize);


    // Functions to check if the snake and the food are on the same square. It will add the food to the snake array to serve as his body.

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
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

    context.fillStyle="#bae1ff";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i=0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Functions to determine Game Over conditions - if the snake goes out of bounds or collides with himself

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over! :(");
        if (score > highest) {
            localStorage.setItem("highScore", score);
            highScoreSpan.innerHTML = highest;
        }
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver = true;
        alert("Game Over! :(");
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
    });