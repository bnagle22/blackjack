/*--------------------- Constants -----------------*/

/*--------------------- Variables -----------------*/

let deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

let pHand = []
let dHand = []
let pHandValue = 0
let dHandValue = 0

/*--------------------- Cached Element References -*/

let pHandEl = document.getElementById('p-hand')
let dHandEl = document.getElementById('d-hand')
let mainMsg = document.getElementById('main-msg')

/*--------------------- Event Listeners -----------*/

document.getElementById('deal').addEventListener('click', init)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stand').addEventListener('click', stand)

/*--------------------- Functions -----------------*/


function init() {
  mainMsg.innerText = "Welcome to Blackjack"
  pHand = []
  dHand = []
  pHandValue = 0
  dHandValue = 0
  deal(pHand)
  pHandValue += getHandValue(pHand)
  deal(dHand)
  dHandValue += getHandValue(dHand)
  deal(pHand)
  pHandValue += getHandValue(pHand)
  deal(dHand)
  dHandValue += getHandValue(dHand)
  console.log(pHand)
  console.log(dHand)
  console.log(pHandValue) 
  console.log(dHandValue)
}

// deal function chooses a random card
// from the deck, removes it from the
// deck, and adds it to a player's hand
function deal(hand) {
  let randIdx = Math.floor(Math.random() * deck.length)
  let cardPicked = deck.splice(randIdx, 1)
  hand.push(cardPicked)
  if(hand === 'pHand') {
    pRender(cardPicked)
  } else if(hand === 'dHand') {
    dRender(cardPicked)
  }
}

// hit function adds a card to the player's hand
function hit() {
  deal(pHand)
  pHandValue += getHandValue(pHand)
  console.log(pHandValue) 
  if(pHandValue > 21) {
    renderLose()
  }
}

// stand function checks the dealer's hand,
// then hits if dealer has 16 or less.
// If the dealer has 17 or more, the round
// ends and the two hands are compared.
function stand() {
  while(dHandValue <= 16) {
    deal(dHand)
    dHandValue += getHandValue(dHand)
    console.log(dHandValue)
  } 
  if(dHandValue > 21) {
    renderWin()
  } else {
    compareHands()
  }
}

function compareHands() {
  if(pHandValue > dHandValue) {
    renderWin()
  } else if(dHandValue > pHandValue) {
    renderLose()
  } else {
    renderPush()
  }
}


function pRender(card) {
  pHandEl.classList.remove('outline')
  pHandEl.classList.add(card)
}

function dRender() {

}

function renderWin() {
  mainMsg.innerText = "You win!"
}

function renderLose() {
  mainMsg.innerText = "Dealer wins."
}

function renderPush() {
  mainMsg.innerText = "Push"
}

function getHandValue(hand) {
  let cardId = hand[hand.length -1].toString()
  let lastDigit = cardId.slice(-1)
  if(lastDigit === 'K' ||
  lastDigit === 'Q' ||
  lastDigit === 'J' ||
  lastDigit === '0') {
    return 10
    // for now, Ace is 11. this will be updated
  } else if(lastDigit === 'A') {
    return 11
  } else {
    return parseInt(lastDigit)
  }
}


/* Pseudocode

Begin with renderStart function that displays initial screen
The initial screen says welcome and allows player to click a button to deal the first hand

When player clicks start button, two cards are shown face up in the player's hand, and in the dealer's hand there are two cards, one up and the other down
At this point, three variables are initialized- player hand, dealer hand, and deck.

The total of the player's card values is shown- for an ace both possibilities are shown
Now the player is able to click on either a 'hit' btn or a 'stand' button

If the player clicks 'hit', a random card is taken from the deck and displayed next to current cards
The new total card value is shown

Then the player is able to again choose between 'hit' or 'stand'

The two ways for the round to end are if the total value goes over 21, or the player chooses stand

If the player chooses stay, then the dealer plays out the hand
The dealer automatically hits with 16 or less, otherwise they stay

After either the player goes over 21 or the dealer finishes the hand, a win/lose message is displayed
The player is able to exit or play another hand.

*/