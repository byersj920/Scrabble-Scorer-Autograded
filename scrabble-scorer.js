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

let wordInput = '';
function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   wordInput = input.question('Please enter a word you wish to score: ')
};


let simpleScorer = function(word){
   return word.length;
};

let vowelBonusScorer = function(word){
   word = word.toLowerCase();
   let score = 0;
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   let scoringArray = word.split('');
   for (let i = 0; i < scoringArray.length; i++){
      if (vowels.includes(scoringArray[i])){
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
};


let scrabbleScorer = function(word){
   word = word.toLowerCase();
   let points = 0;
   for (let i = 0; i < word.length; i++){
      points += Number(newPointStructure[word[i]]);
   }
   return points;
};

let simpleScorerObject = {
   name: 'Simple Scorer',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
};

let vowelBonusScorerObject = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
};

let scrabbleScorerObject = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScorerObject, vowelBonusScorerObject, scrabbleScorerObject];

function scorerPrompt() {
   console.log(`Which scoring algorithm would you like to use?
   
   0-> ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
   1-> ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
   2-> ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);

   let scoringMethodChoice = input.question("Enter 0, 1, or 2: ");
   let correctOptions = ['0', '1', '2'];
   while (correctOptions.includes(scoringMethodChoice) === false){
      scoringMethodChoice = input.question(`${scoringMethodChoice} is not a valid entrty. Please enter 0, 1, or 2: `);
   }
   console.log(scoringAlgorithms[scoringMethodChoice].scorerFunction(wordInput));
}

function transform(object) {
   let newObject = {};
   for (item in object){
      let oldArray = object[item];
      for (let i = 0; i < oldArray.length; i++){
         newObject[oldArray[i].toLowerCase()] = Number(item);
      }
   }
   return newObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

runProgram();

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
