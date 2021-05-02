'use strict';


// element selectors
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const current0ScoreElement = document.querySelector("#current--0");
const current1ScoreElement = document.querySelector("#current--1");
const diceElement = document.querySelector(".dice");
const newGameButton = document.querySelector(".btn--new");
const holdButton = document.querySelector(".btn--hold");
const rollDiceButton = document.querySelector(".btn--roll");
const diceImage = document.querySelector(".dice");

// game state
let playing = true;
let currentScore;
let activePlayer;
let scores;

// functions

const init = function () {
  playing = true;
  diceElement.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0ScoreElement.textContent = 0;
  current1ScoreElement.textContent = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
}

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

init();

// event listeners
rollDiceButton.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceElement.classList.remove('hidden');
    diceImage.setAttribute('src', `dice-${diceNumber}.png`);
    // 3. check if roll is 1. 
    if (diceNumber !== 1) {
      // add to current player score
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
})

holdButton.addEventListener('click', function () {
  if (playing) {
    // add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // check if player score > 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceElement.classList.add('hidden');

    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener('click', init);