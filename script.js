/*
Project 1
Author: Hannah Jones
Date: 2-19-24
*/

document.getElementById('submitBtn').addEventListener('click', guessLetter)
document.getElementById('submitBtn').addEventListener('click', showCount)

//creating this list of words for the user to guess from
let wordsArray = ['VADOR', 'BINKS', 'DEATH', 'SPACE', 'LIGHT', 'FORCE', 'CHEWY', 'BLAST']
let word = wordsArray[Math.floor(Math.random() * wordsArray.length)]
let wordArray = word.split('')


let guessArray = ['', '', '', '', '']
let usedWords = []
let heading = document.getElementById('heading')

let countGuesses = 0;

//this will show the user how many guesses they have done
function showCount() {
    document.getElementById('guessCount').innerHTML = 'Guess Count: ' + countGuesses
}

//guess the letter function
function guessLetter() {
    let letters = document.getElementsByTagName('input')

    //looping through each letter of the guessed word
    for (let index = 0; index < letters.length; index++) {
        let letter = letters[index].value.toUpperCase()

        //looping through the first letter of each of the letters
        //of the correct word to see if the letters of the guessed
        //word match
        for (let index2 = 0; index2 < letters.length; index2++) {
            if (letter === wordArray[index2]) {
                guessArray[index2] = letter
            }
    
        }

        //Getting the incorrect guessed letters to display to the user
        if (!(guessArray.includes(letter)) && (!(usedWords.includes(letter)))) {
                usedWords.push(letter)

                //calling this function to show the incorrectly guessed letters
                showIncorrectLetters(letter)
        }

    }

    //looping through to save the array and keep it on the screen
    for (let index3 = 0; index3 < letters.length; index3++) {
        letters[index3].value = guessArray[index3]

        if (guessArray[index3] !== '') {
            letters[index3].setAttribute('readonly', true)
        }
    }

    //collecting the count of how many times the user has guessed
    countGuesses += 1;

    //once the user has guessed the whole word, a congratulations will appear
    //this statement sends them to that function to produce the message
    if (guessArray.toString() == wordArray.toString()) {
        createMessage(countGuesses)
    }

    //refreshing this array to use it for the user's next guess
    guessArray = ['', '', '', '', ''];

}

//creating the message for the guesser when they get 
//it in a certain amount + a congrats message for even getting it.
function createMessage(countGuesses) {
    guessMessage = '';
    
    if (countGuesses == 1) {
        guessMessage = 'Yoda senses much darkness in you.'
    }
    else if (countGuesses == 2) {
        guessMessage = 'Good job, young Padawan!'
    }
    else if (countGuesses <= 4) {
        guessMessage = 'Much room for improvement, young one.'
    }
    else {
        guessMessage = 'You are on the same level as Jar Jar Binks.'
    }

    //creating a place in the HTML for the congrats message and little message to go
    let congrats = document.createElement('h2')
    congrats.textContent = guessMessage

    heading.appendChild(congrats)

    //resets the screen so the user can once again start guessing
    setTimeout(function() {
        window.location.reload();}, 5000);
}

//function used to display the incorrectly guessed letters
function showIncorrectLetters(incorrectLetter) {
    let wrongLettersDiv = document.getElementById('wrongLettersSection')
    let spotForLetter = document.createElement('td')

    spotForLetter.textContent = incorrectLetter
    wrongLettersDiv.appendChild(spotForLetter)

}