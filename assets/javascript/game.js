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
//===================================================

currentWordStateElem = document.getElementById('currentWordState');
winCountElem = document.getElementById('winCount');
remainingGuessesElem = document.getElementById('remainingGuesses');
lettersGuessedElem = document.getElementById('lettersGuessed');


var Hangman = {
	wordBank: ['hiking', 'lake', 'topography', 'permit', 'thoreau', 'backpack', 'creek', 'summit', 'boots', 'sunscreen', 'chapstick', 'nalgene', 'granola', 'trail', 'switchback'],
	wins: 0,
	currentWord: "",
	currentWordState: "",
	remainingGuesses: 7,
	lettersGuessed: [],
	

	initializeRound: function() {
		this.currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
		this.currentWordState = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			this.currentWordState += " _"
		};	
		this.remainingGuesses = 7;
		this.lettersGuessed = [];

		currentWordStateElem.textContent = this.currentWordState;
			console.log("STARTO");
			console.log(this.currentWordState);
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
	},

	checkWin: function() {
		// If game state matches the currentWord, report WIN!!
		if (this.currentWordState === this.currentWord) {
			this.wins += 1;
			setTimeout(function() {
				currentWordStateElem.textContent = "You guessed the word!";
				setTimeout(function() {
					Hangman.initializeRound();
				}, (1000));
			}, (1000));
		}
	},

	checkLose: function() {
		// If remainingGuesses hits zero, Game Over!!
		if (this.remainingGuesses === 0) {
			alert("GAME OVER T_T ");
			Hangman.initializeRound();
		}
	}

}; 



// functions
//========================================================

// main logic, startup code
//========================================================

document.onkeyup = function(event) {
	//start round on press space bar 
	if (event.key == "s") {
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
					Hangman.lettersGuessed.push(userGuess);
					lettersGuessedElem.textContent = Hangman.lettersGuessed.toString();
					
					Hangman.checkWin();

				} else { // if user hasnt guessed this letter and it ISNT in currentWord
					// Decrement # of guesses, Check for lose
					Hangman.remainingGuesses -= 1;
					remainingGuessesElem.textContent = Hangman.remainingGuesses;
					Hangman.lettersGuessed.push(userGuess);
					lettersGuessedElem.textContent = Hangman.lettersGuessed.toString();
					
					Hangman.checkLose();
					
				}
				// if letter hasn't been guessed, add userGuess to lettersGuessed array
				// Hangman.lettersGuessed.push(userGuess);
				// lettersGuessedElem.textContent = Hangman.lettersGuessed.toString();
				
			} else { // if user has already guessed this letter
				// say "You've already guessed this letter!""
				alert("You've already guessed this letter!")
			}
		}	

	}
	// end of one letter guess 
}
// end of one round, word resets

