let word = "";
const maxWrong = 6;
let wrongGuess = 0;
let guessed = [" "];
let wordStatus = null;
const keyboardTheme = [
  "#bada55",
  "#7fe5f0",
  "#ff0000",
  "#ff80ed",
  "#696969",
  "white"
];
let keyboardThemeIndex = 0;
let buttonArray = document.querySelectorAll(".keyButton");
const wonSound = () => new Audio("./assets/sounds/won.wav");
const lostSound = () => new Audio("./assets/sounds/lost.wav");
let keyNumber = 65;
let toggleKeyboard = 0;

// ask random word
function askWord() {
  word = prompt("What will be your random word?").toUpperCase();
  return word;
}

// input valid ? word : alert && ask random word again
function countFalse() {
  let falseCount = 0;
  const wordArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");
  for (let letter of word) {
    wordArray.includes(letter) ? falseCount : falseCount++;
  }
  if (falseCount > 0) {
    alert(
      "You can use space but will not be included in Guessed word. \n The word must only contain alphabet letters A to Z"
    );
    askWord();
  } else {
    return word;
  }
}

// generate word-bar
function guessedWord() {
  wordStatus = word
    .split("")
    .map(letter => (guessed.includes(letter) ? letter : " _ "))
    .join("");
  return (document.querySelector("#wordSpotlight").innerHTML = wordStatus);
}

// make keyboard at dom
function makeKeyboard() {
  let buttonsHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map(
      letter =>
      `
        <button
            class="keyButton keydownToggle"
            id="${letter}"
            onClick="checkLetter('${letter}')"
        >
            <strong>${letter}</strong>
        </button>
        `
    )
    .join(" ");
  return (document.querySelector("#keyboard").innerHTML = buttonsHTML);
}

// add keyNumber as classList
function addPressKey() {
  let buttonArray = document.querySelectorAll('.keyButton');
  for (let button of buttonArray) {
    button.classList.add(keyNumber);
    keyNumber++;
  }
}

// wrong guess counter
function wrongGuessCount() {
  document.querySelector("#wrongGuess").innerHTML = wrongGuess;
}

// check letter
function checkLetter(chosenLetter) {
  guessed.includes(chosenLetter) ? null : guessed.push(chosenLetter);
  document.querySelector(`#${chosenLetter}`).setAttribute("disabled", true);

  if (word.includes(chosenLetter) === true) {
    guessedWord();
    setTimeout(wonOrLost, 0);
  } else if (word.includes(chosenLetter) === false) {
    wrongGuess++;
    wrongGuessCount();
    updateHangmanPicture();
    setTimeout(wonOrLost, 100);
  }
}

// Update Hangman Image
function updateHangmanPicture() {
  document.querySelector("#hangmanPic").src =
    "./assets/images/" + wrongGuess + ".jpg";
}

// Pick Random Word from ANIMAL_NAME
function pickRandomWord() {
  word = ANIMAL_NAME[Math.floor(Math.random() * ANIMAL_NAME.length)];
}

// function of bacspace, tab, space button
document.body.addEventListener("keydown", event => {
  let keyboard = document.querySelectorAll(".keyButton");
  let index = 0;
  if (event.keyCode === 32) {
    for (let index = 0; index < keyboard.length; index++) {
      keyboard[index].style.backgroundColor =
        "" + keyboardTheme[keyboardThemeIndex];
    }
    keyboardThemeIndex === keyboardTheme.length ?
      (keyboardThemeIndex = 0) :
      keyboardThemeIndex++;
  } else if (event.keyCode === 9) {
    pressKeyboard()
  } else if (event.keyCode === 8) {
    reset();
  }
});

// allow click button with pressing keyboard
function pressKeyboard() {
  document.addEventListener('keydown', (event) => {
    let keyButtons = document.querySelectorAll('.keyButton.keydownToggle')
    for (let key of keyButtons) {
      if (Object.values(key.classList).includes(`${event.keyCode}`)) {
        checkLetter(`${key.innerText}`);
      }
    }
  });
}

// reset when reset button pressed
document.querySelector(".function.reset").addEventListener("click", event => {
  reset();
});

// change key theme when space button clicked
document.querySelector(".function.space").onclick = function () {
  let keyboard = document.querySelectorAll(".keyButton");
  let index = 0;
  for (let index = 0; index < keyboard.length; index++) {
    keyboard[index].style.backgroundColor = keyboardTheme[keyboardThemeIndex];
  }
  keyboardThemeIndex === keyboardTheme.length ?
    (keyboardThemeIndex = 0) :
    keyboardThemeIndex++;
};

// check victory or defeat
function wonOrLost() {
  if (wordStatus === word) {
    wonSound().play();
    setTimeout(function () {
      alert("Congratulations! You Win!");
    }, 50);
    setTimeout(softReset, 100);
  } else if (wrongGuess === maxWrong) {
    lostSound().play();
    setTimeout(function () {
      alert("Better Luck Next time! Word was " + word);
    }, 50);
    setTimeout(softReset, 100);
  }
}

// Soft Reset
function softReset() {
  wrongGuess = 0;
  guessed = [" "];
  document.querySelector("#hangmanPic").src = "./assets/images/0.jpg";
  document.querySelector(".givenWord").innerText = "Guess Animal Name";

  pickRandomWord();
  makeKeyboard();
  addPressKey();
  guessedWord();
  wrongGuessCount();
}

// Reset Game
function reset() {
  wrongGuess = 0;
  guessed = [" "];
  document.querySelector("#hangmanPic").src = "./assets/images/0.jpg";
  document.querySelector(".givenWord").innerText = "";

  askWord();
  countFalse();
  makeKeyboard();
  addPressKey();
  guessedWord();
  wrongGuessCount();
}


askWord();
countFalse();
makeKeyboard();
addPressKey();
guessedWord();