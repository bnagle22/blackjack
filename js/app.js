/*--------------------- Variables -----------------*/

let deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
let pHand = []
let dHand = []
let pHandValue = 0
let dHandValue = 0
let acesP = 0
let acesD = 0
let pScore = 0
let dScore = 0
let pushCount = 0

/*--------------------- Cached Element References -*/

const pCard1 = document.getElementById('p-card1')
const pCard2 = document.getElementById('p-card2')
const dCard1 = document.getElementById('d-card1')
const dCard2 = document.getElementById('d-card2')
const mainMsg = document.getElementById('main-msg')
const displayPValue = document.getElementById('p-card-value')
const displayDValue = document.getElementById('d-card-value')
const playerHand = document.getElementById('cards-p')
const dealerHand = document.getElementById('dealer-hand')
const pWins = document.getElementById('p-wins')
const dWins = document.getElementById('d-wins')
const pushes = document.getElementById('pushes')
const dealBtn = document.getElementById('deal')
const hitBtn = document.getElementById('hit')
const standBtn = document.getElementById('stand')
const lightDark = document.getElementById('light-dark')
const body = document.querySelector("body")

/*--------------------- Event Listeners -----------*/

dealBtn.addEventListener('click', init)
hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', stand)
dealBtn.addEventListener('mouseover', function(evt) {
  evt.target.style.backgroundColor = "rgba(255, 255, 255, 0.82)"
})
hitBtn.addEventListener('mouseover', function(evt) {
  evt.target.style.backgroundColor = "rgb(154, 18, 18)"
})
standBtn.addEventListener('mouseover', function(evt) {
  evt.target.style.backgroundColor = "rgb(30, 30, 109)"
})
dealBtn.addEventListener('mouseout', function(evt) {
  evt.target.style.backgroundColor = ""
  evt.target.style.color = ""
})
hitBtn.addEventListener('mouseout', function(evt) {
  evt.target.style.backgroundColor = ""
})
standBtn.addEventListener('mouseout', function(evt) {
  evt.target.style.backgroundColor = ""
})
lightDark.addEventListener('click', toggleLightDark)

/*--------------------- Functions -----------------*/

// initialize function first checks that a hand is not
// in progress. Then it calls three functions to
// start the next hand
function init() {
  if(mainMsg.innerText !== "Choose Hit or Stand") {
    removeCards()
    reset()
    firstDeal()
  }
}

// this function makes the cards from a previous
// hand disappear from the screen
function removeCards() {
  pCard1.className = ""
  pCard2.className = ""
  dCard1.className = ""
  dCard2.className = ""
}

// reset function first 'shuffles' a new deck together
// when there are less than 20 cards remaining.
// it sets each hand and score to 0, removes additional
// cards, and changes the main message on the screen.
function reset() {
  if(deck.length < 20) {
    deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  }
  setTimeout(() => {mainMsg.innerText = "Choose Hit or Stand"}, 4000)
  pHand = []
  dHand = []
  pHandValue = 0
  dHandValue = 0
  acesP = 0
  acesD = 0
  displayPValue.innerText = '(?)'
  displayDValue.innerText = '(?)'
  while(dealerHand.lastChild.id !== 'd-card2'){
    dealerHand.removeChild(dealerHand.lastChild)
  }
  while(playerHand.lastChild.id !== 'p-card2'){
    playerHand.removeChild(playerHand.lastChild)
  }
}


// this function deals two cards each to the player
// and dealer. It calls another function to see
// if either of the initial hands is a blackjack
function firstDeal() {
  setTimeout(() => {pCard1.className = "card large move"}, 1000)
  setTimeout(() => {dCard1.className = "card large move"}, 1500)
  setTimeout(() => {pCard2.className = "card large new move"}, 2500)
  setTimeout(() => {dCard2.className = "card large new move"}, 3500)
  setTimeout(() => {pCard1.classList.add(pDeal())}, 1000)
  setTimeout(() => {dCard1.classList.add(dDeal())}, 1500)
  setTimeout(() => {pCard2.classList.add(pDeal())}, 2500)
  setTimeout(() => {dCard2.classList.add(dDeal())}, 3500)
  setTimeout(() => {dCard2.classList.add('back')}, 3500)
  setTimeout(() => {checkBlackjack()}, 3500)
}

// deal functions choose a random card
// from the deck, remove it from the
// deck, and adds it to a player's hand
function pDeal() {
  let randIdx = Math.floor(Math.random() * deck.length)
  let cardPicked = deck.splice(randIdx, 1)
  pHand.push(cardPicked)
  pHandValue += getHandValueP()
  setTimeout(() => {displayPValue.innerText = pHandValue}, 2000)
  return cardPicked
}

function dDeal() {
  let randIdx = Math.floor(Math.random() * deck.length)
  let cardPicked = deck.splice(randIdx, 1)
  dHand.push(cardPicked)
  dHandValue += getHandValueD()
  return cardPicked
}

// hit function first checks to make sure that 
// a hand is currently being played. It adds a 
// card to the player's hand, then calls another
// function, checkBustP, to handle aces.
// if the hand value goes over 21, a lose function
// is called
function hit() {
  if(mainMsg.innerText === "Choose Hit or Stand"
      && pHandValue > 0){
    let newDiv = document.createElement('div')
    playerHand.appendChild(newDiv)
    newDiv.className = "card large new move"
    newDiv.classList.add(pDeal())
    checkBustP()    
    if(pHandValue > 21) {
      setTimeout(() => {renderLose()}, 2000)
    }
  }
}

// stand function checks the dealer's hand,
// then hits if dealer has 16 or less.
// If the dealer has 17 or more, the round
// ends and the two hands are compared.
function stand() {
  if(mainMsg.innerText === "Choose Hit or Stand"
      && dHandValue > 0){
  // the dealer continues to hit as long as
  // the hand value is 16 or less
  while(dHandValue <= 16) {
    let newDiv = document.createElement('div')
    dealerHand.appendChild(newDiv)
    newDiv.className = "card large new move"
    newDiv.classList.add(dDeal())
    checkBustD()
  } 
  dCard2.classList.remove('back')
  setTimeout(() => {displayDValue.innerText = dHandValue}, 1500)
  if(dHandValue > 21) {
    setTimeout(() => {renderWin()}, 2000)
  } else {
    compareHands()
  }
}
}

// the getHandValue functions check the card
// most recently added to a hand, and translates
// the name of the card to a point value. If an
// ace is encountered, then a checkAce function
// is called
function getHandValueP() {
  let cardId = pHand[pHand.length -1].toString()
  let lastDigit = cardId.slice(-1)
  if(lastDigit === 'K' ||
  lastDigit === 'Q' ||
  lastDigit === 'J' ||
  lastDigit === '0') {
    return 10
  } else if(lastDigit === 'A') {
    return checkAceP()
  } else {
    return parseInt(lastDigit)
  }
}

function getHandValueD() {
  let cardId = dHand[dHand.length -1].toString()
  let lastDigit = cardId.slice(-1)
  if(lastDigit === 'K' ||
  lastDigit === 'Q' ||
  lastDigit === 'J' ||
  lastDigit === '0') {
    return 10
  } else if(lastDigit === 'A') {
    return checkAceD()
  } else {
    return parseInt(lastDigit)
  }
}

// the checkAce functions first check
// to see if adding 11 to the hand would
// bring the total over 21. If it would,
// the value of the ace is 1. If not, the
// value of the ace is 11 and the ace
// counter variable is set to 1
function checkAceP() {
  if(pHandValue + 11 > 21) {
    return 1
  } else {
    acesP = 1
    return 11
  }
}

function checkAceD() {
  if(dHandValue + 11 > 21) {
    return 1
  } else {
    acesD = 1
    return 11
  } 
}

// this function uses the ace counter variable
// to see if having an ace with a value
// of 11 would cause a bust. If it would, then
// the ace value is effectively set to 1 by 
// subtracting 10 from the hand total
function checkBustP() {
  if(pHandValue > 21) {
    pHandValue -= (10 * acesP) // if the player has an ace, 10 is subtracted from the total. otherwise, nothing is subtracted
    setTimeout(() => {displayPValue.innerText = pHandValue}, 1500)
    acesP = 0   //the ace counter is set to 0 so this can only happen once per hand.
  }
}

function checkBustD() {
  if(dHandValue > 21) {
    dHandValue -= (10 * acesD)
    setTimeout(() => {displayDValue.innerText = dHandValue}, 1500)
    acesD = 0
  }
}

// this function evaluates the winner of
// the hand and calls another function
// to set the winner
function compareHands() {
  if(pHandValue > dHandValue) {
    setTimeout(() => {renderWin()}, 2000)
  } else if(dHandValue > pHandValue) {
    setTimeout(() => {renderLose()}, 2000)
  } else {
    setTimeout(() => {renderPush()}, 2000)
  }
}

// the checkBlackjack function is called when
// the first cards of the hand are dealt, to
// make sure that when a blackjack is dealt
// the hand will end
function checkBlackjack() {
  if(pHandValue === 21 && dHandValue === 21) {
    dCard2.classList.remove('back')
    displayDValue.innerText = dHandValue
    setTimeout(() => {mainMsg.innerText = "Double blackjack! Pushed."}, 1000)
    pushCount ++
    pushes.innerText = `Pushes: ${pushCount}`
  }
  else if(dHandValue === 21) {
    dCard2.classList.remove('back')
    displayDValue.innerText = dHandValue
    setTimeout(() => {mainMsg.innerText = "Blackjack! Dealer wins."}, 1000)
    dScore ++
    dWins.innerText = `Gecko: ${dScore}`
  }
  else if(pHandValue === 21) {
    setTimeout(() => {mainMsg.innerText = "Blackjack! You win!"}, 1000)
    pScore ++
    pWins.innerText = `Player: ${pScore}`
  }
}

// the win, lose, and push functions
// display the winner and add a point
// to the score of the winner
function renderWin() {
  mainMsg.innerText = "You win!"
  pScore ++
  pWins.innerText = `Player: ${pScore}`
}

function renderLose() {
  mainMsg.innerText = "Dealer wins."
  dScore ++
  dWins.innerText = `Gecko: ${dScore}`
}

function renderPush() {
  mainMsg.innerText = "Pushed"
  pushCount ++
  pushes.innerText = `Pushes: ${pushCount}`
}

// toggle function changes the body to dark
// when the dark mode btn is clicked
function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
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
The dealer automatically hits with 16 or less, otherwise they stand

After either the player goes over 21 or the dealer finishes the hand, a win/lose message is displayed
The player is able to exit or play another hand.

*/