var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0; 
var velocityY = 0;

var snakeBody = [];

var foodX;
var foodY;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10);
}

function update() {

    context.fillStyle="#000";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="white";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}