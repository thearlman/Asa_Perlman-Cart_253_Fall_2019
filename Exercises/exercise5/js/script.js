// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let bezos;
let musk;
let muskShip;
let bezosShip;

// The prey image arrayyyy
let prey = [];

let antelope;
let zebra;
let bee;

 //our background image
let backgroundImg;


function preload(){
  //preload images of billionarez
  bezosHead = loadImage("assets/images/bezosHead.png");
  bezosShip = loadImage("assets/images/blueOrigin.png");
  muskHead = loadImage("assets/images/muskHead.png");
  muskShip = loadImage("assets/images/spaceX.png");
  //preload images of prey into arrayyyy
  prey[0] = loadImage("assets/images/money.png");
  prey[1] = loadImage("assets/images/gold.png");

  backgroundImg = loadImage("assets/images/backgroundImg.jpg");
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator(name, img, x, y, speed, fillColor, size, upKey, downKey, leftKey ,rightKey, sprintKey)
//and three sizes of prey(img, x, y, speed, fillColor, size)
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  //the predators
  bezos = new Predator("Bezos", bezosHead, width-100, 100, 5, color(200, 200, 0), 100, 38, 40, 37, 39, 17);
  musk = new Predator("Musk", muskHead, 100, 100, 5, color(0, 255, 0), 100, 87, 83, 65, 68, 16);
  //the prey
  antelope = new Prey(prey[0], 100, 100, 2, color(255, 100, 10), 50);
  zebra = new Prey(prey[1], 100, 100, 2, color(255, 255, 255), 50);
  bee = new Prey(prey[0], 100, 100, 2, color(255, 255, 0), 50);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // draw the background as an image of a night sky
  image(backgroundImg,0,0, windowWidth, windowHeight);

  console.log(height);
  console.log(musk.preyEaten);

  // Handle input for the tiger
  bezos.handleInput();
  musk.handleInput();

  // Move all the "animals"
  bezos.move();
  musk.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  bezos.handleEating(antelope);
  bezos.handleEating(zebra);
  bezos.handleEating(bee);    // fill(this.fillColor);
    // textAlign(CENTER,CENTER);
    // textSize(this.radius);
    // text(this.preyEaten, x, y);

  musk.handleEating(antelope);
  musk.handleEating(zebra);
  musk.handleEating(bee);


  musk.displayShip(muskShip,30,height+137.5-musk.preyEaten,200,275);
  bezos.displayShip(bezosShip, width -30, height+137.5-bezos.preyEaten,200,275);
  musk.checkScore();
  bezos.checkScore();
  // Display all the "animals"
  musk.display();
  bezos.display();
  antelope.display();
  zebra.display();
  bee.display();
}
