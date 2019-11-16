//~~~~~~gameState control variable~~~~~~~//
// will be set to the appropriate string based on the
// current state of the game. Should be set to one of the following:
// intro1, intro2, playing, win, lose
let gameState = "intro1";


//~~~~~~Variables for the game's actors~~~~~~//

//*the player*
let player;
//*the phazer objects*
let phazers = [];
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
let laserBlast;
let lowCharge;
let firstHit;
let secondHit;
let crash;
let laserCharging;

//~~~~~~~~TIMING VARIABLES~~~~~~~~~~//

//**Variable  assigned to the setInterval function (controlling game timer)
let gameTimer;
//**variables to set the amount of time until planet has been reached
let secondsToArrival = 120;
//**variable for seconds passed, to control frequency of enemy spawn
let secondsPassed = 0;
//**variable for the spawn timer
let spawnTimer;
//number of milliseconds between enemy Spawns
let spawnInterval = 5000;


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
  laserBlast = loadSound('assets/sounds/laserBlast.wav');
  firstHit = loadSound('assets/sounds/firstHit.wav');
  secondHit = loadSound('assets/sounds/secondHit.wav');
  lowCharge = loadSound('assets/sounds/lowCharge.mp3');
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
  player = new Player(crosshairs, cockpit, width/2, height/2, 10, color(200, 200, 0), 50);

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
    displayEnemies();
    // Handle directional input for the player (shooting is in mousPressed)
    player.handleInput();
    // Handle movment of the player
    player.move();
    // display the phazers, and check for collion with enemies
    handlePhazers();
    //detects if player has collided with enemy
    player.detectCollision();
    //displays the players crosshairs, and the ship
    player.display();
  } else if (gameState === "lose"){

  }
}



//displayEnemies()
//
//
// Handle movement, health, collision detection and displaying of enemies
function displayEnemies(){
  //we iterate through the array ,
  for (let e = 0; e < enemies.length; e++) {
    enemies[e].move();
    enemies[e].display();
  }
}

//handePhazers()
//
//
//displays phazer objects and checks for collisions with enemies
function handlePhazers(){
  //display the phazers, and delete them from the array if at zero (ran out
  //of steam) Iterating backwards so that if one is removed, the array
  // will re-index properly
  for (let p = phazers.length - 1; p >= 0; p--) {
    phazers[p].display();
    if (phazers[p].size < 0) {
      phazers.splice(p, 1);
    }
  }
//iterate through all of the phazers and all of the enemies to see if they
//intersect. Again, we go backwards. see above.
  for (let p = phazers.length - 1; p >= 0; p--) {
    for (let e = enemies.length - 1; e >= 0; e--) {
      let result = phazers[p].hit(enemies[e]);
      //if the above happened, && the phazer's size is half the size of the eney's (to help with the 3D effect)
      //play the crash sound, and add 1 to the enemy's hit count, and change the enemy's image to the damaged version
      if (result && phazers[p].size < enemies[e].size / 2) {
        enemies[e].hitCount++;
        phazers.splice(p, 1);
        firstHit.play();
        //if the enemy's hitcount reaches 2, play the explosion sound and
        //remove the enemy and the phazer from their respective arrays
        if (enemies[e].hitCount >= 2) {
          secondHit.play();
          enemies.splice(e, 1);
          phazers.splice(p, 1);
        }
        //break out of the for loop so that we can look through it again post re indexing
        break;
      }
    }
  }

}



//~~~~~~~~~TIMED FUNCTIONS~~~~~~~~~~~~//

//gameTimer
//
//resets game timer
function resetGameTimer(){
  clearInterval(gameTimer);
  gameTimer = setInterval(timeToArival, 1000);
}

//timeToPlanet()
//
//reduces the number of seconds until the player has reached the planet and won.
// also keeps track of time passed, increasing number of enemies as the game progresses
function timeToArival() {
  secondsToArrival -= 1;
  secondsPassed ++
  if (secondsPassed === 30){
    spawnInterval -= 1000;
    enemyTimer(spawnInterval);
    secondsPassed = 0;

  }
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
  let newEnemy = new Enemy(random(0, width), random(0, cockpitVerticalMask), width * .25 / 100, 1);
  //put the new enemy at the beginning of the array(unshift), so it will be displayed behind oldest enemies
  enemies.unshift(newEnemy);
}

//keyPressed()
//
//
// Checks for keyboard events calls appropriate functions
function keyPressed() {
  //if the spacebar is pressed (while the game is in play) call the players phazerire function
  if (keyCode === 32 && gameState === "playing") {
    player.firePhazer();
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
