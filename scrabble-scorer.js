// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word= input.question("Let's play some scrabble! Enter a word: ");
   return word;
};

let newPointStructure= transform(oldPointStructure);
newPointStructure[0]= " ";

let simpleScorer =  function (word){
   let score= word.length;
   return score;
    };
   

let  vowelBonusScorer= function (word){
   word= word.toUpperCase();
   let bonusScore= 0;
   let vowels= ['A', 'E', 'I', 'O', 'U'];

   for (let i=0; i < word.length; i++){
      let letter= word[i];
       if(!vowels.includes(letter)){
          bonusScore += 1;
         } else{
          bonusScore += 3;
         }
      }
      return bonusScore;
   }

let scrabbleScorer= function(word){
   let scrabbleScore=0;
   word= word.toLowerCase();

   for(let i= 0; i < word.length; i++){
      let letter = word[i];

      if(letter in newPointStructure){
         scrabbleScore += newPointStructure[letter];
      }
   }
   return scrabbleScore;
};


const scoringAlgorithms = [ {name: "Simple",
                            description: "Each letter is worth 1 point.",
                            scorerFunction: simpleScorer},

                            {name: "Bonus Vowels",
                            description:"Vowels are 3 pts, consonants are 1 pt.",
                            scorerFunction: vowelBonusScorer},
    
                            {name: "Scrabble",
                            description:"The traditional scoring algorithm.",
                            scorerFunction: scrabbleScorer}];

function scorerPrompt(word) {
   
   let numSelection= input.question(`Which scoring algorithm would you like to use?\n
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
   Enter 0, 1, or 2: `);
  
   if(numSelection === "0" || numSelection === "1" || numSelection === "2"){
      return `Score for '${word}' : ${scoringAlgorithms[numSelection].scorerFunction(word)}`;
   } else {
     console.log(`INVALID ENTRY!! Number selection should be 0, 1, or 2, please try again. \n`) ;
     return scorerPrompt(word);
   }
};

   function transform(oldPointStructure){
      let transformedArray={};
   
         for(const pointValue in oldPointStructure){
         let letters= oldPointStructure[pointValue];
            for(let i = 0; i < letters.length; i++){
            let eachLetter= letters[i];
            transformedArray[eachLetter.toLowerCase()] = Number(pointValue);
            }
         }
         return transformedArray;
      };

function runProgram() {
   let prompt = initialPrompt();
    console.log (scorerPrompt(prompt));
   
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
