//~~~~~~gameState control variable~~~~~~~//
// will be set to the appropriate string based on the
// current state of the game. Should be set to one of the following:
// intro1, intro2, playing, win, lose
let gameState = "intro1";


// Variables for the game's actors
//*the player*
let player;
//*the enemies (to be stored in this array)**
let enemies = [];




// Image variables
let intro1BgImg;
let intro2BgImg;
let backgroundImage;
let crosshairs;
let cockpit;

// Sound variables
let ambience;




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
  cockpit = loadImage('assets/images/cockpit.png')

  //sounds
  ambience = loadSound('assets/sounds/ambience.mp3');

}

// setup()
//
// Sets up a canvas
// Creates player and enemy objects, planet object, sets color mode
function setup() {
  //make things fullscreen
  createCanvas(windowWidth,windowHeight);
  //sets color mode to hsb(HUGH, SATURATION, BRIGHTNESS)
  colorMode(HSB,360);
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
  if (gameState === "intro1"){
    introScreen1.display();
  }
  else if (gameState === "intro2"){
  introScreen2.display();
  }
  else if (gameState === "playing"){
    background(backgroundImage);
    // Handle input for the player
    player.handleInput();
    // Handle movment of the player
    player.move();
    //displays the players crosshairs, and the ship
    player.display();
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
