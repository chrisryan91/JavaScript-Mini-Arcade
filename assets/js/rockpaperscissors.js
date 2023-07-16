document.addEventListener('DOMContentLoaded', () => {

    const computerChoiceDisplay = document.getElementById('computer-chooses')
    const userChoiceDisplay = document.getElementById('you-choose')
    const result2Display = document.getElementById('result2')
    const possibleChoices = document.querySelectorAll('button')
    let userChoice
    let result2

    possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
        userChoice = e.target.id
        userChoiceDisplay.innerHTML = userChoice
        generateComputerChoice()
        getResult2()
    }))

    function generateComputerChoice() {
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

        result2Display.innerHTML = result2

    }

    })
