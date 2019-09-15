// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;
let raceOver = false;
let winner;
let winnerImage;


// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  //initialize img of steve jobz
  jobz = loadImage('assets/images/jobz.png')
  gatez = loadImage('assets/images/gatez.png')
  windows = loadImage('assets/images/windows.png')
  apple = loadImage('assets/images/apple.png')


  // Start the Steve off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  jobzX = -circleSize/2;
  jobzY = height + circleSize/2;

  // Start the Bill off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  gatezX = width + squareSize/2;
  gatezY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen


function draw() {
  // We don't fill the background so we get a drawing effect

  //Give Stevie and Billy a transparency
  tint(255,175);
  //Draw Stevie
  image(jobz,jobzX+5,jobzY,150,150);
  //Draw Billy
  image(gatez,gatezX-5,gatezY,150,150);
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(jobzX,jobzY,circleSize,circleSize);
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(gatezX,gatezY,squareSize,squareSize);

  //The random variables(s) affecting bill & Steve's speed.
  jobzSpeed = random(4);
  gatezSpeed = random(4);
  if (raceOver == false) {
    // Move circle (& steve) up and to the right
    jobzX += jobzSpeed + random(-2,2);
    jobzY -= jobzSpeed-1;
    // Move square (& bill) up and to the left
    gatezX -= gatezSpeed +random(-2,2);
    gatezY -= gatezSpeed-1;

    //Detect which image has crossed the x-axis finish line first
      if (jobzX > windowWidth){
        winner = "JOBZ";
        raceOver = true;
        winnerImage = apple;
    }
      if (gatezX < 1){
        winner = "GATEZ";
        raceOver = true;
        winnerImage = windows;
    }
  }

  if (raceOver == true) {
    //background(0);
    frameRate(24);
    image(winnerImage, width/2,100,150,150);
    rectMode(CENTER);
    fill(0,255,0);
    rect(width/2,height/2, 500, 100)
    fill(random(255),random(255),random(255));
    noStroke();
    textSize(32);
    textAlign(CENTER);
    text("THE WINNER IS " + winner + "!!!", width/2, height/2);
    text("Clic to race again!!!", width/2, height/2+32);

  }
  else{
    frameRate(30);
  }
//console.log(winner);
//console.log(raceOver);

}

function mousePressed(){
  //if (keyCode == RETURN){
    createCanvas(windowWidth,windowHeight);
    clear();
    raceOver = false;
    // Start the Steve off screen to the bottom left
    // We divide the size by two because we're drawing from the center
    jobzX = -circleSize/2;
    jobzY = height + circleSize/2;

    // Start the Bill off screen to the bottom right
    // We divide the size by two because we're drawing from the center
    gatezX = width + squareSize/2;
    gatezY = height + squareSize/2;

//  }
}
