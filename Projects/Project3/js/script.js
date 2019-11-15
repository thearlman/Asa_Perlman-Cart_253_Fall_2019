//~~~~~~gameState control variable~~~~~~~//
// will be set to the appropriate string based on the
// current state of the game. Should be set to one of the following:
// intro1, intro2, playing, win, lose
let gameState = "intro1";

// Image variables
let intro1BgImg;
let intro2BgImg;

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

  //sounds
  ambience = loadSound('assets/sounds/ambience.mp3')

}

// setup()
//
// Sets up a canvas
// Creates player and enemy objects, planet object, sets color mode
function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,360);
  introScreen1 = new ScreenIntro1(intro1BgImg, width / 2 + 12,
                      height - height * 15 / 100,
                      width * 10 / 100, height * 8 / 100)
  introScreen2 = new ScreenIntro2(intro2BgImg, width / 2 + 12,
                      height - height * 15 / 100,
                      width * 10 / 100, height * 8 / 100)

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
