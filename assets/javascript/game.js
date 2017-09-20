// Flow PSEUDO-CODE 
// ===================================
// Player presses any key to start.  (ANY KEY???)
// Initialize variables: wins, current word, current word state (starts as blanks 
// 						 same length of current word), # of guesses remaining, 
//						 array of letters player has guessed
// Computer assigns a random word from wordBank
// Initialize current word state from currentWord.length
// Player guesses a letter
// Assign player guess to var
// Check if (player guess is in current word) && (play guess is not in letters already guessed)
// 		if true
//			update current word state 
// 		if false
//			decrement # of guesses remaining 
// Add guess to letters already guessed.
// When current word matches current word state, increment wins, and start over with new word.
// When # of guesses remaining reaches 0, GAME OVER, and start over with new word.
// 
// ===================================

// variables
/////////////////////////////////////////////////////////

currentWordStateElem = document.getElementById('currentWordState');
winCountElem = document.getElementById('winCount');
remainingGuessesElem = document.getElementById('remainingGuesses');
lettersGuessedElem = document.getElementById('lettersGuessed');


var Hangman = {
	wordBank: ['hiking'],
	wins: 0,
	currentWord: "",
	currentWordState: "",
	remainingGuesses: 10,
	lettersGuessed: [],
	

	initializeRound: function() {
		this.currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
		this.currentWordState = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			this.currentWordState += " _"
		};	
		remainingGuesses = 10;
		lettersGuessed = [];

		currentWordStateElem.textContent = this.currentWordState;
		winCountElem.textContent = this.wins;
		remainingGuessesElem.textContent = this.remainingGuesses;
		lettersGuessedElem.textContent = this.lettersGuessed;
	},

	updateGameState: function(userGuess) {
		var newGameState = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			if (userGuess === this.currentWord[i]) {
				newGameState += userGuess;
			} else if (this.currentWordState[i] === this.currentWord[i]) {
				newGameState += this.currentWordState[i];
			} else {
				newGameState += "_";
			}
		}
		this.currentWordState = newGameState;
		console.log(this.currentWordState);
		// Handle translation of currentWordState to display 
		var display = "";
		for (var i = 0; i < this.currentWordState.length; i++) {
			display += this.currentWordState[i];
			display += " ";
		}
		// Update currentWordStateElem with display
		currentWordStateElem.textContent = display;
	}

}; 



// functions
/////////////////////////////////////////////////////////

// function guess(event) {
// 	var keyPressed = event.key
// 	keysPressedArray.push(keyPressed)
// 	numberKeysPressedElem.textContent = keysPressedArray.length
// }

// main logic, startup code
//////////////////////////////////////////////////////////


document.onkeyup = function(event) {
	//start round on press space bar 
	if (event.key == "s") {
		console.log("STARTO");
		// start the round, see above for fxn def
		Hangman.initializeRound();
		

		document.onkeyup = function(event) {
			var userGuess = event.key;
			// If user hasn't guessed this letter 
			if (Hangman.lettersGuessed.indexOf(userGuess) < 0) {
				// and if user's guess is in currentWord
				if (Hangman.currentWord.indexOf(userGuess) > -1) {
					console.log("got one!");
					// update currentWordState with userGuess
					Hangman.updateGameState(userGuess);
					// If game state matches the word, WIN!!
					if (Hangman.currentWordState === Hangman.currentWord) {
						alert("Nice you guessed the word!")
					}

				} else { // if user hasnt guessed this letter and it ISNT in currentWord
					// Decrement # of guesses
					Hangman.remainingGuesses -= 1;
					remainingGuessesElem.textContent = Hangman.remainingGuesses;
					// If remainingGuesses hits zero, Game Over!!
					if (Hangman.remainingGuesses === 0) {
						alert("GAME OVER T_T");
					}
				}
				// if letter hasn't been guessed, add userGuess to lettersGuessed array
				Hangman.lettersGuessed.push(userGuess);
				lettersGuessedElem.textContent = Hangman.lettersGuessed;
			} else { // if user has already guessed this letter
				// say "You've already guessed this letter!""
				alert("You've already guessed this letter!")
			}

		}	

	}
	// end of one letter guess 
}
// end of one round, word resets

