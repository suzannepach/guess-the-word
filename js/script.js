const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const guessFormLabel = document.querySelector(".guess-form label");
const guessFormInput = document.querySelector(".guess-form input");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//Start the game
getWord(word);

// Use symbols as palceholders for the letters of the word that's being guessed
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
        startOver();
    }
};  

const UpdateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    }
    else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        remainingGuessesElement.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    } 
};

const startOver = function () {
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    
    // remove guess form
    guessLetterButton.classList.add("hide");
    guessFormLabel.classList.add("hide");
    guessFormInput.classList.add("hide");

    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener ("click", function (e) {
    message.classList.remove("win");
    // Empty message paragraph and the unordered list where the guesses appear
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    // reset remaining guesses and guessed letters array
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    
    //Restart the game
    getWord(word);

    //show remaining guesses paragraph and guessed letters 
    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");

    // add guess form
    guessLetterButton.classList.remove("hide");
    guessFormLabel.classList.remove("hide");
    guessFormInput.classList.remove("hide");

    // hide play again button
    playAgainButton.classList.add("hide");
});