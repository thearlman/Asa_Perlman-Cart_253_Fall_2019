// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let tiger;
let bear;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator(x, y, speed, fillColor, radius, upKey, downKey, leftKey ,rightKey, sprintKey)
//and three prey
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(width-100, 100, 5, color(200, 200, 0), 40, 38, 40, 37, 39, 17);
  bear = new Predator(100, 100, 5, color(0, 255, 0), 40, 87, 83, 65, 68, 16);
  antelope = new Prey(100, 100, 2, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 2, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 2, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  console.log(tiger.preyEaten);

  // Handle input for the tiger
  tiger.handleInput();
  bear.handleInput();

  // Move all the "animals"
  tiger.move();
  bear.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  bear.handleEating(antelope);
  bear.handleEating(zebra);
  bear.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  bear.display();
  antelope.display();
  zebra.display();
  bee.display();
}
