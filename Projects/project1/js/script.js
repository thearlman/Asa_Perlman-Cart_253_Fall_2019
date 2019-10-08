"use strict";

/******************************************************

Game - Chaser
Pippin Barr/ Asa Perlman

A game of cat and mouse themed in the ocean. The player is a trash can, and can be moved with keys,
if they overlap the (randomly floating) pieces of trash, they "eat them". The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/
// Track whether the game is over
let gameOver = false;

//Player IMAGE
let playerImage;
// Player position, size, velocity
let playerX;
let playerY;
let playerSize = 100;
let playerVX = 0;
let playerVY = 0;
let playerNormalSpeed = 2;
let playerMaxSpeed = 10;
// Player health
let playerHealth;
let playerMaxHealth = 255;

//player stamina
let playerStamina;
let playerMaxStamina = 255;

 //number of player lives
let playerLives = 3;

//Array holding all of the prey images
let preyImages = [];
//Variable containing the array size to make it easay to change is in many
//different parts of the code at the same time (must be one larger than the size of the array)
let preyArraySize = 3;
//Variable to assign current prey
let currentPrey;


// Prey position, size, velocity

let preyX;
let preyY;
let preySize = 50;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
let preyTX = 0;
let preyTY = 100;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

//counter to keep track of when to change level
let levelUp = 0;
//current level
let level = 0;

//Icon for reset button
let resetImage;

//the colors for the life, health, and stamina indicators
let livesColor = 120;
let staminaColor = 120;
let healthColor = 120;

//variables for the sound effects
let bubbles;
let tickTock;
let fogHorn;
let waves;

function preload() {
  //Load image of the player
  playerImage = loadImage("assets/images/trash.png");
  //Load and all of the prey, into an array!
  preyImages[0] = loadImage("assets/images/prey0.png");
  preyImages[1] = loadImage("assets/images/prey1.png");
  preyImages[2] = loadImage("assets/images/prey2.png");
  //Declare the trashcan image as another variable, for use as a reset button
  //in game over screen.
  resetImage = loadImage("assets/images/trash.png");
  //Load all sound effects
  bubbles = loadSound("assets/sounds/bubbles.wav");
  tickTock = loadSound("assets/sounds/tickTock.wav");
  tickTock.playMode("untilDone");
  fogHorn = loadSound("assets/sounds/fogHorn.wav");
  waves = loadSound("assets/sounds/waves.mp3");
  waves.playMode("untildone");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  // We're using simple functions to separate code out
  setupPrey();
  currentPrey = 0;
  setupPlayer();
  //change the font to courrier
  textFont("Courier");
  //Setting the Color mode of the program to HSB (hugh, sturation, brightness)
  //setting to 360, means the first value (the hugh) should be visualized as a color wheel
  colorMode(HSB,360,100);
}


// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
  playerStamina = playerMaxStamina;
}

// draw()
//
// While the game is active, checks input,
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// checks stamina (sprinting)
// displays the two agents,
// displays health leve,
// displays stamina level,
// displays number of lives,
// When the game is over, shows the gameOver screen.
function draw(){
  console.log(level);
  background(200, 255, 100);
  if (!gameOver) {
    push();
    fill(0,0,100);
    noStroke();
    rect(0,height-70,width,height);
    pop();

    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    drawPlayerLives()

    updateStamina();
    checkEating();
    //here we are sending the current prey from the array (heh heh heh)
    //to the drawPrey() function
    drawStamina();
    drawHealth();
    drawLevel();
    drawPrey(preyImages[currentPrey]);
    drawPlayer();

    //check to see what level the player is on.
    gameLevelCheck();


  } else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerNormalSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerNormalSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerNormalSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerNormalSpeed;
  } else {
    playerVY = 0;
  }
  //Check to see if shift is held down, and increase player speed to sprint
  if (keyIsDown(SHIFT)) {
    playerNormalSpeed = playerMaxSpeed;
    playerStamina += -2;
  } else {
    playerNormalSpeed = 2;
    playerStamina = playerStamina;
  }
}

//Reduce stamina level if player is sprinting
function updateStamina(){
  // increase player stamina
  playerStamina +=  width/3000;
  // Constrain the result to a sensible range
  playerStamina = constrain(playerStamina, 0, playerMaxStamina);
  //if the players stamina level drops below 5, reduce
  //player's max speed to 2, return to 4 after stamina regenerates.
  if (playerStamina < 5){
    playerMaxSpeed = 2;
  } else{
    playerMaxSpeed = 4;
  }
}
//Draw the stamina health bar
function drawStamina(){
  fill(staminaColor, 255, 100);
  noStroke();
  textAlign(LEFT);
  textSize(32);
  text("STAMINA", 80, height-20);
  rect(0,height,50, -playerStamina);
  //if player health is getting low, turn health bar red
  if (playerStamina < playerMaxStamina/3){
    staminaColor = 0;
  } else{
    staminaColor = 120;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health based on width of the display
  playerHealth = playerHealth - width/3000;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, update how many lives the player has left
    playerHealth = playerMaxHealth;
    updatePlayerLives();
  }
}
//Each time the health drops to zero, remove one of the player's lives
function updatePlayerLives(){
  playerLives = playerLives  -1;
  fogHorn.play();
  drawPlayerLives()
  //if the player has no more lives, make gameOver true
  if (playerLives < 0){
    gameOver = true;
  }
}

//draws the player lives using mini versions of the trash can
function drawPlayerLives(){
  imageMode(CENTER);
  noStroke();
  fill(livesColor, 255, 100);
  textSize(32);
  textAlign(RIGHT);
  text("LIVES", width/2-100, height-20);
  let livesX = width/2-70;
  for (let i=0; i < playerLives; i++){
    image(playerImage, livesX, height - 30, 25,25);
    livesX = livesX + 50;
  }
  if (playerLives < 1){
    livesColor = 0;
  } else{
    livesColor = 120;
  }
}

function drawHealth(){
  push()
  fill(healthColor, 255, 100);
  noStroke();
  textSize(32);
  textAlign(RIGHT);
  text("HEALTH", width-80, height -20)
  rect(width-50,height,width-50, -playerHealth);
  if (playerHealth < playerMaxHealth/3){
    healthColor = 0;
    tickTock.play();
  } else{
    healthColor = 120;
    tickTock.stop();
  }
  pop();
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerSize + preySize - 100) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);


    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      //play the bubble trash eating sound
      bubbles.play();
      //change the current prey to the next in the array
      currentPrey +=1;
      levelUp +=1;
      //if we gave eaten all the prey in the array, start the cycle again
      if (currentPrey >= preyArraySize){
        currentPrey = 0;
      }

    }
  }
}

function gameLevelCheck(){
  if (levelUp === 10){
    level += 1;
    preyMaxSpeed +=1;
    levelUp = 0;
  }
}

function drawLevel(){
  noStroke();
  fill(120, 255, 100);
  textSize(32);
  textAlign(LEFT);
  text("Level: " + level, width/2+80, height-20);
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
    // Use map() to convert from the 0-1 range of the noise() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyTX += .01;
    preyTY += .01;

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the trash as the current image assigned from the variable
function drawPrey(img){
  image(img, preyX, preyY, preySize, preySize);
}

// drawPlayer()
//
// Draw the player as a trash can, display number of pieces of trash collected below player.
function drawPlayer() {
  image(playerImage, playerX, playerY, playerSize, playerSize);
  push();
  noStroke();
  fill(0,0,0);
  textAlign(CENTER,CENTER);
  textSize(14);
  text(preyEaten, playerX, playerY+60);
  pop();
}

// showGameOver()
//
// Display text about the game being over!

function showGameOver() {
  //play soothing wave sounds to ease the pain of losing
  waves.play();
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "you picked up " + preyEaten + " pieces of trash\n";
  gameOverText = gameOverText + "before you died.\n Click To The Can Play Again"
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
  //location of the reset icon
  let resetX = width/2;
  let resetY = height/2+150;
  imageMode(CENTER);
  //draw reset icon
  image(resetImage, resetX, resetY, 100,100);
  //if mouse is over reset icon, change it to one of the prey, inticing the player to click........
  if (dist(resetX, resetY, mouseX, mouseY) < 50){
    resetImage = preyImages[1];
    //if mouse is presased while hovering over button, stop the wave sounds, reset health, lives, and level counter,
     //and start game again
    if (mouseIsPressed){
      waves.stop();
      playerHealth = playerMaxHealth;
      playerStamina = playerMaxStamina;
      level = 0;
      levelUp = 0;
      playerLives = 3;
      gameOver = false;
    }
  } else{
    resetImage = playerImage;
  }
}
