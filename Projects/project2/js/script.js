// Trash Orgin: Journey to the Planet Amazon
// by Asa Perlman. Template  by: Pippin Barr
// (special; thanks to Daniel Shiffman's youtube tuts)
//
// Images created by Asa Perlman and Gabriel Dupras
// All sound effects used under Creative Commons license
// Winning song: Fly Me To The Moon (8-bit Cover) by Jump Ship:
// https://jumpshipmusic.bandcamp.com/track/fly-me-to-the-moon-8-bit-cover
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Having escaped the -earth on fire- you are confronted by the Amaberg Gates.
// You must fight to escape Bezos' evil space regieme... But is there anything out there
// left to find??
//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//
// Variables for the player, and the players image (crosshairs)
let player;
let playerCrosshairs;

//counter to trigger new enemy spawn
let spawnTimer;

// Arrays to hold the enemy objects
let enemies = [];

//variables to hold enemy images
let enemyImg;
let enemyDamagedImg;

//array to hold the phazer objects
let phazer = [];

//sound effect varibles
let introAmbience;
let gameSong;
let siren;
let laserBlast;
let firstHit;
let secondHit;
let lowCharge;
let laserCharging;
let crash;
let loserBells;

let phase1Screen;
let phase2Screen;
let gameOverScreen;

//Variables to hold the various static game graphics (background, screens etc)
let cockpit;
let backgroundImg;
let borderPt1;
let borderPt2;
let gameOverImg;
let winningImage;

//Variables for the planet Amazon, and it's image
let targetPlanet;
let planetAmazonImg;

//variable to store the part of the screen obstructed by cockpit
let cockpitVerticalMask;

//Booleans to control the status of the game (started/ game over)
let phase1 = true;
let phase2 = false;
let gameOver = false;
let gameWon = false


//counter to determine arrival time to planet
let arrivalTime;
//variables to set the amount of time
let secondsToArrival = 120;
let secondsRemaining = secondsToArrival;

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
  enemyDamagedImg = loadImage('assets/images/amazonDroneBroken.png');
  borderPt1 = loadImage('assets/images/borderPt1.jpg');
  borderPt2 = loadImage('assets/images/borderPt2.jpg');
  gameOverImg = loadImage('assets/images/gameOverImg.jpg');
  winningImage = loadImage('assets/images/planetAmazonScreen.jpg');

  introAmbience = loadSound('assets/sounds/introAmbience.mp3');
  gameSong = loadSound('assets/sounds/gameSong.mp3')
  siren = loadSound('assets/sounds/siren.mp3');
  laserBlast = loadSound('assets/sounds/laserBlast.wav');
  firstHit = loadSound('assets/sounds/firstHit.wav');
  secondHit = loadSound('assets/sounds/secondHit.wav');
  lowCharge = loadSound('assets/sounds/lowCharge.mp3');
  laserCharging = loadSound('assets/sounds/laserCharging.mp3');
  crash = loadSound('assets/sounds/crash.wav');
  loserBells = loadSound('assets/sounds/loserBells.mp3')
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
  //define the vertical area of screen we want to mask as 50%
  cockpitVerticalMask = height * 50 / 100;
  //create the two welcome screens, and one game over screen (Classes stored in TransitionScreens.js)
  phase1Screen = new WelcomeScreen1(borderPt1, width / 2+12, height-height*15/100, width*10/100, height*8/100);
  phase2Screen = new WelcomeScreen2(borderPt2, width / 2+12, height-height*15/100, width*10/100, height*8/100);
  gameOverScreen = new GameOverScreen(gameOverImg, width/2+12, height-height*15/100, width*10/100, height*8/100);
  winningScreen = new WinningScreen(winningImage, width/2, height-height*15/100, width*10/100, height*8/100);

  //create the player
  player = new Player(100, 100, 10, color(200, 200, 0), 50, playerCrosshairs);

  //create the Amazon planet
  targetPlanet = new PlanetAmazon(planetAmazonImg, width / 2, 0, height*.03/100, 10, height*.05/100, 120);

}

// draw()
//
//
// Handles input, movement, health, and displaying for the system's objects
function draw() {
//when the program is initiated, show the first welcome screen
  if(! gameOver && phase1){
    phase1Screen.display();
  }  else if (!gameOver && phase2 && !phase1) {
    phase2Screen.display();
  } else if (!gameOver && !phase2){

    //play the ambient cockpit sound on a loop
    //stop the siren sound
    siren.stop();
    introAmbience.playMode('untilDone');
    introAmbience.play();
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
    for (let e = enemies.length-1; e >= 0; e--) {
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
        //if this happened, and the phazer's size is half the size of the eney's (to help with the 3D effect)
        //play the crash sound, and add 1 to the enemy's hit count, and change the enemy's image to the damaged version
        if (result && phazer[p].size < enemies[e].size/2){
          enemies[e].hitCount ++;
          enemies[e].img = enemyDamagedImg;
          phazer.splice(p, 1);
          firstHit.play();
        //  console.log("HIT");
          //if the enemy's hitcount reaches 2, play the explosion sound and
          //remove the enemy and the phazer from their respective arrays
          if (enemies[e].hitCount >= 2){
            secondHit.play();
            enemies.splice(e, 1);
            phazer.splice(p, 1);          }
          break;
        }
      }
    }

    //display the phazers, and delete them from the array if at zero (ran out
    //of steam) again, we go backwards. see above.
    for (let p = phazer.length-1; p >= 0; p--) {
      phazer[p].display();
      if (phazer[p].size < 0) {
        phazer.splice(p, 1);
      }
    }

    // Display the player's crosshairs
    player.display();
    // Display the cockpit image in front of everything else (so it looks like you're inside)
    image(cockpit, 0, 0, width, height);
    //display the player's health bar
    player.displayHealth();
    //display the player's phazer charge level
    player.displayCharge();

    if (player.health <= 0){
      gameOver = true;
    }
    if (secondsRemaining <= 0){
      gameWon = true;
      gameOver = true;
    }
  }
//~~~~~~~~~~~~~~~~~~~~~~~end of !gameOver~~~~~~~~~~~~~~~~~

  // If the game is over, and the player has lost, play sad bell sounds, and display the game Over Screen
  //reset all pertenent variables and timers
  if (gameOver && !phase1 && !phase2 && !gameWon){
    loserBells.playMode('untilDone');
    loserBells.play();
    gameOverScreen.display();
    clearInterval(spawnTimer);
    clearInterval(arrivalTime);
    //iterate through the enemies and remove them
    for (let e = 0; e < enemies.length; e++){
      enemies.splice(e, 1);
    }
    //reset planetAmazon's size
    targetPlanet.reset();
  }
  // If the game is over, and the player has won, play a happy 8 bit version of fly me to the moon,
  //and display the game won Screen.
  //reset all pertenent variables and timers
  if (gameOver && !phase1 && !phase2 && gameWon){
    winningScreen.display();
    gameSong.playMode('untilDone');
    gameSong.play();
    clearInterval(spawnTimer);
    clearInterval(arrivalTime);
    //iterate through the enemies and remove them
    for (let e = 0; e < enemies.length; e++){
      enemies.splice(e, 1);
    }
    //reset planetAmazon's size
    targetPlanet.reset();
  }

}

//~~~~~~~~~~~~~~~~~~~end of draw()~~~~~~~~~~~~~~~~~~~~~~~~~~//


//spawnNewEnemy()
//
//
//Spawns a new enemy
function spawnNewEnemy() {
  let newEnemy = new Enemy(enemyImg, random(0, width), random(0, cockpitVerticalMask), width*.25/100, 1);
  enemies.push(newEnemy);
}


//keyPressed()
//
//
// Checks for keyboard events
function keyPressed() {
  //if the spacebar is pressed, put a new phazer object out into the world, and play the
  //laser blasting sound
  if (keyCode === 32 && !phase1 && !phase2  && !gameOver && !player.chargeEmpty) {
    newPhazer = new Phazers();
    player.updateCharge();
    phazer.push(newPhazer);
    laserBlast.play();
  }
  //if the player tries to fire the phaser while charge is empty, play the empty battery sound
  else if (keyCode === 32 && !phase1 && !phase2  && !gameOver && player.chargeEmpty) {
    lowCharge.playMode('untilDone');
    lowCharge.play();
  }
}

//mousePressed()
//
//
//Checks for mouse clicks.
function mousePressed(){
  //used here to check if the buttons in the various welcome/ game over screens have been pressed.
  //Requires that the booleans line up(phase 1 is finished phase two is finished, etc.)
    //for first welcome screen: the border
  if (phase1Screen.d < phase1Screen.buttonWidth && phase1Screen.d < phase1Screen.buttonHeight) {
    phase1 = false;
    phase2 = true;
  }
    //for second welocme screen: the escape
  if (phase2Screen.d < phase2Screen.buttonWidth && phase2Screen.d < phase2Screen.buttonHeight && phase2 && !gameWon && !gameOver) {
     spawnTimer = setInterval(spawnNewEnemy, 5000);
     arrivalTime = setInterval(timeToPlanet, 1000);
     phase2 = false;
  }
  //for gameOver screen
  if (gameOverScreen.d < gameOverScreen.buttonWidth && gameOverScreen.d < gameOverScreen.buttonHeight && gameOver && !gameWon){
    //reset players health and charge
    player.health = player.maxHealth;
    player.charge = player.maxCharge;
    secondsRemaining = secondsToArrival;
    loserBells.stop();
    phase2 = true;
    gameOver = false;
  }

  //for gameWon screen
  if (winningScreen.d < winningScreen.buttonWidth && winningScreen.d < winningScreen.buttonHeight && gameOver && gameWon){
    //reset players health and charge
    player.health = player.maxHealth;
    player.charge = player.maxCharge;
    secondsRemaining = secondsToArrival;
    gameSong.stop();
    phase2 = true;
    gameOver = false;
    gameWon = false;
  }


}


//timeToPlanet()
//
//
//function which reduces the number of seconds until the player has reached the planet and won
//triggered by the setInterval function.
function timeToPlanet(){
secondsRemaining -= 1;
console.log(secondsRemaining);
}


// I found this in a forum, it said it would get the audio to start more reliably on  first load....
//I think it works?
function mouseMoved(){
  getAudioContext().resume()
}
