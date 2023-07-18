const squares = document.querySelectorAll('.square');
const click = document.querySelector('.click');
const timeLeft = document.querySelector('#remaining-time');
const score = document.querySelector('#score');

let result = 0;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('click')
    })

    let randomSquare = squares[Math.floor(Math.random * 9)]
    randomSquare.classList.add('click')

}

function moveMole() {
    let timerId = null
    timeId = setInterval(randomSquare, 500)
}

moveMole();
