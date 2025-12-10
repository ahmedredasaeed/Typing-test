// Array of Words

const words = [
  "Hello",
  "Programming",
  "Code",
  "JavaScript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Pardigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here

let defaultLevelSecods = lvls[defaultLevelName];

// Get Selectors

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWord = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMsg = document.querySelector(".finish");

// Filling Level Name + seconds + Score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSecods;
timeLeftSpan.innerHTML = defaultLevelSecods;
scoreTotal.innerHTML = words.length;
// Disable Paste Ability
input.onpaste = function () {
  return false;
};

// Start Game

startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genenraeWords();
};

function genenraeWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  // Remove Word from Array
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWord.innerHTML = "";
  // Genrate Upcoming Words
  for (let i = 0; i < words.length; i++) {
    // Create Div
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWord.appendChild(div);
  }
  // Start Play Function Calling
  startPlay();
}

function saveWithDate(result) {
  today = new Date();
  window.localStorage.setItem("Date & Result", [
    `Date = ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
    result,
  ]);
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSecods;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = ""; // Empty Input Field
        // Score Increment
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genenraeWords(); // Generate Word Function Calling
        } else {
          // remove upcoming words
          upcomingWord.remove();
          let span = document.createElement("span");

          span.className = "good";
          let spanTxt = document.createTextNode("Congratualtions You Won");
          theWord.remove();
          span.append(spanTxt);
          finishMsg.appendChild(span);
          saveWithDate("won");
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("GAME OVER");
        span.appendChild(spanTxt);
        finishMsg.appendChild(span);
        theWord.remove();
        saveWithDate("lose");
      }
    }
  }, 1000);
}
