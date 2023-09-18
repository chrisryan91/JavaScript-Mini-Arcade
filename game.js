const cardValues = [
    { id: '0', value: "assets/images/deck_of_cards/2_of_hearts.png" },
    { id: '1', value: "assets/images/deck_of_cards/3_of_hearts.png" },
    { id: '2', value: "assets/images/deck_of_cards/4_of_hearts.png" },
    { id: '3', value: "assets/images/deck_of_cards/5_of_hearts.png" },
    { id: '4', value: "assets/images/deck_of_cards/6_of_hearts.png" },
    { id: '5', value: "assets/images/deck_of_cards/7_of_hearts.png" },
    { id: '6', value: "assets/images/deck_of_cards/8_of_hearts.png" },
    { id: '7', value: "assets/images/deck_of_cards/9_of_hearts.png" },
];


const duplicatedCardValues = [...cardValues, ...cardValues];


let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let isFlipping = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    const gameContainer = document.getElementById('game-container');
    shuffle(duplicatedCardValues);

    for (const cardValueObj of duplicatedCardValues) {
        const card = document.createElement('game-container');
        card.className = 'card';
        card.dataset.value = cardValueObj.id;
        card.style.backgroundImage = `url(${cardValueObj.value})`;
        gameContainer.appendChild(card);
        cards.push(card);
        card.addEventListener('click', flipCard);
    }
}

createGameBoard();