//==============================================================================

// ============TrashGalaxy 2024: Journey to the Planet Amazon===================

//==============================================================================
// Author: Asa Perlman. Original template by: Pippin Barr
// (special; thanks to Daniel Shiffman's p5.js youtube tuts)
//
// Static Images created by Asa Perlman and Gabriel Dupras as part of DART 349-ConcordiaUniversity
//
// All sound effects used under Creative Commons license
// Winning song: Fly Me To The Moon (8-bit Cover) by Jump Ship:
// https://jumpshipmusic.bandcamp.com/track/fly-me-to-the-moon-8-bit-cover
// Explosion gif (unknown author):
// https://giphy.com/stickers/transparent-fire-explosion-ahza0v6s5pSxy
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~In Brief~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Having escaped the -earth on fire- you are confronted by the Amaberg Gates.
// You must fight to escape Bezos' evil space regieme... But is there anything out there
// left to find?? On your way you will encounter a barage of death delivery drones, before
// facing off with the emperor himself, who will do everything in his power to defeat you
// with a reletless assault of packing materials
//
// The players crosshairs are controlled by the mouse; the phasers are fired with the spacebar.
// The difficulty of the game can be tuned by:
//  - adjusting the rate at which the players shield regenerates (Player.js:Player():move())
//  - reducing the number of images in the bossImage[] array
//  - probably in other ways as well....
//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
////~~~~~~gameState control variables; or "state machine?"~~~~~~~//
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
//*the enemies*
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
let bossBulletImg = [];
let explosionGif;
let explosionMaxFrame;
let explosions = [];


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
let bossHello;
let bossDeath;
let evilLaugh;
let gameOverBells;

//~~~~~~~~TIMING VARIABLES~~~~~~~~~~//

//**Variable  assigned to the setInterval function (controlling game timer)
let gameClock;
//**Variable  assigned to the setInterval function (controlling boss bullet timer)
let bossBulletTimer
//**Vatiable setting about of time between boss bullet shots (milliseconds)
let bossBulletStartInterval = 6000;
let bossBulletInterval = bossBulletStartInterval;
//**variables to set the amount of time until planet has been reached
let gameTime = 100;
let secondsToArrival = gameTime;
//**variable for seconds passed, to control frequency of enemy spawn
let secondsPassed = 0;
//**Variable  assigned to the setInterval function (controlling spawn timer)
let spawnTimer;
//number of milliseconds between enemy Spawns
let spawnInterval = 3000;
let newSpawnInterval = spawnInterval;



//================================//
//           preload()
//================================//
//
// Preloads the various images and sounds for the game
function preload() {
  //images
  intro1BgImg = loadImage('assets/images/stage1.jpg');
  intro2BgImg = loadImage('assets/images/stage2.jpg');
  gameOverBgImg = loadImage('assets/images/gameOverImg.jpg');
  gameWonBgImg = loadImage('assets/images/gameWonImg.jpg');
  backgroundImage = loadImage('assets/images/backgroundImg.jpg');
  planetAmazonImg = loadImage('assets/images/planetAmazon.png');
  crosshairs = loadImage('assets/images/crosshairs.png');
  cockpit = loadImage('assets/images/cockpit.png');
  enemyImage[0] = loadImage('assets/images/drone0Damage.png');
  enemyImage[1] = loadImage('assets/images/drone1Damage.png');
  bossImage[0] = loadImage('assets/images/boss0damage.png');
  bossImage[1] = loadImage('assets/images/boss0damage.png');
  bossImage[2] = loadImage('assets/images/boss0damage.png');
  bossImage[3] = loadImage('assets/images/boss0damage.png');
  bossImage[4] = loadImage('assets/images/boss1damage.png');
  bossImage[5] = loadImage('assets/images/boss1damage.png');
  bossImage[6] = loadImage('assets/images/boss1damage.png');
  bossImage[7] = loadImage('assets/images/boss1damage.png');
  bossImage[8] = loadImage('assets/images/boss2damage.png');
  bossImage[9] = loadImage('assets/images/boss2damage.png');
  bossImage[10] = loadImage('assets/images/boss2damage.png');
  bossImage[11] = loadImage('assets/images/boss2damage.png');
  bossBulletImg[0] = loadImage('assets/images/bossBullet0.png');
  bossBulletImg[1] = loadImage('assets/images/bossBullet1.png');
  bossBulletImg[2] = loadImage('assets/images/bossBullet2.png');
  explosionGif = loadImage('assets/images/explosion.gif');

  //sounds
  ambience = loadSound('assets/sounds/ambience.mp3');
  ambience.playMode('untilDone');

  siren = loadSound('assets/sounds/siren.mp3');
  siren.playMode('untilDone');
  siren.setVolume(.1);

  lowCharge = loadSound('assets/sounds/lowCharge.mp3');
  lowCharge.playMode('untilDone');
  lowCharge.setVolume(.2);

  laserCharging = loadSound('assets/sounds/laserCharging.mp3');
  laserCharging.playMode('untilDone');
  laserCharging.setVolume(2);

  laserBlast = loadSound('assets/sounds/laserBlast.wav');
  laserBlast.setVolume(.2);

  firstHit = loadSound('assets/sounds/firstHit.wav');
  firstHit.setVolume(.7);

  secondHit = loadSound('assets/sounds/secondHit.wav');
  secondHit.setVolume(.4);

  crash = loadSound('assets/sounds/crash.wav');

  gameWonSong = loadSound('assets/sounds/gameWonSong.mp3');
  gameWonSong.playMode('untilDone');

  bossHello = loadSound('assets/sounds/bossHello.wav');
  bossHello.playMode('untilDone');
  bossHello.setVolume(2);

  evilLaugh = loadSound('assets/sounds/evilLaugh.wav');
  evilLaugh.playMode('untilDone');

  bossDeath = loadSound('assets/sounds/bossDeath.wav');
  bossDeath.playMode('untilDone');
  bossDeath.setVolume(2);

  gameOverBells = loadSound('assets/sounds/gameOverBells.mp3');
  gameOverBells.playMode('untilDone')
}



//================================//
//          setup()
//================================//
// Sets up a canvas
// Creates player, intro screens, planet objects, sets color mode, deals with a
// couple other niceties
function setup() {
  //set the curosor to be a set of crosshairs
  cursor('crosshair');
  //make the pixel ratio 1:1 (to help with lagging on high resolution screens)
  pixelDensity(1);
  //make the canvas a child of a container in the html
  let canvas = createCanvas(960, 540);
  canvas.parent('game');
  //define the vertical area of screen we want to mask as 75%
  cockpitVerticalMask = height * 75 / 100;
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
    color(200, 200, 0), 50);
  //create the target planet object
  planetAmazon = new PlanetAmazon(planetAmazonImg, width / 2, 0,
    10, 120);
  //how many frames the explosion gif will play for (I divided it in half)'
  //uncomment below to have full animation
  // explosionMaxFrame = explosionGif.numFrames() -1;
  explosionMaxFrame = 7;
}


//================================//
//          draw()
//================================//
//
// Deals with all functions which require constant looping.
// The specifics of each function is eithr outlined below, or in its parent class
function draw() {
  //~~~ intro 1 ~~~//
  if (gameState === "intro1") {
    // play the ambient sound effect
    ambience.play();
    //display the screen
    introScreen1.display();

    //~~~ intro 2 ~~~//
  } else if (gameState === "intro2") {
    // play the ambient sound effect
    ambience.play();
    //play the siren sound effect
    siren.play();
    //display the screen
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
    //display the explosions
    displayExplosions();
    // Handle movment of the player
    player.move();
    // display the phazers, and check for collision with enemies
    handlePhazers();
    //detects if player has collided with enemy
    player.detectCollision();
    //displays the player's crosshairs, and the ship
    player.display();


    //~~~ game Over ~~~//
  } else if (gameState === "gameOver") {
    //play the gameover bells
    gameOverBells.play();
    //play the evil evilLaugh
    evilLaugh.play();
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
// Handle movement, and displaying of enemies
function displayEnemies() {
  //we iterate through the array, only displaying the enemies which exist inside
  //the array (possibillity of 0)
  for (let e = 0; e < enemies.length; e++) {
    enemies[e].move();
    enemies[e].display();
  }
}


//================================//
//       displayExplosions()
//================================//
//
//
// Display the The explosion effect: the explosions are objects (like the enemies)
// and are dealt with in the same fashion.
function displayExplosions() {
  for (let ex = 0; ex < explosions.length; ex++) {
    explosions[ex].display();
    //when the explosion gif has reached the desired number of frames, reset it,
    //and remove the object from the array
    if (explosions[ex].currentFrame >= explosionMaxFrame) {
      explosions[ex].image.reset();
      explosions.splice(ex, 1);
      break;
    }
  }
}



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
      //if the above happened, && the phazer's size is half the size of the enemy (to help with the 3D effect)
      //play the crash sound, and add 1 to the enemy's hit count, and change the enemy's image to the next
      // damaged version stored in the array
      if (hitResult && phazers[p].size < enemies[e].size / 3) {

        //if the enemy is an instance of the boss, reset the boss's position
        //and increase the frequency of boss bullets
        if (enemies[e] instanceof Boss) {
          bossBulletInterval += -1000;
          // also play the explosion gif, to help register the hit:
          // create the explosion object in the same place as the boss
          let explosion = new BossExplosion(enemies[e].x, enemies[e].y, enemies[e].size);
          //push it to the array
          explosions.push(explosion);
          //increase frequency of bullets
          resetBossBulletTimer(bossBulletInterval);
          enemies[e].x = random(0, width);
          enemies[e].y = random(0, cockpitVerticalMask);
        }
        //increase enemy hitcount (boss or not), remove phazer, play sound
        enemies[e].hitCount++;
        phazers.splice(p, 1);
        firstHit.play();
        //if the boss' hitcount reaches its max, play the explosion sound and
        //remove the boss and the phazer from their respective arrays
        if (enemies[e].hitCount >= enemies[e].maxHitcount && enemies[e] instanceof Boss) {
          bossDeath.play();
          //play 60 explosion gifs all around where hte boss was, as a dramatic finish
          for (let i = 0; i < 60; i++) {
            let explosion = new BossExplosion(enemies[e].x + random(-100, 100), enemies[e].y + random(-100, 100), enemies[e].size);
            explosions.push(explosion);
          }
          planetAmazon.resume();
          enemies.splice(e, 1);
          phazers.splice(p, 1);
          startGameTimer();
          break;
        }
        //if an enemy's hitcount reaches its max, play the explosion sound, display an explosion gif, and
        //remove the enemy and the phazer from their respective arrays
        else if (enemies[e].hitCount >= enemies[e].maxHitcount) {
          let explosion = new EnemyExplosion(enemies[e].x, enemies[e].y, enemies[e].size * 2);
          explosions.push(explosion);
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
//resets and resets game timer
function startGameTimer() {
  clearInterval(gameClock);
  gameClock = setInterval(gameTimer, 1000);
}

//================================//
//        gameTimer()
//================================//
//
//reduces the number of seconds until the player has reached the planet and won.
// checks for ^^this^^ to be true and changes gameState accordingly
// also keeps track of time passed, increasing frequency enemies are spawned as the game progresses
//triggers boss battle.
function gameTimer() {
  secondsToArrival -= 1;
  secondsPassed++
  // FIRST PHASE OF BATTLE
  if (secondsPassed === 25 * gameTime / 100) {
    newSpawnInterval = 75 * spawnInterval / 100;
    console.log('spawing every ' + newSpawnInterval);
    startEnemyTimer(newSpawnInterval);
    // SECOND PHASE OF BATTLE
  } else if (secondsPassed === 50 * gameTime / 100) {
    newSpawnInterval = 50 * spawnInterval / 100;
    console.log('spawing every ' + newSpawnInterval);
    startEnemyTimer(newSpawnInterval)
    //third stage of battle
  } else if (secondsPassed === 75 * gameTime / 100) {
    newSpawnInterval = 25 * spawnInterval / 100;
    console.log('spawing every ' + newSpawnInterval);
    startEnemyTimer(newSpawnInterval)
    //BOSS BATTLE
  } else if (secondsPassed === 90 * gameTime / 100) {
    console.log('BOSS BATTLE');
    //stop the enemy spawn timer
    clearInterval(spawnTimer);
    //stop the game clock
    clearInterval(gameClock);
    //pause planet amazons movement
    planetAmazon.pause();
    //spawn the boss
    spawnNewBoss();
    //GAME WON
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
function spawnNewBoss() {
  //announce that the boss is on its way
  bossHello.play();
  // start timer for the boss bullets
  resetBossBulletTimer(bossBulletInterval);
  //create boss & unshift
  let boss = new Boss(random(0, width), random(0, cockpitVerticalMask), width * .5 / 100, 1);
  enemies.unshift(boss);
}

//================================//
//      resetBossBulletTimer()
//================================//
//
//resets the frequency of the boss bullets, based on argument passed
function resetBossBulletTimer(interval) {
  //clear the boss bullets interval
  clearInterval(bossBulletTimer);
  // start timer for the boss bullets
  bossBulletTimer = setInterval(spawnNewBossBullet, interval);
}

//================================//
//       spawnNewBossBullet()
//================================//
//
//spawns a new boss "bullet" when called,
//and pushes it into the enemy array
function spawnNewBossBullet() {
  for (let e = enemies.length; e >= enemies.length - 1; e--) {
    if (enemies[e] instanceof Boss) {
      let bossX = enemies[e].x;
      let bossY = enemies[e].y;
      let bossSize = enemies[e].size;
      let bossBullet = new BossBullet(bossBulletImg[int(random(bossBulletImg.length))], bossX,
        bossY, width * .5 / 100, bossSize / 2);
      enemies.push(bossBullet);
    }
  }
}

//================================//
//        playerShieldRecover()
//================================//
//
//resets the spawn timer interval (which calls spawnNewEnemy())
//on call with argument (number of milliseconds) provided
//set player's shield color to healthy again
function playerShieldRecover() {
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
  let newEnemy = new Enemy(random(0, width), random(0, cockpitVerticalMask), width * .30 / 100, 1);
  //put the new enemy at the beginning of the array(unshift), so it will be displayed behind oldest enemies
  enemies.unshift(newEnemy);
}

//================================//
//        keyPressed()
//================================//
// Checks for keyboard events calls appropriate functions
function keyPressed() {
  //if the spacebar is pressed (while the game is in play) call the players firePhazer function
  if (keyCode === 32 && gameState === "playing") {
    player.firePhazer();
  }
}

//================================//
//        mousePressed()
//================================//
//
// Detects mouse press events, and calls class specific mousePressed functions
function mousePressed() {
  introScreen1.mousePressed();
  introScreen2.mousePressed();
  gameWonScreen.mousePressed();
  gameOverScreen.mousePressed();
  //secret "mobile friendly" option
  if (gameState === "playing"){
    player.firePhazer();
  }
}


//================================//
//          resetGame()
//================================//
//
//resets all variables required for reboot
function resetGame() {
  clearInterval(spawnTimer);
  newSpawnInterval = spawnInterval;
  clearInterval(bossBulletTimer);
  bossBulletInterval = bossBulletStartInterval;
  clearInterval(gameClock);
  secondsToArrival = gameTime;
  secondsPassed = 0;
  player.shieldHealth = player.maxShieldHealth;
  player.charge = player.maxCharge;
  planetAmazon.reset();
}
