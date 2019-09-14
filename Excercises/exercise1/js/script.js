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
let winner;


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
  createCanvas(640,640);
  imageMode(CENTER);
  //initialize img of steve jobz
  jobz = loadImage('assets/images/jobz.png')
  gatez = loadImage('assets/images/gatez.png')



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
  //The random variables(s) affecting bill & Steve's speed.
  jobzSpeed = random(4);
  gatezSpeed = random(5);
  // We don't fill the background so we get a drawing effect

  //Give transperency to images
  tint(255,175);
  //Draw Stevie
  image(jobz,jobzX+5,jobzY,150,150);
  //Draw Billy
  image(gatez,gatezX-5,gatezY,150,150);
  // Move circle (& steve) up and to the right
  jobzX += jobzSpeed;//+random(-1,+1);
  jobzY -= jobzSpeed;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(jobzX,jobzY,circleSize,circleSize);

  // Move square (& bill) up and to the left
  gatezX -= gatezSpeed;//+random(-1,1);
  gatezY -= gatezSpeed;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(gatezX,gatezY,squareSize,squareSize);


    let jobzWins= new Promise(function(resolve, reject){
      if(jobzX > 640){
        resolve("jobz");
    }

    });
    let gatezWins= new Promise(function(resolve, reject){
      if(gatezX < 1){
        resolve("gatez");
    }
    });

    Promise.race([gatezWins, jobzWins])
      .then((resolve)=>{
        console.log(resolve);
      })
      .catch((resolve)=>{
        console.log(resolve);
      });


      // background(0);
      // fill(255,0,0);
      // noStroke();
      // textSize(32);
      // text(winner, 180, height/2);
}
