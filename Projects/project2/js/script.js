// Trash Orgin: Journey to the Planet Amazon
// by Asa Perlman. Template by: Pippin Barr
//(special; thanks to Daniel Shiffmans tuts)
// ~~~~~~~~~~~Description to follow~~~~~~~~~~~~
//
//
//

// Variables for the player, and the players image (crosshairs)
let player;
let playerCrosshairs;

// Array to hold the enemy objects
let enemies = [];
let antelope;

//Variables to hold the various game graphics
let cockpit;
let backgroundImg;

//preload()
//
//
//
// Preloads the various images and sounds for the game
function preload(){
cockpit = loadImage('assets/images/cockpit.png');
backgroundImg = loadImage('assets/images/backgroundImg.jpg');
playerCrosshairs = loadImage('assets/images/crosshairs.png');

}



// setup()
//
// Sets up a canvas
// Creates player and enemy objects
function setup() {
  createCanvas(windowWidth, windowHeight);

  player = new Player(100, 100, 5, color(200, 200, 0), 50, playerCrosshairs);

  for (let i = 0; i < 1; i++ ){
    enemies[i] = new Enemy(100, 100, 5, color(255, 100, 10), 1);
  }
}

// draw()
//
// Handles input, movement, health, and displaying for the system's objects
function draw() {
  // Display the background as a starry night
  background(backgroundImg);

  // Handle input for the player
  player.handleInput();
  // Handle movment of the player
  player.move();
  // Handle movement, health and displaying of enemies
  for (let i = 0; i < enemies.length; i++){
    enemies[i].move();
    enemies[i].updateHealth();
    enemies[i].display();
  }
  // Display the player's crosshairs
  player.display();
  // Display the cockpit image in front of everythign else (so it looks like you're inside)
  image(cockpit,0,0,width,height);
}

//keyPressed()
//
//
// Checks for keyboard events
function keyPressed(){
  //if the spacebar is pressed, check to see if any of the enemies have been accurately targeted
  if (keyCode === 32){
    for (let i = 0; i < enemies.length; i++){
      player.handleTarget(enemies[i]);
    }
  }
}
