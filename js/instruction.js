function Instruction(learningLanguage, displayLanguae){
  this.explanationLong=  "Write the letter in the correct order";
  this.explanationShort= "Type the letter and hit enter";
  this.amountOfItems= 4;
  this.learningLanguage= learningLanguage;
  this.displayLanguae= displayLanguae;
  this.subtitle = function(){ 
  return "With the given "+" " + this.displayLanguae+ " "+"word, use theunjumbled letter to make the " +
        this.learningLanguage+" "+ "translation.";
    }
};

var instruction1 = new Instruction('spanish', 'english');
document.getElementById("mainInstruction").innerHTML=instruction1.explanationLong;
document.getElementById("subtitle").innerHTML=instruction1.subtitle();
document.getElementById("subinstruction").innerHTML=instruction1.explanationShort;
