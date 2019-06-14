let countItem = 0;
let inputValue = document.getElementById("inputvalue");
const submitButton = document.getElementById("submitButton");
let lessonNumber = 0;
let progress = document.getElementById("progress");
let idItem = document.getElementById("item");
let score = 0;
let idScore = document.getElementById("score");
let skipButton = document.getElementById('skipButton');
let tryAgainId = document.getElementById('tryAgainButton');
const idHelpButton = document.getElementById("hintButton");
let missedArticle = false;

if (countItem == 0){
  updateItem(0);
}

// Progress

function updateProgressbar(){
  lessonNumber++;
  progress.innerHTML = "Progress" + lessonNumber;
}

// Score update
function updateScore(){
  score = score + 3;
  idScore.innerHTML = "Score: " + score;
}

//Update the item dependend which item there is

function updateItem(countItem){
  let itemId = document.getElementById('item');
  let nextItem = items[countItem].item;
  let hint = items[countItem].hint;
  idHelpButton.setAttribute('data-toggletip-content', hint);

  itemId.innerHTML = nextItem;
  inputValue.value = '';

  // Items done
  if (countItem == items.length){
    giveFeedback("you are done");
    updateProgressbar();
    countItem = 0;
  }

  (function (){
    // Get all the toggletip buttons
    var toggletips = document.querySelectorAll('[data-toggletip-content]');

    Array.prototype.forEach.call(toggletips, function (toggletip) {
      // Get the message from the data-content element
      var message = toggletip.getAttribute('data-toggletip-content');

      // Get the live region element
      var liveRegion = toggletip.nextElementSibling;

      // Toggle the message
      toggletip.addEventListener('click', function(){
        liveRegion.innerHTML = '';
        window.setTimeout(function () {
          liveRegion.innerHTML = '<span class="toggletip-bubble">' + message + '</span>';
        }, 100);
      });

      // Close on outside click
      document.addEventListener('click', function(e){
        if (toggletip !== e.target) {
          liveRegion.innerHTML = '';
        }
      });

      // Remove toggletip on ESC
      toggletip.addEventListener('keydown', function(e){
        if ((e.keyCode || e.which) === 27)
          liveRegion.innerHTML = '';
      });

      // Remove on blur
      toggletip.addEventListener('blur', function(e){
        liveRegion.innerHTML = '';
      });
    });
  }());
}

function playSound(){
  let audio = new Audio(items[countItem].audio);
  audio.play();
}

// Feedback sheet

function onOverlay(){
  document.getElementById("overlay").style.display = "block";
  document.getElementById("inputvalue").disabled = true;
  document.getElementById("button").disabled = true;
}

function offOverlay(){
  document.getElementById("overlay").style.display = "none";
  document.getElementById("inputvalue").disabled = false;
  document.getElementById("button").disabled = false;
  showButton(button,"button to go to the next word");
  showButton(buttonTryAgain,"button for make another attempt");
}

inputValue.addEventListener('keypress', function(e){
  if (e.keyCode == 13 && inputValue !== '' && inputValue !== " ") {
    e.preventDefault();
    compareAnswer();
  }
});

function giveFeedback(message){
  const alert = document.querySelector("#alert");
  const tmpl = document.querySelector("#feedback-tmpl");
  alert.innerHTML = '';
  const clone = tmpl.content.cloneNode(true);
  clone.querySelector('.feedback').textContent = message;
  alert.appendChild(clone);
}

function updateScreen(){
  document.getElementById("inputvalue").disabled = false;
  giveFeedback("");
  inputValue.value = "";
  idHelpButton.removeAttribute("data-toggletip-content");
  offOverlay();
  countItem++;
  updateItem(countItem);
  updateScore();
  if (countItem == 4) {
    updateProgressbar();
  }
}

let button = document.createElement("BUTTON");
let buttonTryAgain = document.createElement("BUTTON");

// Button Events

button.addEventListener("click", function(){
  offOverlay();
  updateScreen();
  document.getElementById("item").focus();
});

button.addEventListener('keypress', function(e){
  if (e.keyCode == 13) {
    e.preventDefault();
    offOverlay();
    updateScreen();
    document.getElementById("item").focus();
  }
});

buttonTryAgain.addEventListener("click", function(){
  offOverlay();
  inputValue.focus();
});

buttonTryAgain.addEventListener('keypress', function(e){
  if (e.keyCode == 13) {
    offOverlay();
    inputValue.focus();
  }
});

button.classList.add("btn");
button.classList.add("btn-primary");

buttonTryAgain.classList.add("btn");
buttonTryAgain.classList.add("btn-secondary");

let mistakenLetters;
let positionWrongLetter;

skipButton.appendChild(button);
tryAgainId.appendChild(buttonTryAgain);

function compareAnswer(){
  let correctAnswer = items[countItem].translation;
  let mistake = 0;
  let submitAnswer = inputValue.value.split('');
  let corrPartOfWord= '';

  // Mistakes

  for (let i = 0; i < correctAnswer.length; i++){
    if (correctAnswer[i] !== submitAnswer[i]) {
      mistake++;
      mistakenLetters = submitAnswer[i];
      positionWrongLetter = i;
    }

    if (mistake == 0){
      corrPartOfWord += submitAnswer[i] + ",";
      if (submitAnswer[i] == " ") {
        corrPartOfWord += submitAnswer[i] + " ";
      }
    }
  }

  if (mistake == 1){
    AnswerAlmostcorrect(corrPartOfWord);
  }

  if (mistake == 0){
    AnswerIsCorrect();
  }

  if (mistake > 1 || correctAnswer.length !== submitAnswer.length){
    if (inputValue.value == items[countItem].word) {
      missedArticle = true;
      AnswerAlmostcorrect();
      return;
    }

    AnswerIsNotCorrect();
    return;
  }
}

// Answers 

function AnswerAlmostcorrect(corrPartWritten){
  buttonTryAgain.classList.remove("btn-primary");
  onOverlay();
  if (missedArticle) {
    giveFeedback("You miss the article in front of the word");
    missedArticle = false;
  }
  else {
    giveFeedback(`You were almost correct. Please improve your answer or press skip. This part of the answer was correct: ${corrPartWritten}.`);
  }
  button.innerHTML = "skip";
  buttonTryAgain.innerHTML = "try again";
  buttonTryAgain.focus();
}

function AnswerIsNotCorrect(){
  hideButton(button);
  onOverlay();
  giveFeedback("Not correct, but you are getting there, please try again ");
  buttonTryAgain.classList.add("btn-primary");
  buttonTryAgain.innerHTML = "try again";
  buttonTryAgain.focus();
  buttonTryAgain.setAttribute('aria-label', 'Try again');
}

function AnswerIsCorrect(){
  document.getElementById("inputvalue").disabled = true;
  hideButton(buttonTryAgain);
  onOverlay();
  giveFeedback("The answer is correct, please press next");
  button.innerHTML = "next";
  button.focus();
}

// Methods to hide and show buttons 

function hideButton(button){
  button.style.visibility = "hidden";
  button.setAttribute('aria-hidden','true');
  button.removeAttribute('aria-label');
}

function showButton(button, description){
  button.style.visibility = "visible";
  button.setAttribute('aria-hidden','false');
  button.setAttribute('aria-label', description);
}
