/*--------------------- Constants -----------------*/

/*--------------------- Variables -----------------*/

let deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

let pHand = []
let dHand = []
let pHandValue = 0
let dHandValue = 0
let acesP = 0
let acesD = 0

/*--------------------- Cached Element References -*/

let pCard1 = document.getElementById('p-card1')
let pCard2 = document.getElementById('p-card2')
let dCard1 = document.getElementById('d-card1')
let dCard2 = document.getElementById('d-card2')
let mainMsg = document.getElementById('main-msg')
let displayPValue = document.getElementById('p-card-value')
let displayDValue = document.getElementById('d-card-value')
let altPValue = document.getElementById('p-alt-value')
let altDValue = document.getElementById('d-alt-value')
let playerHand = document.getElementById('player-hand')
let dealerHand = document.getElementById('dealer-hand')

/*--------------------- Event Listeners -----------*/

document.getElementById('deal').addEventListener('click', init)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stand').addEventListener('click', stand)

/*--------------------- Functions -----------------*/


function init() {
  if(deck.length < 20) {
    deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  }
  mainMsg.innerText = "Welcome to Blackjack"
  pHand = []
  dHand = []
  pHandValue = 0
  dHandValue = 0
  acesP = 0
  acesD = 0
  while(dealerHand.lastChild.id !== 'd-card2'){
    dealerHand.removeChild(dealerHand.lastChild)
  }
  while(playerHand.lastChild.id !== 'p-card2'){
    playerHand.removeChild(playerHand.lastChild)
  }
  pCard1.className = "card large"
  pCard2.className = "card large"
  dCard1.className = "card large"
  dCard2.className = "card large"
  displayDValue.innerText = '(?)'
  altPValue.innerText = '()'
  altDValue.innerText = '()'
  firstDeal()
}

function firstDeal() {
  pCard1.classList.add(pDeal())
  dCard1.classList.add(dDeal())
  pCard2.classList.add(pDeal())
  dCard2.classList.add(dDeal())
  dCard2.classList.add('back-blue')
  console.log(pHand)
  console.log(dHand)
  console.log('player', pHandValue) 
  console.log('dealer', dHandValue)
}
// deal function chooses a random card
// from the deck, removes it from the
// deck, and adds it to a player's hand
// function deal(hand) {
//   let randIdx = Math.floor(Math.random() * deck.length)
//   let cardPicked = deck.splice(randIdx, 1)
//   hand.push(cardPicked)
  // if(hand === 'pHand') {
  //   pRender(cardPicked)
  // } else if(hand === 'dHand') {
  //   dRender(cardPicked)
  // }
// }

function pDeal() {
  let randIdx = Math.floor(Math.random() * deck.length)
  let cardPicked = deck.splice(randIdx, 1)
  pHand.push(cardPicked)
  pHandValue += getHandValueP()
  displayPValue.innerText = pHandValue
  return cardPicked
}

function dDeal() {
  let randIdx = Math.floor(Math.random() * deck.length)
  let cardPicked = deck.splice(randIdx, 1)
  dHand.push(cardPicked)
  dHandValue += getHandValueD()
  return cardPicked
}

// hit function adds a card to the player's hand
function hit() {
  if(mainMsg.innerText === "Welcome to Blackjack"
      && pHandValue > 0){
    let newDiv = document.createElement('div')
    playerHand.appendChild(newDiv)
    newDiv.className = "card large"
    newDiv.classList.add(pDeal())
    checkBustP()    
    console.log('player', pHandValue) 
    if(pHandValue > 21) {
      renderLose()
    }
}
}
// stand function checks the dealer's hand,
// then hits if dealer has 16 or less.
// If the dealer has 17 or more, the round
// ends and the two hands are compared.
function stand() {
  if(mainMsg.innerText === "Welcome to Blackjack"
      && dHandValue > 0){
  while(dHandValue <= 16) {
    let newDiv = document.createElement('div')
    dealerHand.appendChild(newDiv)
    newDiv.className = "card large"
    newDiv.classList.add(dDeal())
    checkBustD()
    console.log('dealer', dHandValue)
  } 
  dCard2.classList.remove('back-blue')
  displayDValue.innerText = dHandValue
  if(dHandValue > 21) {
    renderWin()
  } else {
    compareHands()
  }
}
}



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

// function checks to see if the player
// has an ace. If they do, then the 
// alt score with ace=1 is displayed

// calculate total score each time the function is run
function checkAceP() {
  if(pHandValue + 11 > 21) {
    return 1
  } else {
    acesP = 1
    return 11
  }
  // altPValue.innerText = `(${pHandValue - 10})`   
}

function checkAceD() {
  if(dHandValue + 11 > 21) {
    return 1
  } else {
    acesD = 1
    return 11
  } 
}

function checkBustP() {
  if(pHandValue > 21) {
    pHandValue -= (10 * acesP)
    displayPValue.innerText = pHandValue
    acesP = 0
  }
}

function checkBustD() {
  if(dHandValue > 21) {
    dHandValue -= (10 * acesD)
    displayDValue.innerText = dHandValue
    acesD = 0
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
  // console.log(pHandEl.classList)
  // pHandEl.classList.remove('outline')
  // pHandEl.classList.add(card)
  // console.log(pHandEl.classList)
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
  mainMsg.innerText = "Pushed"
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