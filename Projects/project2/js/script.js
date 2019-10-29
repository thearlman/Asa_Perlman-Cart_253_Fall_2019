// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let player;
let playerCrosshairs;

// The three prey
let antelope;
let zebra;
let bee;

let cockpit;
let backgroundImg;

function preload(){
cockpit = loadImage('assets/images/cockpit.png');
backgroundImg = loadImage('assets/images/backgroundImg.jpg');
playerCrosshairs = loadImage('assets/images/crosshairs.png');

}



// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(100, 100, 5, color(200, 200, 0), 50, playerCrosshairs);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 10);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 10);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(backgroundImg);

  // Handle input for the player
  player.handleInput();

  // Move all the "animals"
  player.move();
  antelope.move();
  zebra.move();
  bee.move();

  antelope.updateHealth();
  zebra.updateHealth();
  bee.updateHealth();



  // Display all the "animals"
  player.display();
  antelope.display();
  zebra.display();
  bee.display();
  image(cockpit,0,0,width,height);
}

function keyPressed(){
  if (keyCode === 32){
    // Handle the player targeting any of the prey
    player.handleTarget(antelope);
    player.handleTarget(zebra);
    player.handleTarget(bee);
  }
}
