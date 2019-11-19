//~~~~~~gameState control variables; or "state machines?"~~~~~~~//
// Is set to the appropriate string based on the
// current state of the game. Should be set to one of the following:
// intro1, intro2, playing, gameWon, gameOver
let gameState = "intro1";
  //**controls the current state of the boss battle stage, which
  //  occur on top of the playing function will be set to either 1, 2, or 3
  //  depending on how many times the boss has been hit
let bossStage = 0;

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
let planetAmazonImg
let enemyImage = [];
let bossImage = [];
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
let gameClock;
//**variables to set the amount of time until planet has been reached
let gameTime = 60;
let secondsToArrival = gameTime;
//**variable for seconds passed, to control frequency of enemy spawn
let secondsPassed = 0;
//**variable for the spawn timer
let spawnTimer;
//number of milliseconds between enemy Spawns
let spawnInterval = 4000;
let newSpawnInterval = spawnInterval;



//================================//
//           preload()
//================================//
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
  bossImage[0] = loadImage('assets/images/boss0damage.png');
  bossImage[1] = loadImage('assets/images/boss1damage.png');
  bossImage[2] = loadImage('assets/images/boss2damage.png');

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

  gameOverBells = loadSound('assets/sounds/gameOverBells.mp3');
}



//================================//
//          setup()
//================================//
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
  gameWonScreen = new ScreenGameWon(gameWonBgImg, width / 2,
    height - height * 15 / 100, width * 10 / 100, height * 8 / 100);
  //create the player
  player = new Player(crosshairs, cockpit, width / 2, height / 2,
    1.5 * height / 100,color(200, 200, 0), 50);
  //create the target planet object
  planetAmazon = new PlanetAmazon(planetAmazonImg, width / 2, 0,
    10, 120);
}


//================================//
//          draw()
//================================//
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
    //display the background image
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

    // if(bossStage === true){
    //   if(boss.hitCount > bossImage.length){
    //     bossStage = false;
    //     gameState = "gameWon";
    //
    //   }
    // }

    //displays the player's crosshairs, and the ship
    player.display();


    //~~~ game Over ~~~//
  } else if (gameState === "gameOver") {
    //display the game over screen
    gameOverScreen.display();
    //remove any stray enemies
    for (let e = 0; e < enemies.length; e++) {
      enemies.splice(e, 1);
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


//================================//
//       displayEnemies()
//================================//
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

// //================================//
// //       displayBossStage()
// //================================//
// //
// // checks for current boss state and displays accordingly
// function displayBossStage(){
//     boss.move();
//     boss.display();
// }

//================================//
//        handePhazers()
//================================//
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
      let hitResult = phazers[p].hit(enemies[e]);
      //if the above happened, && the phazer's size is half the size of the eney's (to help with the 3D effect)
      //play the crash sound, and add 1 to the enemy's hit count, and change the enemy's image to the damaged version
      if (hitResult && phazers[p].size < enemies[e].size / 2) {
        enemies[e].hitCount++;
        phazers.splice(p, 1);
        firstHit.play();
        //if the enemy's hitcount reaches 2, play the explosion sound and
        //remove the enemy and the phazer from their respective arrays
        if(enemies[e].hitCount >= enemies[e].maxHitcount && enemies[e] instanceof Boss){
          setInterval(gameTimer, 1000);
          planetAmazon.resume();
          enemies.splice(e, 1);
          phazers.splice(p, 1);
          break;
        }else if (enemies[e].hitCount >= enemies[e].maxHitcount) {
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


//================================//
//        startGameTimer()
//================================//
//
//resets game timer
function startGameTimer() {
  clearInterval(gameClock);
  gameClock = setInterval(gameTimer, 1000);
}

//================================//
//        gameTimer()
//================================//
//
//reduces the number of seconds until the player has reached the planet and won.
//checks for ^^this^^ to be true and changes gameState accordingly
// also keeps track of time passed, increasing frequency enemies are spawned as the game progresses
//triggers boos battles periodically.
function gameTimer() {
  secondsToArrival -= 1;
  secondsPassed++

  if (secondsPassed  === 25 * gameTime / 100) {
    newSpawnInterval -= 1000;
    console.log('spawing every '+ newSpawnInterval);
    startEnemyTimer(newSpawnInterval);

  } else if (secondsPassed === 50 * gameTime / 100){
    newSpawnInterval -= 1500;
    console.log('spawing every '+ newSpawnInterval);
    startEnemyTimer(newSpawnInterval)

  } else if (secondsPassed === 75 * gameTime / 100){
    console.log('BOSS BATTLE');
    clearInterval(spawnTimer);
    clearInterval(gameClock);
    planetAmazon.pause();
    spawnNewBoss();
    bossStage = true;

  } else if (secondsToArrival === 0) {
    resetGame();
    gameState = "gameWon";
  }
}

//================================//
//        spawnNewBoss()
//================================//
//
//spawns a new boss, and unshifts it into the enemy array
function spawnNewBoss(){
  let boss = new Boss (random(0, width), random(0, cockpitVerticalMask), width * .25 / 100, 1);
  enemies.unshift(boss);
}

function spawnNewBossBullet(){
  let enemyBullet = new Enemy()
}

//================================//
//        playerShieldRecover()
//================================//
//
//resets the spawn timer interval (which calls spawnNewEnemy())
//on call with argument (number of milliseconds) provided
//set player's shield color to healthy again
function playerShieldRecover(){
  player.shieldColor = player.shieldHealthyColor;
}


//================================//
//        startEnemyTimer()
//================================//
//
//resets the spawn timer interval (which calls spawnNewEnemy())
//on call with argument (number of milliseconds) provided
function startEnemyTimer(interval) {
  clearInterval(spawnTimer);
  spawnTimer = setInterval(spawnNewEnemy, interval);
}

//================================//
//       spawnNewEnemy()
//================================//
//
//Spawns a new enemy, by creating a new enemy object, and pushing it to the enemies[] array
function spawnNewEnemy() {
  let newEnemy = new Enemy(random(0, width), random(0, cockpitVerticalMask), width * .25 / 100, 1);
  //put the new enemy at the beginning of the array(unshift), so it will be displayed behind oldest enemies
  enemies.unshift(newEnemy);
}

//================================//
//        keyPressed()
//================================//
////switched off spawn timer, resets spawn interval
//resets player's shield health
//resets planet's size
//switches off the game timer, and resets the number of seconds
// Checks for keyboard events calls appropriate functions
function keyPressed() {
  //if the spacebar is pressed (while the game is in play) call the players phazerire function
  if (keyCode === 32 && gameState === "playing") {
    player.firePhazer();
  }
}

//================================//
//        mousePressed()
//================================//
//
// Detects mouse press events, and calls appropriate functions
function mousePressed() {
  introScreen1.mousePressed();
  introScreen2.mousePressed();
  gameWonScreen.mousePressed();
  gameOverScreen.mousePressed();
}


//================================//
//          resetGame()
//================================//
//
//switched off spawn timer, resets spawn interval
//resets player's shield health
//resets planet's size
//switches off the game timer, and resets the number of seconds
function resetGame() {
  clearInterval(spawnTimer);
  newSpawnInterval = spawnInterval;
  clearInterval(gameClock);
  secondsToArrival = gameTime;
  secondsPassed = 0;
  bossStage = 0;
  player.shieldHealth = player.maxShieldHealth;
  planetAmazon.reset();
}
