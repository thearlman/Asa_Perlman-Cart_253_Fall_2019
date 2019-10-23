// The billionaire space race for ultimate intergalactic domination
// by Asa Perlman & Pippin Barr
//
//A reasource eating race between two billionaires bent on getting their rockets into the
//stratosphere first. Play as either Jeff Amazon Bezos, or Elon Tesla Musk, and face off
//in this contemporary version of hungry hungry hippos. First one to colonize a planet wins!

// Our predators
let bezos;
let musk;
//and their spaceships
let muskShip;
let bezosShip;

// The empty prey image arrayyyy
let prey = [];

 //our background image
let backgroundImg;

// Booleans for start screen and game over screen
let start = true;
let gameOver = false;
//empty variable to store the winner's name
let winnerName;


function preload(){
  //preload images of billionarez
  bezosHead = loadImage("assets/images/bezosHead.png");
  bezosShip = loadImage("assets/images/blueOrigin.png");
  muskHead = loadImage("assets/images/muskHead.png");
  muskShip = loadImage("assets/images/spaceX.png");
  //preload images of prey into arrayyyy
  cashImg = loadImage("assets/images/cash.png");
  goldImg = loadImage("assets/images/gold.png");
  coltanImg = loadImage("assets/images/coltan.png")

  backgroundImg = loadImage("assets/images/backgroundImg.jpg");
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator(name, img, x, y, speed, fillColor, size, upKey,
//downKey, leftKey ,rightKey, sprintKey)
//and three sizes of prey(img, x, y, speed, fillColor, size)
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  //the predators

  bezos = new Predator("Bezos", bezosHead, width-100, 100, 5, color(200, 200, 0), 100, 38, 40, 37, 39, 17);
  musk = new Predator("Musk", muskHead, 100, 100, 5, color(0, 255, 0), 100, 87, 83, 65, 68, 16);
  //the prey
  cash = new Prey(cashImg, 100, 100, 2, color(255, 100, 10), 50);
  gold = new Prey(goldImg, 100, 100, 2, color(255, 255, 255), 50);
  coltan = new Prey(coltanImg, 100, 100, 2, color(255, 255, 0), 50);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // draw the background as an image of a night sky
  image(backgroundImg,0,0, windowWidth, windowHeight);
  //Display the wolcome screen.
  welcomeScreen();
    //if game over and start are both false, play the game
    if (!gameOver && start === false) {
    // Handle input for the tiger
    bezos.handleInput();
    musk.handleInput();

    // Move all the "animals"
    bezos.move();
    musk.move();
    cash.move();
    gold.move();
    coltan.move();

    // Handle the Bezos eating any of the prey
    bezos.handleEating(cash);
    bezos.handleEating(gold);
    bezos.handleEating(coltan);


    // Handle the Musk eating any of the prey
    musk.handleEating(cash);
    musk.handleEating(gold);
    musk.handleEating(coltan);

    // Display the billionaire's spaceships
    musk.displayShip(muskShip,30,height+137.5-musk.rocketPosition,200,275);
    bezos.displayShip(bezosShip, width -30, height+137.5-bezos.rocketPosition,200,275);

    // Check how close the billionaire's spaceship is on the screen
    musk.checkScore();
    bezos.checkScore();

    // Display all the "animals" hehe, and the prey as well.
    musk.display();
    bezos.display();
    cash.display();
    gold.display();
    coltan.display();
  }
  if (gameOver === true){
    showGameOver(winnerName);
  }
}
//welcomScreen()
//
//Displays a welcome message and instructions on how to play
function welcomeScreen(){
  if (!gameOver && start === true){
    push();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Welcome to:\n" +
    "The Great Billionaire Space Race!\n\n" +
    "Help these poor billionaires collect enough Cash,\n" +
    "Gold, and Coltan, to get off the ground!\n\n" +
    "To Control Jeffy: Arrow Keys + ctl to sprint\n" +
    "To Control Musky: A, W, S, D + shift to sprint\n\n" +
    "Press SPACE To Start!!!" , width/2, height/2);
    pop();
  }
}

//gameOver()
//
//Displays the winner of the game (though we all lose in the end) with an option to play again
function showGameOver(name){
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text(name + " won the race to privatize space!\n\n" +
  "Want to rewrite history?\n\n" +
  "Press SPACE to RACE again!!!", width/2, height/2);
  pop();

}

//Check to see if the "space" bar is pressed down
function keyPressed(){
  if (keyCode === 32){
    if(start === true || gameOver === true){
      start = false;
      gameOver = false;
      bezos.rocketPosition = 0;
      musk.rocketPosition = 0;
    }
  }
}
