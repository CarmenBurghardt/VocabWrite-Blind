

let countItem =0;
let inputValue = document.getElementById("inputvalue");
const submitButton = document.getElementById("submitButton");

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

let lessonNumber=0;
let progress= document.getElementById("progress");

function updateProgressbar(){
lessonNumber++;
progress.innerHTML =lessonNumber;
}


let score=0;
let idScore= document.getElementById("score");
function updateScore(){
  score= score+3;
  idScore.innerHTML= score;
}


let correctAwnser = items[countItem].word;
function compareAwnser(){ 
  

  console.log("Start compare awnser");
  if(inputValue.value == items[countItem].word ){
  
    //give feedback
      giveFeedback(true);

      }else{ 
      giveFeedback(false);  
     }




  //    let mistake = 0;
  // correctAwnser = correctAwnser.split('');
  // let submitAwnser = inputValue.split('');
  // let mistakenLetters;

  // // compare for length
  // if(correctAwnser.length !== submitAwnser.length){
  // alert("äwnser is wrong");
  // return;
  // }

  // for(let i=0; i< correctAwnser.length; i++ ){
    
  //   if(correctAwnser[i]!== submitAwnser[i]){
  //     mistake++;
  //     mistakenLetters= submitAwnser[i];
  //   }
    
  // }  
  // if (mistake ==1 ){

  //     alert("the awnser is wrong, look at these letter" + mistakenLetters);
  //   }

}


function updateHelpButtons(){}


//event listeners
submitButton.addEventListener("click", function(){
  compareAwnser();
 });

inputValue.addEventListener('keypress',function(e){

    console.log("text");
   if(e.keyCode ==13){
    e.preventDefault();
        compareAwnser();
    }
});

let statusAwnser= true;

function giveFeedback(statusAwnser){
  console.log("feedback");
  if(statusAwnser){
    alert("your awnser is right");
    updateScreen();
     
  }else{
     return alert("your awnser is wrong");
  }

}



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

