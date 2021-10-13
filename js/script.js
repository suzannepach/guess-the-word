const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "Magnolia";
const guessedLetters = [];


// Use symbols as palceholders for the letters of the word that's being guessed
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

guessButton.addEventListener ("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // This grabs what was entered in the input
    const guess = letterInput.value;
    // Checks input is only a single letter
    const goodGuess = inputCheck(guess);

    // We've got a letter, let's guess.
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

// This function's purpose is to validate the player’s input.
const inputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    // Is input empty?
    if (input.length === 0) {
        message.innerText = "Please type a letter.";
    }
    // Is input more than 1?
    else if (input.length > 1) {
        message.innerText = "Please type only one letter.";
    }
    // Is input not a letter?
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only type a letter (A-Z or a-z).";
    }
    else {
        // Result: only one single letter.
        return input;
    }
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've guessed that letter already, please try another letter.";
     }
    else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        }
    };