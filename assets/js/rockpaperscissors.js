document.addEventListener('DOMContentLoaded', () => {

    let userScore = 0;
    let computerScore = 0;
    
    const scoreBoard_div = document.querySelector(".score-board");
    const winner_div = document.querySelector(".winner > p");
    const result2Display = document.getElementById('result2');
    const possibleChoices = document.querySelectorAll('button');

    const rck_div = document.getElementById("r");
    const ppr_div = document.getElementById("p");
    const scssr_div = document.getElementById("s");

    function getComputerChoice() {
        const choices = ['r', 'p', 's'];
        const randomNumber = Math.floor(Math.random()*3);
        return choices[randomNumber];
    }

    function getComputerChoice() {
        const randomNumber = Math.floor(Math.random()*possibleChoices.length) + 1
    
        if (randomNumber === 1) {
            computerChoice = 'rock'
        }
        if (randomNumber === 2) {
            computerChoice = 'scissors'
        }
        if (randomNumber === 3) {
            computerChoice = 'paper'
        }
        
        computerChoiceDisplay.innerHTML = computerChoice
    }

    function getResult2() {
        if (computerChoice === userChoice) {
            result2 = 'Draw!'
        }
    
        if (computerChoice === 'rock' && userChoice === "paper") {
            result2 = 'You win!'
        }
    
        if (computerChoice === 'scissors' && userChoice === "paper") {
            result2 = 'You lose!'
        }
    
        if (computerChoice === 'paper' && userChoice === "rock"){
            result2 = 'You lose!'
        }
    
        if (computerChoice === 'rock' && userChoice === "scissors") {
            result2 = 'You lose!'
        }
    
        if (computerChoice === 'paper' && userChoice === "scissors"){
            result2 = 'You win!'
        }
    
        if (computerChoice === 'scissors' && userChoice === "rock"){
            result2 = 'You win!'
        }

        winner_div.innerHTML = result2
    }

    function main() {
        ppr_div.addEventListener('click', function() {
            game("p");
        })
        
        rck_div.addEventListener('click', function() {
            game("r");
        })
        
        scssr_div.addEventListener('click', function() {
            game("s");
        })
        
        }
    })

    main(); 
