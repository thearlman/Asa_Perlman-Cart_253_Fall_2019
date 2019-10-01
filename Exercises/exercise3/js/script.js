"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetVX;
let targetVY;
let targetSpeed = 2;
let targetImage;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

let dogSize = 128;

//The you won message
let win = "YOU WINNED!!!";
//the dog is getting away message
let gettingAway = "HE'S GETTING \n AWAY!!!"
//the dog got away message
let dogGone = "HE'S GONE! \n GO FIND HIM!"

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// Keep track of whether they've won
let gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  background("#ffff00");
  createCanvas(windowWidth, windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  //See displayDogs function below
  displayDogs();
}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  // Displays an image of the lost dog, with a propt to find them, and instructions for resetting.
  noStroke();
  fill(255, 0, 0);
  rectMode(CENTER);
  textAlign(CENTER);
  rect(width - 100, 40, 200, 300);
  image(targetImage, width - 100, 50);
  fill(0);
  textSize(24);
  text("^^Chien Perdu!^^ \n Press Backspace \n To Try Again", width - 100, 120);
  //Check to see if the player has found and clicked on the dog
  winCheck();


}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
      gameOver = true;
    }
  }

}

//Checks to see if the player has requested a restart.
function keyPressed() {
  if (keyCode === BACKSPACE) {
    gameOver = false;
    displayDogs();
  }
  if (value == 67) {
    stroke(random(255));
    noFill();
    ellipse(targetX, targetY, targetImage.width);
  }
}


function displayDogs() {
  //Display the background
  background("#ffff00");
  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0, width);
    let y = random(0, height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1, x, y, dogSize, dogSize);
    } else if (r < 0.2) {
      image(decoyImage2, x, y, dogSize, dogSize);
    } else if (r < 0.3) {
      image(decoyImage3, x, y, dogSize, dogSize);
    } else if (r < 0.4) {
      image(decoyImage4, x, y, dogSize, dogSize);
    } else if (r < 0.5) {
      image(decoyImage5, x, y, dogSize, dogSize);
    } else if (r < 0.6) {
      image(decoyImage6, x, y, dogSize, dogSize);
    } else if (r < 0.7) {
      image(decoyImage7, x, y, dogSize, dogSize);
    } else if (r < 0.8) {
      image(decoyImage8, x, y, dogSize, dogSize);
    } else if (r < 0.9) {
      image(decoyImage9, x, y, dogSize, dogSize);
    } else if (r < 1.0) {
      image(decoyImage10, x, y, dogSize, dogSize);
    }
  }
  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0, width);
  targetY = random(0, height);
  //Draw the lost dog;
  image(targetImage, targetX, targetY, dogSize, dogSize);
}


function winCheck() {
  //Only runs if the player has clicked the dog turning the gameOver contitional to true
  if (gameOver === true) {
    background("#ffff00");
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(random(255));
    //Make the dog start running away again
    targetVX = targetSpeed;
    targetX += targetVX;
    //Draw the found dog;
    image(targetImage, targetX, targetY);

    //Once the dog is found, display the win message
    if (targetX < width - 200) {
      text(win, width / 2, height / 2);
    }
    //If the dog is almost off the screen, display the getting away message
    else if ((targetX > width - 200) && (targetX < width - 1)) {
      text(gettingAway, width / 2, height / 2);
    }
    //If the dog is off the screen, display the dogGone message
    else {
      //location of reset text
      let resetX = width - 150;
      let resetY = height - 80;
      text(dogGone, width / 2, height / 2);
      textSize(40);
      noFill();
      stroke(255, 0, 0);
      //if the player id hovering over the reset button:
      if (dist(mouseX, mouseY, resetX, resetY) < 100) {
        //change the text fill to random
        stroke(random(255));
        //if the player presses the reset button while hovering:
        if (mouseIsPressed) {
          //increase number of decoy dogs by 20
          numDecoys += 20;
          //decrease the size of all dogs by 10 px
          dogSize -= 10;
          //increase speed at which dog will run away at next time.
          targetSpeed += 1;
          //redraw the dogs
          displayDogs();
          //and change the gameover conditional to flase
          gameOver = false;
          noStroke();
        }
      }
      strokeWeight(1);
      rect(resetX, resetY, 300, 100);
      text("LET'S GO!...", resetX, resetY);
    }
  }
}
