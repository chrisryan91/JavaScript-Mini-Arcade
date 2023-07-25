document.addEventListener('DOMContentLoaded', () => {

const squares = document.querySelectorAll('.square');
const click = document.querySelector('.click');
const timeLeft = document.querySelector('#remaining-time');
const score = document.querySelector('#score');
let result = 0;
let clickedSquare;
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
    
    clickedSquare = randomSquare.id

    if (currentTime === 0 ) {
        clearInterval(randomSquare);
        return;}
}

// Function that adds an event listener on each of the square divs which checks if the clicked div is equal to the randomly chosen div with the Click.png image

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == clickedSquare) {
            result++
            score.textContent = result
            clickedSquare = null
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

})