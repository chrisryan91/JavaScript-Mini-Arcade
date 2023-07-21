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

    function win(userChoice, computerChoice) {
        userScore++;
        userScoreSpan.innerHTML = userScore;
        computerScoreSpan.innerHTML = computerScore;
        winner_div.innerHTML = convertToWord(userChoice) + " beats " + convertToWord(computerChoice) + "!";
        }
    
    function lose(userChoice, computerChoice) {
        computerScore++;
        computerScoreSpan.innerHTML = computerScore;
        userScoreSpan.innerHTML = userScore;
        winner_div.innerHTML = convertToWord(computerChoice) + " beats " + convertToWord(userChoice) + "!";
    }
    
    function draw(userChoice, computerChoice) {
        computerScoreSpan.innerHTML = computerScore;
        userScoreSpan.innerHTML = userScore;
        winner_div.textContent = "Draw!";
    }

    function game(userChoice) {
        const computerChoice = getComputerChoice();
        switch (userChoice + computerChoice){
            case "rs":
            case "pr":
            case "sp":
                    win(userChoice, computerChoice);
                    break;
            case "rp":
            case "ps":
            case "sr": 
                    lose(userChoice, computerChoice);
                    break;
            case "rr":
            case "pp":
            case "ss":
                    draw(userChoice, computerChoice);
                    break;
        }
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
