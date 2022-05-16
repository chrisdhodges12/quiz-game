///Quiz questions 
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
var timeRemaining = 100; 
var questionNumber;
var initials = "";
var scoreListItems = 0;
var initials;
var questionNUmber;
var time;
var scoreListItems = [];

//event listener to start
startButton.addEventListener("click", startGame);

//function to begin game
function startGame() {
    startButton.classList.add("hide");
    questionEl.classList.remove("hide");
    answerButtons.classList.remove("hide");
    questionNumber = [0];
    showHighScores.innerHTML = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    startClock();
    nextQuestion(questions[0]);
}

//calls next question after answering
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

//runs clock when game begins 
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

//handles answer selections, removes time if incorrect 
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

//clears out unwanted answer buttons 
function reset() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
}

//ends game, takes you to scores
function endGame() {
    clearInterval (time);
    timeEl.innerHTML = "";
    startButton.innerHTML = "Play again";
    startButton.classList.remove("hide"); 
    reset();
    showScore();
    startButton.addEventListener("click", startGame);
    timeRemaining = 100;
}
 
//shows your score = time remaining 
function showScore() {
    var score = timeRemaining;
    questionEl.classList.add("hide")
    showHighScores.classList.remove("hide");
    answerButtons.classList.add("hide");
    showHighScores.innerHTML = `Your score is ${score}!<div id="form">Initials: <input type="text" id="initials">
    <button id="save-btn" class="btn">Save</button>
    <div id="savedList" class="savedList"></div></div>`;
}
   

// handles score submit into local storage
function submitScore() {
    var initials = document.getElementById("initials");
    var saveForm = document.getElementById("savedList")

    var scoreListItems = {
        score: score,
        initials: initials.value,
    };

    saveForm.push(scoreListItems);
    localStorage.setItem("Your Score", JSON.stringify(scoreListItems));

     //problem is here. Expect something to return in console but nothing happens.
     console.log (scoreListItems);
  
    displayScores();
}

//display score when called upon and at end of game 
function displayScores() {
    questionEl.classList.remove("hide");
    questionEl.innerHTML = JSON.parse(localStorage.getItem(scoreListItems));
}

startButton.classList.remove("hide");
showHighScores.classList.add("hide");
    





