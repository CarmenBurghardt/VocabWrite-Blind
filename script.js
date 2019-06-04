
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

  // display article
  articleId.textContent = nextAritcle + " ";
        
   // clear screen in inputfield
  inputValue.value = '';
      
  //when all items are done, give feedback the user is done
  if(countItem == items.length){
    giveFeedback("you are done");
    updateProgressbar();
    countItem=0;
  }
}







// compares the awnser from the user with the correct one

function compareAwnser(){
  // correct awnser, from item.js
  let correctAwnser = items[countItem].word;
  // amount of mistakes in awnser
  let mistake = 0;

  // split the awnser and correct for comparing
  let splittedWord= correctAwnser.split('');
  let submitAwnser= inputValue.value.split('');

  // which letters the user have been mistaken in
  let mistakenLetters;
 
  //if letter is wrong where in the word is it written 
  let positionWrongLetter;

  //create new button for skipping,next
  let button = document.createElement("button");
  let buttonTryAgain = document.createElement("tryAgainButton");

  // style button 
  button.classList.add("btn");
  button.classList.add("btn-secondary");
  button.classList.add("mt-5");
 
  buttonTryAgain.classList.add("btn");
  buttonTryAgain.classList.add("btn-secondary");
  buttonTryAgain.classList.add("mt-5");
 
  
  
function playSound(){
  let audio = new Audio('fruta.mp3');
    audio.play();
}



  // // compare for length, if length not the same awnser is wrong
  if(correctAwnser.length !== submitAwnser.length){
      onOverlay();
      giveFeedback("the awnser is not correct, please try again");
   
    
  }

  
// check for mistakes
  for(let i=0; i< correctAwnser.length; i++ ){

    // check if the letters are the same
    if(correctAwnser[i]!== submitAwnser[i]){
       mistake++;
       mistakenLetters= submitAwnser[i];
       positionWrongLetter=i;

    } 
   }  // if you make 1 mistake you have it almost correct
    if (mistake ==1 ){
      //positionWrongLetter++;
      onOverlay();
      giveFeedback("You were almost correct. Please improve your awnser or press skip");
      console.log("look at the letter: "+ mistakenLetters+" "+"that is letter "+ " "+ positionWrongLetter+" "+"in your awnser");
      button.innerHTML = "skip";
      buttonTryAgain.innerHTML="try again";
      // 2. Append somewhere
     
      skipButton.appendChild(button);
      tryAgainId.appendChild(buttonTryAgain);


      // 3. Add event handler
      button.addEventListener ("click", function() {
        skipButton.removeChild(button);
        updateScreen();
        });

      buttonTryAgain.addEventListener ("click", function() {
        skipButton.removeChild(button);
        tryAgainId.removeChild(buttonTryAgain);
        offOverlay();
        });




      inputValue.addEventListener('keypress',function(e){
        if(e.keyCode ==13){
        e.preventDefault();
         focusMethod();
        skipButton.removeChild(button);

        }
      });
     //
    }
    // if you make no mistakes
     if(mistake ==0){
       document.getElementById("inputvalue").disabled = true;
      onOverlay();
      giveFeedback("The awnser is correct,please press next");
       button.innerHTML = "next";
      // 2. Append somewhere
     
      skipButton.appendChild(button);
      // 3. Add event handler
      button.addEventListener ("click", function() {
        skipButton.removeChild(button);
        updateScreen();
        focusMethod();
    
      });

    }

      // awnser is also wrong when more than 1 mistake is made
    if(mistake >1){

    giveFeedback("The awnser is not correct, please try again");
        }

}



focusMethod = function getFocus() {           
  document.getElementById("item").focus();
}



function onOverlay() {
  document.getElementById("overlay").style.display = "block";
   document.getElementById("button").disabled = true;
}

function offOverlay() {
  document.getElementById("overlay").style.display = "none";
}


//TODO: scaffolding
function updateHelpButtons(){}



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


// update the total screen

function updateScreen() {
  // enable the inputfield
  document.getElementById("inputvalue").disabled = false;

  // clear feedback
  giveFeedback("");

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





//Save awnsers, for feedback/review
let newAwnser = [];

function saveAwnsers(){
  let value = document.getElementById('inputvalue').value;
  newAwnser.push(value);
  console.log(newAwnser);
} 

