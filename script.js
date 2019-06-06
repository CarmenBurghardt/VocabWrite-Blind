
//exercise to translate words
//VARIABLES
// counter trough items(words)
let countItem =0;
// id input from user in inputfield 
let inputValue = document.getElementById("inputvalue");
//id button to skip or to go to the next item 
const submitButton = document.getElementById("submitButton");
//lesson number for progress bar 
let lessonNumber=0;
//id from progress bar
let progress= document.getElementById("progress");
let idItem =document.getElementById("item");
// points for having good or wrong awnsers
let score=0;
// id for score in banner
let idScore= document.getElementById("score");
//Skip button 
let skipButton = document.getElementById('skipButton');
let tryAgainId= document.getElementById('tryAgainButton');


// If nothing is loaded on the screen load the first tiem

if(countItem == 0){
  updateItem(0);

}

// update prog
function updateProgressbar(){
  // calculate what exercise is in lesson
  lessonNumber++;
  // display progress
  progress.innerHTML ="Progress" + lessonNumber ;
}


// everytime awnser is right, update score with 3
function updateScore(){
  // calculate score
  score= score+3;

  // dipaly score
  idScore.innerHTML= "Score: " + score;
}

//Update the item dependend which item there is

function updateItem(countItem){
  
  //get id from article
  let articleId = document.getElementById('article');

  // get id where to display the item 
  let itemId = document.getElementById('item');

  // get next noun
  
  let nextItem= items[countItem].item;
  
  // get next article
  let nextAritcle=  items[countItem].article;    

  //display item 
  itemId .innerHTML= nextItem ;


   // clear screen in inputfield
  inputValue.value = '';
      
  //when all items are done, give feedback the user is done
  if(countItem == items.length){
    giveFeedback("you are done");
    updateProgressbar();
    countItem=0;
  }
}



//Function retrieved from componentswebsite: https://inclusive-components.design/tooltips-toggletips/
(function() {
  // Get all the toggletip buttons
  var toggletips = document.querySelectorAll('[data-toggletip-content]');

  // Iterate over them
  Array.prototype.forEach.call(toggletips, function (toggletip) {
    // Get the message from the data-content element
    var message = toggletip.getAttribute('data-toggletip-content');

    // Get the live region element
    var liveRegion = toggletip.nextElementSibling;

    // Toggle the message
    toggletip.addEventListener('click', function () {
        liveRegion.innerHTML = '';
        window.setTimeout(function() {
          liveRegion.innerHTML = '<span class="toggletip-bubble">'+ message +'</span>';
        }, 100);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (toggletip !== e.target) {
        liveRegion.innerHTML = '';
      }                        
    });

    // Remove toggletip on ESC
    toggletip.addEventListener('keydown', function (e) {
      if ((e.keyCode || e.which) === 27)
      liveRegion.innerHTML = '';
    });
    
    // Remove on blur
    toggletip.addEventListener('blur', function (e) {
      liveRegion.innerHTML = '';
    });
  });
}());

function playSound(){
  let audio = new Audio(items[countItem].audio);
    audio.play();
}





function onOverlay() {
  document.getElementById("overlay").style.display = "block";
   document.getElementById("button").disabled = true;
}

function offOverlay() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("button").disabled = false;
}


//TODO: scaffolding
function tip(){}



//Event listener for if user submit awnser 

inputValue.addEventListener('keypress',function(e){

    // if enter is pressed
   if(e.keyCode ==13){
    // to avoid refreshing of page the whole time
    e.preventDefault();
    // check if input is correct
        compareAwnser();
    }
});

// feedback if awnser is wrong or right 

function giveFeedback(message) {

  const btn = document.querySelector("#submitButton");
  const alert = document.querySelector("#alert");
  const tmpl = document.querySelector("#feedback-tmpl");

  alert.innerHTML = '';// clear the feedback
  const clone = tmpl.content.cloneNode(true);
  clone.querySelector('.feedback').textContent = message;
  alert.appendChild(clone);
}

function giveTip(message) {

  const btnTip = document.querySelector("#submitButton");
  const tip = document.querySelector("#tip");
  const tmplTip = document.querySelector("#hint-tmpl");

  tip.innerHTML = '';// clear the feedback
  const clone = tmplTip.content.cloneNode(true);
  clone.querySelector('.hint').textContent = message;
  tip.appendChild(clone);
}

// update the total screen

function updateScreen() {
  // enable the inputfield
  document.getElementById("inputvalue").disabled = false;

  // clear feedback
  giveFeedback("");
  
  //clear inputfield
  inputValue.value="";

  //clear overlay
  offOverlay();
  // update next item 
  countItem++;
 
  //load next item and update score
  updateItem(countItem);
  updateScore();

  //update progressbar when for items are passed
  if (countItem == 4) {
    updateProgressbar();
  }
}


// compares the awnser from the user with the correct one


//create new button for skipping,next
let button = document.createElement("BUTTON");
let buttonTryAgain = document.createElement("BUTTON");

// style button 
button.classList.add("btn");
button.classList.add("btn-secondary");
button.classList.add("mt-5");

buttonTryAgain.classList.add("btn");
buttonTryAgain.classList.add("btn-secondary");
buttonTryAgain.classList.add("mt-5");
 // which letters the user have been mistaken in
 let mistakenLetters;

 //if letter is wrong where in the word is it written 
let positionWrongLetter;

//array to keep track of what part of the word is correct
let corrPartOfWord;

function compareAwnser(){
  // correct awnser, from item.js
  let correctAwnser = items[countItem].word;
  // amount of mistakes in awnser
  let mistake = 0;

  // split the awnser and correct for comparing
  let splittedWord= correctAwnser.split('');
  let submitAwnser= inputValue.value.split('');


  
// check for mistakes
  for(let i=0; i< correctAwnser.length; i++ ){
    // check if the letters are the same
    if(correctAwnser[i]!== submitAwnser[i]){
       mistake++;
       mistakenLetters= submitAwnser[i];
       positionWrongLetter=i;

    }
    
    if(mistake==0){
      corrPartOfWord +=  submitAwnser[i]+ ",";
   
    }
   }  
  
   // if you make 1 mistake you have it almost correct
    if (mistake ==1 ){
      AwnserAlmostcorrect();
      
   
    }
    // if you make no mistakes
     if(mistake ==0){
      AwnserIsCorrect();
    }

      // awnser is also wrong when more than 1 mistake is made
    if(mistake >1 || correctAwnser.length !== submitAwnser.length){
      AwnserIsNotCorrect();

    }
}

function giveAhint(){
  const tipButton = getElementById("hintButton");
  tipButton.setAttribute("data-toggletip-content", "Give me a tip");


}



function AwnserAlmostcorrect(){
     //positionWrongLetter++;
      onOverlay();
      giveTip();
      let corrPartWritten= corrPartOfWord;
      giveFeedback("You were almost correct. Please improve your awnser or press skip." + " "
      +"This part of the awnser was correct:  " + corrPartWritten+ ".");
      console.log("look at the letter: "+ mistakenLetters+" "+"that is letter "+ " "+ positionWrongLetter+" "+"in your awnser");
      button.innerHTML = "skip";
      buttonTryAgain.innerHTML="try again";
      buttonTryAgain.id="almostTryAgain";
      // 2. Append somewhere
     
      skipButton.appendChild(button);
      tryAgainId.appendChild(buttonTryAgain);
      button.classList.remove("mt-5");
      buttonTryAgain.classList.remove("mt-5");
 
      document.getElementById("almostTryAgain").focus();
      // 3. Add event handler
      button.addEventListener ("click", function() {
        skipButton.removeChild(button);
        offOverlay();
        updateScreen();
        document.getElementById("item").focus();
        });

      buttonTryAgain.addEventListener ("click", function() {
        skipButton.removeChild(button);
        tryAgainId.removeChild(buttonTryAgain);
        offOverlay();
        inputValue.focus();

        });
      // inputValue.addEventListener('keypress',function(e){
      //   if(e.keyCode ==13){
      //   e.preventDefault();
      //   skipButton.removeChild(button);

      //   }
      // });


}

function AwnserIsNotCorrect(){


  onOverlay();
  giveFeedback("Not correct, but you are getting there, please try again ");
  
  button.innerHTML = "try again";
  // 2. Append somewhere
  button.id="tryAgain";
  skipButton.appendChild(button);

  // let newId= document.getElementById("tryAgainButton");

  document.getElementById("tryAgain").focus();
  console.log("after focus");
  button.setAttribute('aria-label','Try again');
      // 3. Add event handler
  button.addEventListener ("click", function() {

  
  skipButton.removeChild(button);
  offOverlay();
  inputValue.focus(); 
    
      });
}



function AwnserIsCorrect(){
  document.getElementById("inputvalue").disabled = true;
  onOverlay();
  giveFeedback("The awnser is correct,please press next");
  button.innerHTML = "next";
  // 2. Append somewhere
   //add ID
  button.id="nextButton";
  skipButton.appendChild(button);
  //receive focus
  document.getElementById("nextButton").focus();

  
  button.addEventListener ("click", function() {
  skipButton.removeChild(button);
  updateScreen();
  document.getElementById("item").focus();

  });
}






//Save awnsers, for feedback/review
let newAwnser = [];

function saveAwnsers(){
  let value = document.getElementById('inputvalue').value;
  newAwnser.push(value);
  console.log(newAwnser);
} 

