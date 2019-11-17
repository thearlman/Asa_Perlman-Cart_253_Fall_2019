//~~~~~~gameState control variable; or "state machine?"~~~~~~~//
// Is set to the appropriate string based on the
// current state of the game. Should be set to one of the following:
// intro1, intro2, playing, gameWon, gameOver
let gameState = "intro1";

//~~~~Variables for the transition screens~~~~//

let introScreen1;
let introScreen2;
let gameOverScreen;
let gameWonScreen;


//~~~~~~Variables for the game's actors~~~~~~//

//*the player*
let player;
//*the phazer objects*
let phazers = [];
//*the enemies (to be stored in this array)**
let enemies = [];
//* +their respective images*
let enemyImage = [];
//*The planet object*
let planetAmazon;

//~~~~~~~Image variables~~~~~~~~~~~//

let intro1BgImg;
let intro2BgImg;
let gameOverBgImg;
let gameWonBgImg;
let backgroundImage;
let crosshairs;
let cockpit;
let planetAmazonImg;

//~~~~~~~~Sound variables~~~~~~~~~~~//

let ambience;
let siren;
let laserBlast;
let lowCharge;
let firstHit;
let secondHit;
let crash;
let laserCharging;
let gameWonSong;
let gameOverBells;

//~~~~~~~~TIMING VARIABLES~~~~~~~~~~//

//**Variable  assigned to the setInterval function (controlling game timer)
let gameTimer;
//**variables to set the amount of time until planet has been reached
let gameTime = 30;
let secondsToArrival = gameTime;
//**variable for seconds passed, to control frequency of enemy spawn
let secondsPassed = 0;
//**variable for the spawn timer
let spawnTimer;
//number of milliseconds between enemy Spawns
let spawnInterval = 4000;
let newSpawnInterval = spawnInterval;



//==============//
//preload()
//
// Preloads the various images and sounds for the game
function preload() {
  //images
  intro1BgImg = loadImage('assets/images/borderPt1.jpg');
  intro2BgImg = loadImage('assets/images/borderPt2.jpg');
  gameOverBgImg = loadImage('assets/images/gameOverImg.jpg');
  gameWonBgImg = loadImage('assets/images/gameWonImg.jpg');
  backgroundImage = loadImage('assets/images/backgroundImg.jpg');
  planetAmazonImg = loadImage('assets/images/planetAmazon.png');
  crosshairs = loadImage('assets/images/crosshairs.png');
  cockpit = loadImage('assets/images/cockpit.png');
  enemyImage[0] = loadImage('assets/images/drone0Damage.png');
  enemyImage[1] = loadImage('assets/images/drone1Damage.png');

  //sounds
  ambience = loadSound('assets/sounds/ambience.mp3');
  ambience.playMode('untilDone');

  siren = loadSound('assets/sounds/siren.mp3');
  siren.setVolume(.1);

  lowCharge = loadSound('assets/sounds/lowCharge.mp3');
  lowCharge.setVolume(.2);

  laserCharging = loadSound('assets/sounds/laserCharging.mp3');
  laserCharging.setVolume(2);

  laserBlast = loadSound('assets/sounds/laserBlast.wav');
  laserBlast.setVolume(.2);

  firstHit = loadSound('assets/sounds/firstHit.wav');
  firstHit.setVolume(.7);

  secondHit = loadSound('assets/sounds/secondHit.wav');
  secondHit.setVolume(.4);

  crash = loadSound('assets/sounds/crash.wav');

  gameWonSong = loadSound('assets/sounds/gameWonSong.mp3');

  let gameOverBells = loadSound('assets/sounds/gameOverBells.mp3');
}



//==============//
// setup()
//=============//
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
    height - height * 15 / 100, width * 10 / 100, height * 8 / 100);
  introScreen2 = new ScreenIntro2(intro2BgImg, width / 2 + 12,
    height - height * 15 / 100, width * 10 / 100, height * 8 / 100);
  //create game over screen
  gameOverScreen = new ScreenGameOver(gameOverBgImg, width / 2 + 12,
    height - height * 15 / 100, width * 10 / 100, height * 8 / 100);
  gameWonScreen = new ScreenGameWon(gameWonBgImg, width / 2 + 20,
    height - height * 15 / 100, width * 10 / 100, height * 8 / 100);
  //create the player
  player = new Player(crosshairs, cockpit, width / 2, height / 2, 1.5 * height / 100,
    color(200, 200, 0), 50);
  //create the target planet object
  planetAmazon = new PlanetAmazon(planetAmazonImg, width / 2, 0,
    height * .03 / 100, 10, height * .05 / 100, 120);
}


//==============//
// draw()
//=============//
//
function draw() {
  //~~~ intro 1 ~~~//
  if (gameState === "intro1") {
    introScreen1.display();
    //~~~ intro 2 ~~~//
  } else if (gameState === "intro2") {
    introScreen2.display();
    //~~~ playing ~~~//
  } else if (gameState === "playing") {
    ambience.play();
    //display th ebackground image
    background(backgroundImage);
    //display the destination planet
    planetAmazon.display();
    //display the enemies
    displayEnemies();
    // Handle directional input for the player (shooting is handled in mousePressed)
    player.handleInput();
    // Handle movment of the player
    player.move();
    // display the phazers, and check for collision with enemies
    handlePhazers();
    //detects if player has collided with enemy
    player.detectCollision();
    //displays the players crosshairs, and the ship
    player.display();
    //~~~ game Over ~~~//
  } else if (gameState === "gameOver") {
    gameOverScreen.display();
    //remove any stray enemies
    for (let e = 0; e < enemies.length; e++) {
      enemies.splice(e, 1);
      console.log(enemies.length);
    }
  }
  //~~~ game won ~~~//
  else if (gameState === "gameWon") {
    gameWonScreen.display()
    //remove any stray enemies
    for (let e = 0; e < enemies.length; e++) {
      enemies.splice(e, 1);
      console.log(enemies.length);
    }
  }
}





//==============//
//displayEnemies()
//=============//
//
//
// Handle movement, health, collision detection and displaying of enemies
function displayEnemies() {
  //we iterate through the array ,
  for (let e = 0; e < enemies.length; e++) {
    enemies[e].move();
    enemies[e].display();
  }
}

//==============//
//handePhazers()
//=============//
//
//displays phazer objects and checks for collisions with enemies
function handlePhazers() {
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
        //break out of the for loop so that we can look through the array(s) again post re indexing
        break;
      }
    }
  }
}


//==============//
//gameTimer
//=============//
//
//resets game timer
function resetGameTimer() {
  clearInterval(gameTimer);
  gameTimer = setInterval(timeToArival, 1000);
}

//==============//
//timeToPlanet()
//=============//
//
//reduces the number of seconds until the player has reached the planet and won.
//checks for ^^this^^ to be true and changes gameState accordingly
// also keeps track of time passed, increasing frequency enemies are spawned as the game progresses
function timeToArival() {
  secondsToArrival -= 1;
  secondsPassed++
  if (secondsToArrival === 0) {
    gameState = "gameWon";
    resetGame();
  } else if (secondsPassed === 30) {
    newSpawnInterval -= 1000;
    enemyTimer(newSpawnInterval);
    secondsPassed = 0;

  }
}

//==============//
//enemyTimer()
//=============//
//
//resets the spawn timer interval on call with argument provided
function enemyTimer(interval) {
  clearInterval(spawnTimer);
  spawnTimer = setInterval(spawnNewEnemy, interval);
}

//==============//
//spawnNewEnemy()
//=============//
//
//Spawns a new enemy, by creating a new enemy object, and pushing it to the enemies[] array
function spawnNewEnemy() {
  let newEnemy = new Enemy(random(0, width), random(0, cockpitVerticalMask), width * .25 / 100, 1);
  //put the new enemy at the beginning of the array(unshift), so it will be displayed behind oldest enemies
  enemies.unshift(newEnemy);
}

//==============//
//keyPressed()
//=============//
//
// Checks for keyboard events calls appropriate functions
function keyPressed() {
  //if the spacebar is pressed (while the game is in play) call the players phazerire function
  if (keyCode === 32 && gameState === "playing") {
    player.firePhazer();
  }
}

//==============//
// mousePressed()
//=============//
//
// Detects mouse press events, and calls appropriate functions
function mousePressed() {
  introScreen1.mousePressed();
  introScreen2.mousePressed();
  gameWonScreen.mousePressed();
  gameOverScreen.mousePressed();
}


//==============//
//resetGame()
//=============//
//
//switched off spawn timer, resets spawn interval
//resets player's shield health
//resets planet's size
//switches off the game timer, and resets the number of seconds
//erases any remaning enemies
function resetGame() {
  clearInterval(spawnTimer);
  newSpawnInterval = spawnInterval;
  clearInterval(gameTimer);
  secondsToArrival = gameTime;
  secondsPassed = 0;
  player.shieldHealth = player.maxShieldHealth;
  planetAmazon.reset();
}
