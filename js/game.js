// JavaScript Document

//  declare variables 
var randomNum = 0;		// Initialize random number 
var humanScore = 0;
var computerScore = 0;
var tieScore = 0;
var round = 1; //not strictly necessary, but a nice shorthand.
var choices = ["rock","paper","scissors"]; //just for quick conversion from an index to the right string
var rock = 0; //more nonsense to make the code easier to read
var paper = 1;
var scissors = 2

// declare image source arrays: human images, computer images, and rollover images (used by both human and computer)
var srcRollover = [ "images/rock_over.jpg", "images/paper_over.jpg", "images/scissors_over.jpg" ];
var srcHuman = [ "images/rock.jpg", "images/paper.jpg", "images/scissors.jpg" ];
var srcComputer = [ "images/rock.jpg", "images/paper.jpg", "images/scissors.jpg" ];

//  declare nodelists
//  the first contains all the human images, the second contains all the computer images
var humanList = document.getElementsByClassName("human");			// Human images
var computerList = document.getElementsByClassName("computer");		// Computer images

// declare event handlers

//  Event handler for clicking on the human image. This is where all the game
//  logic happens: random number generation, game counter, comparing user vs computer selection, etc. 
var clickHandler = function() {
	// 'this' is a reference to the object that currently "owns" this event handler function:
	// You'll need the index of the current image to match against your computer foe
    var i = this.index;
    
	// Restore default computer image before doing anything else
	computerList[randomNum].src = srcComputer[randomNum];
	
	// generate random number from 0 to 2
	randomNum = Math.floor( Math.random() * 3 );
	// Display current computer image using randomNumber as index
	computerList[ randomNum ].src = srcRollover[ randomNum ];
	
	// Put logic here 
	//check for ties, first of all
	if (i == randomNum){
		tieResult(i);
	}
	else if (i == rock){//if the player picks rock,
		if (randomNum == paper) { //and the computer picks paper...
			computerWin(i,randomNum);//then the computer wins
		}//and so on, and so on
		else if (randomNum == scissors) {
			humanWin(i,randomNum);
		}
	}
	else if (i == paper) {
		if (randomNum == rock) {
			humanWin(i,randomNum);
		}
		if (randomNum == scissors) {
			computerWin(i,randomNum);
		}
	}
	else if (i == scissors) {
		if (randomNum == rock) {
			computerWin(i,randomNum);
		}
		else if (randomNum == paper) {
			humanWin(i,randomNum);
		}
	}
}
//  Mouse over human image
var mouseoverHandler = function() {
	// 'this' is a reference to the object that currently "owns" this event handler function:
	// in other words, the image that the cursor just rolled over
	// (this should be familiar from working on the Car Speedometer exercise in Project 1)

	// Set image display to rollover image 
	this.src = srcRollover[this.index];
}

//  Mouse off human image
var mouseoutHandler = function() {
	// 'this' is a reference to the object that currently "owns" this event handler function:
	// in other words, the image that the cursor just rolled off of
	
	// Reset human and computer images back to default
	this.src = srcHuman[this.index];
	computerList[ randomNum ].src = srcComputer[ randomNum ];
}
// I'm gonna have functions to handle each result, to avoid cluttering up the clickHandler logic too much
//this one handles ties
function tieResult(choice) {
	tieScore++;//increment the relevant score
	document.querySelector("#scoreHeader").textContent = ("Results of Round " + round); //change the displayed round number
	round++; //then increment for next round
	if (round >= 11) {
		gameOver();//end the game after 10 completed rounds
	}
	else {//finally, update all the text to show the round results
		document.querySelector("#humanAction").textContent = "You chose " + choices[choice] + ".";//here's where having an array full of strings is handy
		document.querySelector("#computerAction").textContent = "The computer chose " + choices[choice] + ".";
		document.querySelector("#roundResult").textContent = "It's a tie! What a waste of a round. "
		document.querySelector("#tieScoreDisplay").textContent = "Tie: " + tieScore + " ";
	}
}
//this function is the same as above, but for if the player wins
function humanWin(humanChoice, computerChoice) {
	humanScore++;
	document.querySelector("#scoreHeader").textContent = ("Results of Round " + round);
	round++;
	if (round >= 11) {
		gameOver();
	}
	else {
		document.querySelector("#humanAction").textContent = "You chose " + choices[humanChoice] + ".";
		document.querySelector("#computerAction").textContent = "The computer chose " + choices[computerChoice] + ".";
		document.querySelector("#roundResult").textContent = "You won! I'd say good job, but it was just luck.";
		document.querySelector("#humanScoreDisplay").textContent = "Human: " + humanScore + " ";
	}
}
//this one's for handling computer wins
function computerWin(humanChoice, computerChoice) {
	computerScore++;
	document.querySelector("#scoreHeader").textContent = ("Results of Round " + round);
	round++;
	if (round >= 11) {
		gameOver();
	}
	else {
		document.querySelector("#humanAction").textContent = "You chose " + choices[humanChoice] + ".";
		document.querySelector("#computerAction").textContent = "The computer chose " + choices[computerChoice] + ".";
		document.querySelector("#roundResult").textContent = "You lost! Try to guess better next time.";
		document.querySelector("#computerScoreDisplay").textContent = "Computer: " + computerScore + " ";
	}
}
//after round 10, this gets called
function gameOver() {
	document.getElementById("wrapper").style.display = "none"; //hide the game screen
	document.getElementById("endScreen").style.display = "block";//show the end screen
	// then determine whether the player won or not and display the result
	if (humanScore > computerScore){
		document.getElementById("endResult").textContent = "You won!";
	}
	else if (humanScore < computerScore) {
		document.getElementById("endResult").textContent = "You lost!";
	}
	else {
		document.getElementById("endResult").textContent = "You tied! Lame.";
	}
}
//********************
//  Main Program
//********************

//  Playing the game:AF
//  when user clicks on a human image, do the following:
//  1)  use random number generator to display computer selection 
//  2)  use logic to determine who wins the round: human or computer
//  3)  display results of this round
//  4)  if 10 rounds have passed, turn off event handlers and display Game Over screen
//
document.getElementById("startButton").addEventListener("click",function() {
	document.getElementById("startScreen").style.display = "none";
	document.getElementById("wrapper").style.display = "block";
});

document.getElementById("resetButton").addEventListener("click",function() {
	//I'm feeling lazy, so why not just reload the page to reset everything?
	window.location.reload(false);
});
//  Loop through nodelist of human image nodes and assign event handlers to each one
//  Once this is done, game playing logic all happens inside of the clickHandler function
for (var i=0; i<humanList.length; i++) {
	var humanNode = humanList[i];
    // set up event handler associations for the image node.
	// Each image will be targeted by 3 events: click, mouseover, and mouseout
	humanNode.onclick = clickHandler;        // image will now respond to click events
	humanNode.onmouseover = mouseoverHandler;    // image will now respond to mouse over events
	humanNode.onmouseout = mouseoutHandler;    // image will now respond to mouse out events
	// add new property to image node to store the index number -- very important!
	humanNode.index = i; 
}