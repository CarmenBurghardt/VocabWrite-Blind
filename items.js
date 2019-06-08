// items or word that are going to be translated by the user.
//item: display translation 
//article: the article translate in learning language( e.g la or le)
//word: the noun in learning language( needs to fill in), awnser to question
//translation: the total translation in the learning language
//audio: the audio reference that pronounces the word(item) in the learning language
//Used by script.js
// Carmen Burghardt 29-05-2019
//Adding some longer words

const items = [
  {
    item: 'the fruit',
    article: 'la',
    word: 'fruta',
    translation: 'la fruta',
    hint: 'The word contains the following letters  T-R-U-F-A',
    audio: 'fruta.mp3'
  },
  {
    item: 'the banana',
    article: 'el',
    word: 'plátano',
    translation: 'el plátano',
    hint: 'The translation contains the following letters O-P-L-Á-T-A-N ',
    audio: 'platano.mp3'
  },


  {
    item: 'the apple',
    article: 'la',
    word: 'manzana',
    translation: 'la manzana',
    hint: 'The translation contains the following letters N-A-Z-M-A-N-A',
    audio: 'manzana.mp3'

  },
  {
    item: 'the carrot',
    article: 'la',
    word: 'zanahoria',
    translation: 'la zanahoria',
    hint: 'The translation contains the following letters Z-A-N-A-R-O-H-R-A-I',
    audio: 'zanahoria.mp3'
  }

];
