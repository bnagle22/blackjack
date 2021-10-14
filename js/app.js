/*--------------------- Constants -----------------*/

/*--------------------- Variables -----------------*/

/*--------------------- Cached Element References -*/

/*--------------------- Event Listeners -----------*/

/*--------------------- Functions -----------------*/

/* Pseudocode

Begin with renderStart function that displays initial screen
The initial screen says welcome and allows player to click a button to deal the first hand

When player clicks start button, two cards are shown face up in the player's hand, and in the dealer's hand there are two cards, one up and the other down
At this point, three variables are initialized- player hand, dealer hand, and deck.

The total of the player's card values is shown- for an ace both possibilities are shown
Now the player is able to click on either a 'hit' btn or a 'stay' button

If the player clicks 'hit', a random card is taken from the deck and displayed next to current cards
The new total card value is shown

Then the player is able to again choose between 'hit' or 'stay'

The two ways for the round to end are if the total value goes over 21, or the player chooses stay

If the player chooses stay, then the dealer plays out the hand
The dealer automatically hits with 16 or less, otherwise they stay

After either the player goes over 21 or the dealer finishes the hand, a win/lose message is displayed
The player is able to exit or play another hand.

*/