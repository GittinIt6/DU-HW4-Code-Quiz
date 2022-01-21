let startGameBtn = document.querySelector("#start-game");
let answerBtn0 = document.getElementById("card-0");
let answerBtn1 = document.getElementById("card-1");
let answerBtn2 = document.getElementById("card-2");
let answerBtn3 = document.getElementById("card-3");
let resultText = document.getElementById("answer-text");
let resultArea = document.getElementById("bot-section");
let timerValue = document.getElementById("timer");
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

console.log(questionDB.length);
console.log(questionDB[0].question);
console.log(questionDB[0].choices);
console.log(questionDB[0].choices[1]);
console.log(questionDB[0].answer);

function startGame(){
    for (let i = 0; i < 4; i++) {
            document.getElementById("card-" + [i]).style.display="list-item";
    }
    startGameBtn.style.display="none";
    document.getElementById("intro-text").style.display="none";
    document.getElementById("top-section").style.textAlign="left";
    document.getElementById("question").innerHTML=generateQuestion();
    renderAnswers();
    countdown();
}

function countdown() {
    var timeRemaining = 10;
  
    var timeInterval = setInterval(function () {
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

function generateQuestion(){

        randQuestion = questionDB[Math.floor(Math.random() * (questionDB.length))].question;
        identifier = questionDB.findIndex( (element) => element.question === randQuestion);
        console.log("identifier is = " + identifier);
        console.log("questions asked array is = " + questionsAsked);
        if (questionsAsked.includes(identifier) === false && questionsAsked.length !== questionDB.length){
            questionsAsked.push(identifier);
            console.log(identifier + " pushed to questions asked. Questions asked is now = " + questionsAsked + " and QA.length is: " + questionsAsked.length + " and questionDB.length is: " + questionDB.length);
            return randQuestion;
        }
        else if (questionsAsked.length !== questionDB.length){
            generateQuestion();
        }
        else{
            randQuestion = "End of Questions";
        }

    // return randQuestion;
}

function renderAnswers(){
    for (let index = 0; index < 4; index++) {
        document.getElementById("card-" + [index]).innerHTML=questionDB[identifier].choices[index];  
    };
    
}

function nextQuestion(){
    document.getElementById("question").innerHTML=generateQuestion();
    renderAnswers();
    reAddListners();
}


function wait(){
console.log('supposed to be waiting');
    var timeLeft = 5;
    var timeWaiting = setInterval(function () {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          clearInterval(timeWaiting);
          return;
        }
      }, 1000);
}

function userSelectedAnswer0(){
    answerBtn0.removeEventListener("click", userSelectedAnswer0);
    answerBtn1.removeEventListener("click", userSelectedAnswer1);
    answerBtn2.removeEventListener("click", userSelectedAnswer2);
    answerBtn3.removeEventListener("click", userSelectedAnswer3);
  if (answerBtn0.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]){
    this.style.backgroundColor = "green";
    correctAnswer();
  }
  else {
    this.style.backgroundColor = "red";
    incorrectAnswer();
  }

  wait();
  nextQuestion();
  this.style.backgroundColor = "darkslateblue";

};

function userSelectedAnswer1(){
    answerBtn0.removeEventListener("click", userSelectedAnswer0);
    answerBtn1.removeEventListener("click", userSelectedAnswer1);
    answerBtn2.removeEventListener("click", userSelectedAnswer2);
    answerBtn3.removeEventListener("click", userSelectedAnswer3);
    if (answerBtn1.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]){
        this.style.backgroundColor = "green";
        correctAnswer();
        wait();
      }
      else {
        this.style.backgroundColor = "red";
        incorrectAnswer();
        wait();
      }
};
function userSelectedAnswer2(){
    answerBtn0.removeEventListener("click", userSelectedAnswer0);
    answerBtn1.removeEventListener("click", userSelectedAnswer1);
    answerBtn2.removeEventListener("click", userSelectedAnswer2);
    answerBtn3.removeEventListener("click", userSelectedAnswer3);
    if (answerBtn2.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]){
        this.style.backgroundColor = "green";
        correctAnswer();
      }
      else {
        this.style.backgroundColor = "red";
        incorrectAnswer();
      }
};
function userSelectedAnswer3(){
    answerBtn0.removeEventListener("click", userSelectedAnswer0);
    answerBtn1.removeEventListener("click", userSelectedAnswer1);
    answerBtn2.removeEventListener("click", userSelectedAnswer2);
    answerBtn3.removeEventListener("click", userSelectedAnswer3);
    if (answerBtn3.innerHTML == questionDB[identifier].choices[questionDB[identifier].answer]){
        this.style.backgroundColor = "green";
        correctAnswer();
      }
      else {
        this.style.backgroundColor = "red";
        incorrectAnswer();
      }
};

function correctAnswer(){
    resultText.innerHTML="CORRECT! &#128512;";
    resultText.style.textAlign="left";    
    resultText.style.display = "block";
    resultArea.style.borderTop = "solid";
    resultArea.style.borderColor = "grey";
return;
};

function incorrectAnswer(){
    resultText.innerHTML="WRONG! &#128547;";
    resultText.style.textAlign="left";    
    resultText.style.display = "block";
    resultArea.style.borderTop = "solid";
    resultArea.style.borderColor = "grey";
return;
};

function gameOver(){

}

function reAddListners(){
    answerBtn0.addEventListener("click", userSelectedAnswer0);
    answerBtn1.addEventListener("click", userSelectedAnswer1);
    answerBtn2.addEventListener("click", userSelectedAnswer2);
    answerBtn3.addEventListener("click", userSelectedAnswer3);
return;
}; 

startGameBtn.addEventListener("click", startGame);
answerBtn0.addEventListener("click", userSelectedAnswer0);
answerBtn1.addEventListener("click", userSelectedAnswer1);
answerBtn2.addEventListener("click", userSelectedAnswer2);
answerBtn3.addEventListener("click", userSelectedAnswer3);

