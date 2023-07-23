document.addEventListener('DOMContentLoaded', () => {

const userScoreSpan = document.getElementById("user-result");
const computerScoreSpan = document.getElementById("computer-result");
const rck_div = document.getElementById("Rock");
const ppr_div = document.getElementById("Paper");
const scssr_div = document.getElementById("Scissor");
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
    });

    rck_div.addEventListener('click', function() {
        game("Rock");
    });

    scssr_div.addEventListener('click', function() {
        game("Scissor");
    });

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
    });

});
    