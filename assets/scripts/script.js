let startGameBtn = document.querySelector("#start-game");
let answerBtn0 = document.getElementById("card-0");
let answerBtn1 = document.getElementById("card-1");
let answerBtn2 = document.getElementById("card-2");
let answerBtn3 = document.getElementById("card-3");
let resultText = document.getElementById("answer-text");
let resultArea = document.getElementById("bot-section");
let timerValue = document.getElementById("timer");
let userInitials = document.getElementById("initials");
let thisScore = 0;
let gameIsOver = false;
var timeInterval = 0;
var timeRemaining = 30;
let randQuestion = "No question generated.";
let questionsAsked = [];
let identifier = 0;
let questionDB = [
  {
    question: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "A Brand of Chicken Soup", "Hot Toddy Must Linger", "HyperToad Markup Language"],
    answer: 0
  },
  {
    question: "______ is the study of the properties of codes and their respective fitness for specific applications.",
    choices: ["Peanut Butter Sandwich", "Data Compression", "Coding theory", "Line Coding"],
    answer: 2
  },
  {
    question: "What does CSS stand for?",
    choices: ["Comedy Skit Solutions", "Cascading Style Sheets", "Comets Searching Seas", "Cascading Tile Sheets"],
    answer: 1
  },
  {
    question: "JavaScript ______ are actions that can be performed on objects",
    choices: ["Aliens", "Best Coding Practices", "Coffee Beans", "methods"],
    answer: 3
  },
  {
    question: "What is the CSS border color property?",
    choices: ["border-color", "BC-Prop", "Snow-Boarder-Color", "borderCoooler"],
    answer: 0
  },
  {
    question: "How do I color my margins in CSS?",
    choices: ["use margin-color CSS", "Call 9-1-1", "HyperText Markup Language", "you can't color a margin"],
    answer: 3
  },
  {
    question: "Which college has the best coding boot camp?",
    choices: ["University of Aurora", "University of Denver", "Durango Community College", "Bob's College of Art"],
    answer: 1
  },
  {
    question: "JavaScript was invented by _____ ____ in 1995",
    choices: ["George Washington", "Bob Ross", "Brendan Eich", "Dan the Instructor"],
    answer: 2
  },
  {
    question: "Is the 'alt' attribute of the img tag mandatory?",
    choices: ["YES", "NO", "Sometimes", "Only on Tuesday"],
    answer: 0
  },
  {
    question: "jQuery is a JavaScript _______ designed to simplify the client-side scripting of HTML.",
    choices: ["HyperText Markup Language", "library", "Inter-combobulate function", "Video game"],
    answer: 1
  }

];


function startGame() { //start game items to visible and set initials at end
  if (userInitials.value !== "") {
    localStorage.setItem(userInitials.value, thisScore);
  }
  document.getElementById("initialsFrm").style.display = "none";
  userInitials.value = "";
  gameIsOver = false;
  thisScore = 0;
  for (let i = 0; i < 4; i++) {
    document.getElementById("card-" + [i]).style.display = "list-item";
  }
  startGameBtn.style.display = "none";
  document.getElementById("intro-text").style.display = "none";
  document.getElementById("top-section").style.textAlign = "left";
  document.getElementById("question").innerHTML = generateQuestion();
  renderAnswers();
  answerBtn0.addEventListener("click", userSelectedAnswer0);
  answerBtn1.addEventListener("click", userSelectedAnswer1);
  answerBtn2.addEventListener("click", userSelectedAnswer2);
  answerBtn3.addEventListener("click", userSelectedAnswer3);
  countdown();
}

function countdown() { //countdown timer
  timeRemaining = 30;

  timeInterval = setInterval(function () {
    if (timeRemaining > 0) {
      timerValue.innerHTML = timeRemaining;
      timeRemaining--;
    } else {
      timerValue.innerHTML = '0';
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

function generateQuestion() { //generates a random question from array of objects
  randQuestion = questionDB[Math.floor(Math.random() * (questionDB.length))].question;
  identifier = questionDB.findIndex((element) => element.question === randQuestion);
  if (questionsAsked.includes(identifier) === false && questionsAsked.length !== questionDB.length) {
    questionsAsked.push(identifier);
    if (questionsAsked.length == questionDB.length) {
      gameIsOver = true;
    }
    console.log(identifier + " pushed to questions asked. Questions asked is now = " + questionsAsked + " and QA.length is: " + questionsAsked.length + " and questionDB.length is: " + questionDB.length);
    return randQuestion;
  }
  else if (questionsAsked.length !== questionDB.length) {
    generateQuestion();
  }
  else {
    gameOver();
    return;
  }

  return randQuestion;
}

function renderAnswers() { //set text for answer buttons
  for (let index = 0; index < 4; index++) {
    document.getElementById("card-" + [index]).innerHTML = questionDB[identifier].choices[index];
    document.getElementById("card-" + [index]).style.backgroundColor = "darkslateblue";
  };

}

function nextQuestion() { //render the next question by calling functions
  if (gameIsOver == false) {
    document.getElementById("question").innerHTML = generateQuestion();
    renderAnswers();
    reAddListners();
    resultText.innerHTML = "";
    resultArea.style.borderTop = "none";
  }
  else {
    gameOver();
  }
}

function userSelectedAnswer0() { //button for selected answer 1
  answerBtn0.removeEventListener("click", userSelectedAnswer0);
  answerBtn1.removeEventListener("click", userSelectedAnswer1);
  answerBtn2.removeEventListener("click", userSelectedAnswer2);
  answerBtn3.removeEventListener("click", userSelectedAnswer3);
  if (gameIsOver !== true) {
    if (answerBtn0.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]) {
      this.style.backgroundColor = "green";
      correctAnswer();
      setTimeout(nextQuestion, 1.0 * 1000);
    }
    else {
      this.style.backgroundColor = "red";
      incorrectAnswer();
      setTimeout(nextQuestion, 1.0 * 1000);
    }
  }
  else {
    gameOver();
  }
};

function userSelectedAnswer1() {//button for selected answer 2
  answerBtn0.removeEventListener("click", userSelectedAnswer0);
  answerBtn1.removeEventListener("click", userSelectedAnswer1);
  answerBtn2.removeEventListener("click", userSelectedAnswer2);
  answerBtn3.removeEventListener("click", userSelectedAnswer3);
  if (answerBtn1.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]) {
    this.style.backgroundColor = "green";
    correctAnswer();
    setTimeout(nextQuestion, 1.0 * 1000);
  }
  else {
    this.style.backgroundColor = "red";
    incorrectAnswer();
    setTimeout(nextQuestion, 1.0 * 1000);
  }
};
function userSelectedAnswer2() { //button for selected answer 3
  answerBtn0.removeEventListener("click", userSelectedAnswer0);
  answerBtn1.removeEventListener("click", userSelectedAnswer1);
  answerBtn2.removeEventListener("click", userSelectedAnswer2);
  answerBtn3.removeEventListener("click", userSelectedAnswer3);
  if (answerBtn2.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]) {
    this.style.backgroundColor = "green";
    correctAnswer();
    setTimeout(nextQuestion, 1.0 * 1000);
  }
  else {
    this.style.backgroundColor = "red";
    incorrectAnswer();
    setTimeout(nextQuestion, 1.0 * 1000);
  }
};
function userSelectedAnswer3() { //button for selected answer 4
  answerBtn0.removeEventListener("click", userSelectedAnswer0);
  answerBtn1.removeEventListener("click", userSelectedAnswer1);
  answerBtn2.removeEventListener("click", userSelectedAnswer2);
  answerBtn3.removeEventListener("click", userSelectedAnswer3);
  if (answerBtn3.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]) {
    this.style.backgroundColor = "green";
    correctAnswer();
    setTimeout(nextQuestion, 1.0 * 1000);
  }
  else {
    this.style.backgroundColor = "red";
    incorrectAnswer();
    setTimeout(nextQuestion, 1.0 * 1000);
  }
};

function correctAnswer() {
  resultText.innerHTML = "CORRECT! &#128512;";
  resultText.style.textAlign = "left";
  resultText.style.display = "block";
  resultArea.style.borderTop = "solid";
  resultArea.style.borderColor = "grey";
  thisScore += 1;
  return;
};

function incorrectAnswer() {
  resultText.innerHTML = "WRONG! &#128547;";
  resultText.style.textAlign = "left";
  resultText.style.display = "block";
  resultArea.style.borderTop = "solid";
  resultArea.style.borderColor = "grey";
  if (timeRemaining > 5) {
    timeRemaining = timeRemaining - 5;
  }
  else {
    gameOver();
  }

  return;
};

function gameOver() {
  gameIsOver = true;
  for (let i = 0; i < 4; i++) {
    document.getElementById("card-" + [i]).style.display = "none";
  }
  startGameBtn.style.display = "inline";
  resultText.innerHTML = "";
  resultArea.style.borderTop = "none";
  document.getElementById("question").innerHTML = "Game Over.<br>This Game Score: " + thisScore;
  timeRemaining = 0;
  timerValue.innerHTML = '0';
  clearInterval(timeInterval);
  document.getElementById("start-game").textContent = "REPLAY";
  questionsAsked = [];
  document.getElementById("initialsFrm").style.display = "inline";
}

function reAddListners() {
  answerBtn0.addEventListener("click", userSelectedAnswer0);
  answerBtn1.addEventListener("click", userSelectedAnswer1);
  answerBtn2.addEventListener("click", userSelectedAnswer2);
  answerBtn3.addEventListener("click", userSelectedAnswer3);
  return;
};

startGameBtn.addEventListener("click", startGame);
