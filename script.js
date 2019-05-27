

let countItem =0;
let inputValue = document.getElementById("inputvalue");
const submitButton = document.getElementById("submitButton");
let statusAwnser= true;
let lessonNumber=0;
let progress= document.getElementById("progress");
let score=0;
let idScore= document.getElementById("score");
//console.log("String"  + correctAwnser);
console.log(typeof correctAwnser);
//alert(typeof correctAwnser);



if(countItem == 0){
  updateItem(0);

}

function updateItem(countItem){
  let articleNext = document.getElementById('article');
  let itemNext = document.getElementById('item');
  
        let nextItem= items[countItem].item;
        let nextAritcle=  items[countItem].article;    
        //display item 
         document.getElementById('item').innerHTML= nextItem ;

        // display article
        articleNext.textContent =  items[countItem].article + " ";
         // clear screen in inputfield
        inputValue.value = '';
        if(countItem== items.length){
          alert("you are done");
          countItem=0;
        }
    }



function updateProgressbar(){
lessonNumber++;
progress.innerHTML =lessonNumber;
}



function updateScore(){
  score= score+3;
  idScore.innerHTML= score;
}



function compareAwnser(){
  let correctAwnser = items[countItem].word;
  let mistake = 0;
  let splittedWord= correctAwnser.split('');
  let submitAwnser= inputValue.value.split('');
  let mistakenLetters;
  let positionWrongLetter;
  console.log(correctAwnser);
  console.log(submitAwnser);
 
  // // compare for length
  if(correctAwnser.length !== submitAwnser.length){
    giveFeedback("the awnser is not correct, please try again" + "length");
  }

  //

  for(let i=0; i< correctAwnser.length; i++ ){
    
    if(correctAwnser[i]!== submitAwnser[i]){
       mistake++;
       mistakenLetters= submitAwnser[i];
       positionWrongLetter=i;

    }
    
   }  
    if (mistake ==1 ){
      //positionWrongLetter++;
      console.log("you were almost correct, look at the letter: "+ mistakenLetters+ "at position"+ " "+ positionWrongLetter+ "in your awnser");
      giveFeedback("you were almost correct, look at the letter: "+ mistakenLetters+ "that is the "+ " "+ positionWrongLetter+" "+"in your awnser");
   

    }
     if(mistake ==0){

     giveFeedback("The anwser is correct");
     updateScreen();
    }
    if(mistake >1){
    giveFeedback("the awnser is not correct, please try again" + "mistake");
        }


}


function updateHelpButtons(){}


//event listeners
submitButton.addEventListener('click', ()=>{
  compareAwnser();
 });

inputValue.addEventListener('keypress',function(e){

    console.log("text");
   if(e.keyCode ==13){
    e.preventDefault();
        compareAwnser();
    }
});

function giveFeedback(message) {

  const btn = document.querySelector("#submitButton");
  const alert = document.querySelector("#alert");
  const tmpl = document.querySelector("#feedback-tmpl");

  alert.innerHTML = '';
  const clone = tmpl.content.cloneNode(true);
  clone.querySelector('.feedback').textContent = message;
  alert.appendChild(clone);
}




function updateScreen() {
   giveFeedback("");
  // update next item 
  countItem++;
  //load next item 
    updateItem(countItem);
  updateScore();

  if (countItem == 4) {
    updateProgressbar();
  }
}

// function giveFeedback(message){
  
//   console.log("give feedback");
//   const btn = document.querySelector("#submitButton");
//   const alert = document.querySelector("#alert");
//   const tmpl = document.querySelector("#feedback-tmpl");
//   const clone = tmpl.content.cloneNode(true);
//   clone.querySelector('.feedback').textContent=message;
//   alert.appendChild(clone);
//   // if( >1){
//   //   console.log("too much feedback");


//   // }
//   let feedbackMessage = document.getElementsByClassName('feedback');

//   if(feedbackMessage => 1){
//     console.log("to much feedback" + " "+ feedbackMessage[1].textContent );

//   }


// }





function updateScreen(){
  // update next item 
        countItem++; 
      //load next item 
        updateItem(countItem);
        updateScore();
        if(countItem ==4){
          updateProgressbar();
        }
}

//Save awnser
let newAwnser = [];

function saveAwnsers(){
  let value = document.getElementById('inputvalue').value;
  newAwnser.push(value);
  console.log(newAwnser);
} 

