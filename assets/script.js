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



//DOM elements 
var startButton = document.getElementById ("start-btn");
var containerEl = document.getElementById ("container");
var questionEl = document.getElementById ("question");
var answerButtons = document.getElementById ("answers");
var timeEl = document.getElementById ("timer");
var highScoreButton = document.getElementById ("highScore")
var showHighScores = document.getElementById ("showHighScores");


//Variables
var timeRemaining = 75; 
var questionNumber;
var initials = "";
var questionNUmber;
var time;
// var submitScores;
// var score = 0 ???????
var score = 0;

var highScore = JSON.parse(localStorage.getItem("highScores"));


startButton.addEventListener("click", startGame);
showHighScores.addEventListener("click", displayScores);

function startGame() {
    startButton.classList.add("hide");
    questionEl.classList.remove("hide");
    answerButtons.classList.remove("hide");
    questionNumber = [0];
    showHighScores.innerHTML = "";
    // while (answerButtons.firstChild) {
    //     answerButtons.removeChild(answerButtons.firstChild);
    //   }
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
  }
  if (questionNumber == questions.length - 1) {
    endGame();
  } else {
    reset();
    questionNumber++;
    nextQuestion(questions[questionNumber]);
  }
}
    
function reset() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
}

function endGame() {
    clearInterval (time);
    timeEl.innerHTML = "";
    startButton.innerHTML = "Play again";
    startButton.classList.remove("hide");
    timeRemaining = 0; 
    reset();
    showScore();

}
  
function showScore() {
    var score = timeRemaining;
    showHighScores.innerHTML = `Your score is ${timeRemaining}!<div id="init"> Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
    questionEl.classList.add("hide")
    showHighScores.classList.remove("hide");
    answerButtons.classList.add("hide");
    var initials = document.getElementById("initials");
    var saveButton = document.getElementById("save-btn");
}

function submitScore(e) {
    var score = {
    score: timeRemaining,
    name: username.value
    };
    highScore.push(score);
    highScore.sort((a, b) => b.score - a.score);
    
    localStorage.setItem("highScores", JSON.stringify(highScore));
    displayScores();
}


function displayScores() {
    clearInterval(time);
    // timEl.innerHTML = "";
    reset();
    questionEl.innerText = "";
    showHighScores.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul>`
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = highScore.map(score => {
        return `<li class="scoresList">${score.name} - ${score.score}</li>`;
    })
    .join("");
}

    startButton.classList.remove("hide");
    showHighScores.classList.add("hide");
    





