document.addEventListener('DOMContentLoaded', () => {


    // Variables for the canvas element we will create
    
    var blockSize = 20;
    var rows = 20;
    var cols = 20;
    var board;
    var context; 

    // Function to load the canvas element when the DOM loads
    
    window.onload = function() {
        board = document.getElementById("spaveinvader");
        board.height = rows * blockSize;
        board.width = cols * blockSize;
        context = board.getContext("2d");

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="#ffffba";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    setInterval(update, 1000/10);
    }

    function update() {
    
        // Fill the canvas with a black background and then create a square block to serve as food for the snake
    
        context.fillStyle="black";
        context.fillRect(0, 0, board.width, board.height);
    
        context.fillStyle="#ffffba";
        context.fillRect(foodX, foodY, blockSize, blockSize);
    
});