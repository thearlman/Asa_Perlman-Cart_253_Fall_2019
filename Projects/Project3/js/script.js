//~~~~~~gameState control variable~~~~~~~//
// will be set to the appropriate string based on the
// current state of the game. Should be set to one of the following:
// intro1, intro2, playing, win, lose
let gameState = "intro1";


//~~~~~~Variables for the game's actors~~~~~~//
//*the player*
let player;
//*the enemies (to be stored in this array)**
let enemies = [];
//*&their respective images
let enemyImage = [];




//~~~~~~~Image variables~~~~~~~~~~~//

let intro1BgImg;
let intro2BgImg;
let backgroundImage;
let crosshairs;
let cockpit;

//~~~~~~~~Sound variables~~~~~~~~~~~//
let ambience;
let crash;
let laserCharging;

//~~~~~~~~TIMING VARIABLES~~~~~~~~~~//
//**Variable  assigned to the setInterval function (controlling game timer)
let gameTimer;
//**variables to set the amount of time
let secondsToArrival = 120;
//**variable for the spawn timer
let spawnTimer;


//preload()
//
//
//
// Preloads the various images and sounds for the game
function preload() {
  //images
  intro1BgImg = loadImage('assets/images/borderPt1.jpg');
  intro2BgImg = loadImage('assets/images/borderPt2.jpg');
  backgroundImage = loadImage('assets/images/backgroundImg.jpg');
  crosshairs = loadImage('assets/images/crosshairs.png');
  cockpit = loadImage('assets/images/cockpit.png');
  enemyImage[0] = loadImage('assets/images/drone0Damage.png');
  enemyImage[1] = loadImage('assets/images/drone1Damage.png');


  //sounds
  ambience = loadSound('assets/sounds/ambience.mp3');
  laserCharging = loadSound('assets/sounds/laserCharging.mp3');
  crash = loadSound('assets/sounds/crash.wav');

}



// setup()
//
// Sets up a canvas
// Creates player and enemy objects, planet object, sets color mode
function setup() {
  //make things fullscreen
  createCanvas(windowWidth, windowHeight);
  //define the vertical area of screen we want to mask as 50%
  cockpitVerticalMask = height * 50 / 100;
  //sets color mode to hsb(HUGH, SATURATION, BRIGHTNESS)
  colorMode(HSB, 360);
  //create the two intro screens
  introScreen1 = new ScreenIntro1(intro1BgImg, width / 2 + 12,
    height - height * 15 / 100,
    width * 10 / 100, height * 8 / 100)
  introScreen2 = new ScreenIntro2(intro2BgImg, width / 2 + 12,
    height - height * 15 / 100,
    width * 10 / 100, height * 8 / 100)
  //create the player
  player = new Player(crosshairs, cockpit, 100, 100, 10, color(200, 200, 0), 50);

}


// draw()
//
//
//
function draw() {

  if (gameState === "intro1") {
    introScreen1.display();
  } else if (gameState === "intro2") {
    introScreen2.display();
  } else if (gameState === "playing") {
    background(backgroundImage);
    //display the enemies
    handleEnemies();
    // Handle input for the player
    player.handleInput();
    // Handle movment of the player
    player.move();
    //detects if player has collided with enemy
    player.detectCollision();
    //displays the players crosshairs, and the ship
    player.display();
  }
}


//enemyTimer()
//
//resets the spawn timer interval on call with argument provided
function enemyTimer(interval){
  clearInterval(spawnTimer);
  spawnTimer = setInterval(spawnNewEnemy, interval);
}

//~~~~~~~~~TIMED FUNCTIONS~~~~~~~~~~~~//


//gameTimer
//
//
function resetGameTimer(){
  clearInterval(gameTimer);
  gameTimer = setInterval(timeToArival, 1000);
}

//timeToPlanet()
//
//function which reduces the number of seconds until the player has reached the planet and won.
//this function is triggered by the setInterval() function.
function timeToArival() {
  secondsToArrival -= 1;
}

//enemyTimer()
//
//resets the spawn timer interval on call with argument provided
function enemyTimer(interval){
  clearInterval(spawnTimer);
  spawnTimer = setInterval(spawnNewEnemy, interval);
}

//spawnNewEnemy()
//
//Spawns a new enemy, by creating a new enemy object, and pushing it to the enemies[] array
function spawnNewEnemy() {
  let newEnemy = new Enemy(enemyImage[0], random(0, width), random(0, cockpitVerticalMask), width * .25 / 100, 1);
  //put the new enemy at the beginning of the array(unshift), so it will be displayed behind oldest enemies
  enemies.unshift(newEnemy);
}


//handleEnemies()
//
//
// Handle movement, health, collision detection and displaying of enemies
function handleEnemies(){
  //we iterate through the array ,
  for (let e = 0; e < enemies.length; e++) {
    enemies[e].move();
    enemies[e].display();
  }

}


// mousePressed()
//
//
// Detects mouse press events, and calls appropriate functions
function mousePressed() {
  introScreen1.mousePressed();
  introScreen2.mousePressed();
}


// keyPressed()
//
//
// Detects key presses, calls appropriate functions
function keypressed() {

}
