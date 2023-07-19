const squares = document.querySelectorAll('.square');
const click = document.querySelector('.click');
const timeLeft = document.querySelector('#remaining-time');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('click')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('click')
    
    hitPosition = randomSquare.id

}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

function moveMole() {
    let timerId = null
    timerId = setInterval(randomSquare, 750)
}

moveMole();

function countDown () {
    currentTime--
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
       clearInterval(countDownTimerId)
       alert('Game over! Your score is' + result)
    }
}

let countDownTimerId = setInterval(countDown, 1000)

var restart = document.getElementById('restart');

document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
  });