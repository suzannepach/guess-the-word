const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Use symbols as palceholders for the letters of the word that's being guessed
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

getWord(word);

guessLetterButton.addEventListener ("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // This grabs what was entered in the input
    const guess = letterInput.value;
    // Checks input is only a single letter
    const goodGuess = validateInput(guess);

    // We've got a letter, let's guess.
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

// This function's purpose is to validate the player’s input.
const validateInput = function (input) {
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
        showGuessedLetters();
        UpdateGuessesRemaining(letter);
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●")
        }
        //console.log(revealWord);
        wordInProgress.innerText = revealWord.join("");
    }
    checkIfWin();
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
};  

const UpdateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        remainingGuessesElement.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    } 
};
