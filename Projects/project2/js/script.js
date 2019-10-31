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
//counters to trigger new enemy spawn
///based on enemies killed
let killCount = 0;
///based on time played
let spawnTimer;
let counter = 0;

// Array to hold the enemy objects
let enemies = [];
let enemyImg;

//Variables to hold the various static game graphics
let cockpit;
let backgroundImg;

//Variables for the planet Amazon, and it's image
let targetPlanet;
let planetAmazonImg;

//variable to store the part of the screen obstructed by cockpit
let cockpitMask;

//preload()
//
//
//
// Preloads the various images and sounds for the game
function preload() {
  cockpit = loadImage('assets/images/cockpit.png');
  planetAmazonImg = loadImage('assets/images/planetAmazon.png')
  backgroundImg = loadImage('assets/images/backgroundImg.jpg');
  playerCrosshairs = loadImage('assets/images/crosshairs.png');
  enemyImg = loadImage('assets/images/amazonDrone.png')

}

// setup()
//
// Sets up a canvas
// Creates player and enemy objects
function setup() {
  //create canvas at width and height of window
  createCanvas(windowWidth, windowHeight);
  //define the vertical area of screen we want to mask as 75%
  cockpitVerticalMask = height * 75 / 100;
  //create the player
  player = new Player(100, 100, 10, color(200, 200, 0), 50, playerCrosshairs);
  //create the Amazon planet
  //(img, x, y, vy, size, growSpeed)
  targetPlanet = new PlanetAmazon(planetAmazonImg, width / 2, 0, .05, 10, .1);
  //create first enemies
  for (let i = 0; i < 1; i++) {
    enemies[i] = new Enemy(enemyImg, random(0, width), random(0, cockpitMask), 5, 1);
  }
  //Set interval between new enemy spawns
  setInterval(Enemy.spawnNewEnemy, 15000);
}



// draw()
//
// Handles input, movement, health, and displaying for the system's objects
function draw() {
  console.log(killCount);
  // Display the background as a starry night
  background(backgroundImg);
  // Handle input for the player
  player.handleInput();
  // Handle movment of the player
  player.move();
  //display the amazon planet
  targetPlanet.display();
  // Handle movement, health and displaying of enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].display();
    enemies[i].updateHealth();
    enemies[i].collisionDetect();
  }
  // let enemiesReversed = enemies.reverse();
  //
  // for (let i = 0; i < enemiesReversed.length; i++){
  //   enemiesReversed[i].display();
  // }

  // Display the player's crosshairs
  player.display();
  // Display the cockpit image in front of everything else (so it looks like you're inside)
  image(cockpit, 0, 0, width, height);
  player.displayHealth();
}


//keyPressed()
//
//
// Checks for keyboard events
function keyPressed() {
  //if the spacebar is pressed, check to see if any of the enemies have been accurately targeted
  if (keyCode === 32) {
    for (let i = 0; i < enemies.length; i++) {
      player.handleTarget(enemies[i]);
    }
  }
}

//mousePressed()
//
//
//Checks for mouse clicks. Used here as rudimentary "mobile friendly" option
function mousePressed() {
  player.x = mouseX;
  player.y = mouseY;
  for (let i = 0; i < enemies.length; i++) {
    player.handleTarget(enemies[i]);
  }
}

function timer(){

}
