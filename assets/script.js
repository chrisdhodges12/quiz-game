//DOM elements 
var startButton = document.getElementById ("start-btn");
var containerEl = document.getElementById ("container");
var questionEl = document.getElementById ("question");
var answerButtons = document.getElementById ("answers");
var timeEl = document.getElementById ("timer");
var highScoreButton = document.getElementById ("highScore")
var ShowHighScores = document.getElementById ("showHighScores");


//Variables
var timeRemaining = 5; 
var questionNumber;
var initials = "";
var questionNUmber;
var time;
// var score = 0 ???????
var finalScore;

var highScore = JSON.parse(localStorage.getItem("highScores")) || [];


startButton.addEventListener("click", startGame);
// highScoreSection.addEventListener("click", displayHighScores);

function startGame() {
    startButton.classList.add("hide");
    questionEl.classList.remove("hide");
    answerButtons.classList.remove("hide");
    questionNumber = [0];
    ShowHighScores.innerHTML = "";
//while...
    startClock();
    nextQuestion(questions[0]);
}

function nextQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("button");
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        answerButtons.appendChild(button);
        button.addEventListener("click", chooseAnswer);
    });  
}  

function startClock() {
    timeEl.innerHTML = ("Time Remaining: " + timeRemaining);
    if (timeRemaining <= 0) {
        endGame();
    } 
    else {
        timeRemaining -= 1;
        time = setTimeout(startClock, 1000);
    }
}

function chooseAnswer(e) {
    var answerSelection = e.target;
  if (!answerSelection.dataset.correct) {
    timeRemaining = timeRemaining - 10;
    console.log(timer);
  }
  if (questionNumber == questions.length - 1) {
    gameOver();
  } else {
    reset();
    questionNumber++;
    nextQuestion(questions[questionNumber]);
    console.log(score);
  }
}
    
function reset() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
    startButton.classList.remove("hide");
}

function endGame() {
    clearInterval (time);
    timeEl.innerHTML = "";
    startButton.innerHTML = "Play again";
    startButton.classList.remove("hide");
    questionEl.classList.add("hide");
    reset();
    showScore();

}
  
function showScore() {

}

function submitScore() {

}

function displayHighScores() {

}






//>>>>handle high score: copied from robot gladiators ----need to change 
  //>>check local storage for high score
//   var highScore = localStorage.getItem("high score");
//   if(highScore +++ null) {
//       highScore = 0;
//   }
//>>set high score 
// if (playerInfo.money > highScore) {
//     localStorage.setItem("high score", playerInfo.money);
//     localStorage.setItem("name", playerInfo.name);


//<<<<<<<<NEED FUNCTIONs 
//>>>>>>show first question, determine true if correct, subtract time if wrong, move to next question
//>> handle timer
//>>>>>>subtract time from timer if wrong
//>>End game when all questions are done or timer = 0
//>>save score and initials (input form?)
//>>display high scores 
//


var questions = [{

    question: "Which syntax is used when declaring a function?",
    answers: [
        {text: "function = newFunction()", correct: false},
        {text: "declare.function myNewFunction()", correct: false },
        {text: "function newFunction()", correct: true},
        {text: "function.newFunction()", correct: false}
    ]
},
{
    question: "Where should JavaScript be inserted in HTML?",
    answers: [
        {text: "<body>", correct: true},
        {text: "<header>", correct: false },
        {text: "<footer>", correct: false},
        {text: "<div>", correct: false}
    ]
},
{
    question: "An array is declared using which characters?",
    answers: [
        {text: "< >", correct: false},
        {text: "( )", correct: false },
        {text: "/ /", correct: false},
        {text: "[ ]", correct: true }
    ]
}, 
{
    question: "How would you call upon the function 'functionXYZ' ?",
    answers: [
        {text: "call myFunctionXYZ", correct: false},
        {text: "myFunctionXYZ[]", correct: false },
        {text: "myFunctionXYZ()", correct: true},
        {text: "<myFunctionXYZ> ", correct: false}
    ]
},
{
    question: "What does || translate to?",
    answers: [
        {text: "Or", correct: true},
        {text: "And", correct: false },
        {text: "Neither", correct: false},
        {text: "Both", correct: false}
    ]
}
];
