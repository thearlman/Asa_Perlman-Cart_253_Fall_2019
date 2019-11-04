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
//1. based on enemies killed
let killCount = 0;
//2. based on time played
let spawnTimer;

// Arrays to hold the enemy objects
let enemies = [];
//variables to hold enemy images
let enemyImg;
let enemyDamagedImg;

//array to hold the phazer objects
let phazer = [];

let laserBlast;
let firstHit;
let secondHit;
let gameOverCrash;

//Variables to hold the various static game graphics (background, screens etc)
let cockpit;
let backgroundImg;
let startScreenPart1Img;

//Variables for the planet Amazon, and it's image
let targetPlanet;
let planetAmazonImg;

//variable to store the part of the screen obstructed by cockpit
let cockpitMask;

//Booleans to control the status of the game (started/ game over)
let gameOver = false;
let phase1 = true;
let phase2 = false;

//preload()
//
//
//
// Preloads the various images and sounds for the game
function preload() {
  cockpit = loadImage('assets/images/cockpit.png');
  planetAmazonImg = loadImage('assets/images/planetAmazon.png');
  backgroundImg = loadImage('assets/images/backgroundImg.jpg');
  playerCrosshairs = loadImage('assets/images/crosshairs.png');
  enemyImg = loadImage('assets/images/amazonDrone.png');
  enemyDamagedImg = loadImage('assets/images/amazonDroneBroken.png')
  borderPt1 = loadImage('assets/images/borderPt1.jpg');
  borderPt2 = loadImage('assets/images/borderPt2.jpg');

  laserBlast = loadSound('assets/sounds/laserBlast.wav');
  firstHit = loadSound('assets/sounds/firstHit.wav');
  secondHit = loadSound('assets/sounds/secondHit.wav');
  gameOverCrash = loadSound('assets/sounds/gameOverCrash.wav')
}

// setup()
//
// Sets up a canvas
// Creates player and enemy objects, planet object, color mode, + some other wonders
function setup() {
  //create canvas at width and height of window
  createCanvas(windowWidth, windowHeight);
  //Setting the Color mode of the program to HSB (hugh, sturation, brightness)
  //setting to 360, means the first value (the hugh) should be visualized as a color wheel (360 degrees)
  colorMode(HSB, 360);
  //define the vertical area of screen we want to mask as 75%
  cockpitVerticalMask = height * 75 / 100;
  //initiate the two welcome screen Classes stored in WelcomeScreens.js
  phase1Screen = new WelcomeScreen1(borderPt1, width / 2+12, height-height*15/100, width*10/100, height*8/100);
  phase2Screen = new WelcomeScreen2(borderPt2, width / 2+12, height-height*15/100, width*10/100, height*8/100);
  //create the player
  player = new Player(100, 100, 10, color(200, 200, 0), 50, playerCrosshairs);
  //create the Amazon planet
  //(img, x, y, vy, size, growSpeed)
  targetPlanet = new PlanetAmazon(planetAmazonImg, width / 2, 0, height*.002/100, 10, height*.005/100);
  //create first enemy
  // for (let i = 0; i < 1; i++) {
  //   enemies[i] = new Enemy(enemyImg, random(0, width), random(0, cockpitMask), 5, 1);
  // }
  //Set interval between new enemy spawns
  let spawnTimer = setInterval(spawnNewEnemy, 10000);
}

// draw()
//
//
// Handles input, movement, health, and displaying for the system's objects
function draw() {
//when the program is initiated, show the first welcome screen
  if(! gameOver && phase1 === true){
    phase1Screen.display();
  }  else if (!gameOver && phase2 === true) {
    phase2Screen.display();
  } else if (!gameOver && phase2 === false){

    //let showInstructions = setTimeout(welcomeScreen.displayInstructions, 2000);

    //not sure if this is doing anything, but should be activating the
    //spawn timer
    //vvvvvvv
    spawnTimer;

    // Display the background as a starry night
    background(backgroundImg);
    // Handle input for the player
    player.handleInput();
    // Handle movment of the player
    player.move();
    //display the amazon planet
    targetPlanet.display();

    // Handle movement, health, collision detection and displaying of enemies
    //we iterate through the array backwards, so that the oldest enemy is displayed on top
    for (let e = enemies.length-1; e > 0; e--) {
      enemies[e].move();
      enemies[e].display();
      enemies[e].updateHealth();
      enemies[e].detectCollision();
    }

    //iterate through all of the phazers and all of the enemies and if they
    //intersect. Also iterating backwards so that if one is removed, the array
    // will re-index properly
    for (let p = phazer.length-1; p >= 0; p--){
      for(let e = enemies.length-1; e >= 0; e--){
        let result = phazer[p].hit(enemies[e]);
        //if this happened, play the crash sound, and add 1 to the enemy's hit count,
        //and change the enemy's image to the damaged version
        if (result && phazer[p].size < enemies[e].size/2){
          enemies[e].hitCount ++;
          enemies[e].img = enemyDamagedImg;
          phazer.splice(p, 1);
          firstHit.play();
          console.log("HIT");
          //if the enemy's hitcount reaches 2, play the explosion sound and
          //remove the enemy from the array
          if (enemies[e].hitCount >= 2){
            secondHit.play();
            enemies.splice(e, 1);
            phazer.splice(p, 1);
            spawnNewEnemy();
          }
          break;
        }
      }
    }

    //display the phazers, and delete them from the array if at zero (ran out
    //of steam) again, we go backwards. see above.
    for (let i = phazer.length-1; i >= 0; i--) {
      phazer[i].display();
      if (phazer[i].size < 0) {
        phazer.splice(i, 1);
      }
    }

    // Display the player's crosshairs
    player.display();
    // Display the cockpit image in front of everything else (so it looks like you're inside)
    image(cockpit, 0, 0, width, height);
    //display the player's health bar
    player.displayHealth();

    if (player.health <= 0){
      gameOver = true;
    }

  }
//~~~~~~~~~~~~~~~~~~~~~~~end of !gameOver~~~~~~~~~~~~~~~~~`
  if (gameOver && !phase1 && !phase2){
    gameOverCrash.setLoop(false);
    gameOverCrash.playMode('untilDone');
    gameOverCrash.play()
  }


}

//~~~~~~~~~~~~~~~~~~~end of draw()~~~~~~~~~~~~~~~~~~~~~~~~~~



//spawnNewEnemy()
//
//
//Spawns a new enemy
function spawnNewEnemy() {
  let newEnemy = new Enemy(enemyImg, random(0, width), random(0, cockpitMask), width*.25/100, 1);
  enemies.push(newEnemy);
  console.log("NEW");
}


//keyPressed()
//
//
// Checks for keyboard events
function keyPressed() {
  //if the spacebar is pressed, put a new phazer object out into the world
  if (keyCode === 32) {
    newPhazer = new Phazers();
    phazer.push(newPhazer);
    laserBlast.play();
  }
}

//mousePressed()
//
//
//Checks for mouse clicks.
function mousePressed() {
  //Used here as rudimentary "mobile friendly" option for firing phazers
  player.x = mouseX;
  player.y = mouseY;
  for (let i = 0; i < enemies.length; i++) {
    player.handleTarget(enemies[i]);
  }
  //used here to check if the buttons in the various welome/ game over screen shave been pressed
  if (phase1Screen.d < phase1Screen.buttonWidth && phase1Screen.d < phase1Screen.buttonHeight) {
    phase1 = false;
    phase2 = true;
  }
  if (phase2Screen.d < phase2Screen.buttonWidth && phase2Screen.d < phase2Screen.buttonHeight) {
    phase2 = false;
  }
}
