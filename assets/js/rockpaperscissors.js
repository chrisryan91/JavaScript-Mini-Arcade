document.addEventListener('DOMContentLoaded', () => {

let userScore = 0;
let computerScore = 0;

const userScoreSpan = document.getElementById("user-result");
const computerScoreSpan = document.getElementById("computer-result");
    
const scoreBoard_div = document.querySelector(".score-board");
const winner_div = document.querySelector(".winner > p");

const rck_div = document.getElementById("Rock");
const ppr_div = document.getElementById("Paper");
const scssr_div = document.getElementById("Scissor");

function getComputerChoice() {
const choices = ['Rock', 'Paper', 'Scissor'];
const randomNumber = Math.floor(Math.random()*3);
return choices[randomNumber];
}

function win(userChoice, computerChoice) {
userScore++;
userScoreSpan.innerHTML = userScore;
computerScoreSpan.innerHTML = computerScore;
winner_div.innerHTML = userChoice + " beats " + computerChoice + "!";
}

function lose(userChoice, computerChoice) {
computerScore++;
computerScoreSpan.innerHTML = computerScore;
userScoreSpan.innerHTML = userScore;
winner_div.innerHTML = computerChoice + " beats " + userChoice + "!";
}

function draw(userChoice, computerChoice) {
computerScoreSpan.innerHTML = computerScore;
userScoreSpan.innerHTML = userScore;
winner_div.textContent = "Draw!";
}

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

main();

document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
  })

})
