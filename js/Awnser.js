var items = [
    {
       item: 'the fruit',
        article:'la',
        word: 'fruta',
        translation: 'la fruta'
    },
    { 
        item: 'the banana',
        article:'el',
        word: 'plátano',
        translation: 'el platano'

    },
    { 
        item: 'the apple' ,
        article:'la',
        word: 'manzana',
        translation: 'la manzana'

    },
    { item: 'the carrot',
        article:'la',
        word: 'zanahoria',
        translation: 'la zanahoria'
    }

];



// Load first item 
var countItem = 0;
    if(countItem == 0){
        var item2 = item[countItem].item;
            document.getElementById('item').innerHTML= item2 ;
 }

        
//write instruction above label

const instructionAboveLabel =  document.getElementById('labelInstuction');
const articleText = document.getElementById('article');

// read out article
articleText.textContent =  item[countItem].article + " ";

// Select inputfield and find what you have to fill (see placeholder index)
//Type in awnser or ask for help
const  awnserFromUser = document.querySelector("input.awnserFromUser");
const  submitWordButton = document.querySelector("button.submitWordButton");
//Submit awnser
// via enter or via button
//via button "Submit"
submitWordButton.addEventListener('click',()=>{
    console.log(countItem);
    compareAwnser();
});
  
//via enter
awnserFromUser.addEventListener('keypress',function(e){

    console.log("text");
   if(e.keyCode ==13){
    e.preventDefault();
    console.log(countItem);
        compareAwnser();
    }
});


function compareAwnser(){
    if(awnserFromUser.value == item[countItem].word ){
        alert("your awnser is right");
        countItem++; 
        //load next item 
        var item2 = item[countItem].item;
        var article = item[countItem].article;
        document.getElementById('item').innerHTML= item2 ;
        articleText.textContent =  item[countItem].article + " ";


        // clear screen in inputfield
        awnserFromUser.value = '';

    }else{
        alert("your awnser is wrong");

    }
}
    
var article;
var word;
var translation;
var response


function printItemt(){
    for (var i= 0; i<item.length; i+=1){
        article = item[i].article;
        word = item[i].word;
        translation=item[i].translation;       

    }
}