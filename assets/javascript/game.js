// Flow PSEUDO-CODE 
// ===================================
// Initialize variables: wins, current word, current word state (starts as blanks 
// 						 same length of current word), # of guesses remaining, 
//						 array of letters player has guessed
// Player presses any key to start.  (ANY KEY???)
// Computer assigns a random word from wordBank
// Initialize current word state from currentWord.length
// Player guesses a letter
// Assign player guess to var
// Check if (player guess is in current word)
// 		if true
//			update current word state 
// 		if false
//			decrement # of guesses remaining 
// Add guess to letters already guessed.
// When current word matches current word state, increment wins, and start over with new word.
// When # of guesses remaining reaches 0, GAME OVER, and start over with new word.
// 
// ===================================


var wordBank = [];
var wins = 0;

document.onkeyup = function(event) {
	//start round on press space bar 
	if (event.keycode === 32) {
		// start one letter guess 
		document.onkeyup = function(event) { 
			var currentWord = wordBank[Math.floor(Math.random() * myArray.length)];
			var currentWordState = "";
			for (var i = 0; i < currentWord.length; i++) {
				currentWordState += "_"
			};
			var remainingGuesses = 10;
			var lettersGuessed = [];
		}	

	}
	// end of one letter guess 
}
// end of one round, word resets

