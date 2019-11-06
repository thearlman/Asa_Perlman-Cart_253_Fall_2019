//This file contains classes of all of the transitional screen sused in the game
//In retrospect, I shoudl have just made one super class, with many children. Oh well, next time


//WelocmeScreen1()
//displays the first welcome screen: a sinister-looking border seperating the publicly
//owned earth (now in ruins) and the private relams of space
class WelcomeScreen1 {
  constructor(bgImg, buttonX, buttonY, buttonWidth, buttonHeight) {
    this.bgImg = bgImg;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonStart = "Fuck That:\nTo The Moon!";
    this.buttonHover = "LET'S GO!!!!";
    this.buttonBrightness;
    this.d;
  }

  //display()
  //
  //displays  the background image and the button to advance to the next screen.
  //and checks to see if the button is being hovered ove,r changing the fill brightness
  display() {
    introAmbience.playMode('untilDone');
    introAmbience.play();
    background(this.bgImg);
    push()
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(220, 255, this.buttonBrightness, 200);
    strokeWeight(7);
    stroke(220, 255, 255, 100);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    noStroke();
    fill(255);
    textSize(width * 1 / 100);
    text(this.buttonStart, width / 2 + 12, height - height * 15 / 100)
    //Checks to see if the mouse is hovering over the button, and changes
    //fill color accordingly.
    this.d = dist(this.buttonX, this.buttonY, mouseX, mouseY);
    if (this.d < this.buttonWidth && this.d < this.buttonHeight) {
      //text(this.buttonHover, width / 2 + 12, height - height * 15 / 100);
      this.buttonBrightness = 255;
    } else {
      this.buttonBrightness = 200;
    }
    pop()
  }
}

//WelocmeScreen1()
//displays the second welcome screen: a getaway.
class WelcomeScreen2 {
  constructor(bgImg, buttonX, buttonY, buttonWidth, buttonHeight) {
    this.bgImg = bgImg;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonStart = "LET'S GO!!!!!!";
    this.buttonBrightness;
    this.d;
  }

  //display()
  //
  //displays  the background image and the button to start the game
  //checks to see if the button is being hovered over, changing the fill brightness
  display() {
    introAmbience.playMode('untilDone');
    introAmbience.play()
    siren.playMode('untilDone');
    siren.play();
    background(this.bgImg);
    push()
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(220, 255, this.buttonBrightness, 200);
    strokeWeight(7);
    stroke(220, 255, 255, 100);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    noStroke();
    fill(255);
    textSize(width * 1 / 100);
    text(this.buttonStart, width / 2 + 12, height - height * 15 / 100)
    //Checks to see if the mouse is hovering over the button, and changes
    //text fill color accordingly.
    this.d = dist(this.buttonX, this.buttonY, mouseX, mouseY);
    if (this.d < this.buttonWidth && this.d < this.buttonHeight) {
      this.buttonBrightness = 255;
    } else {
      this.buttonBrightness = 200;
    }
    pop()
  }

}


//gameOverScreen
//Pretty self explanitory
class GameOverScreen {
  constructor(bgImg, buttonX, buttonY, buttonWidth, buttonHeight) {
    this.bgImg = bgImg;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonStart = "NEVER!!!\nSEE YOU IN HELL!!!";
    this.buttonBrightness;
    this.d;
  }

  //display()
  //
  //displays the background image and the button to reset the game
  //checks to see if the button is being hovered over, changing the fill brightness
  display() {
    background(this.bgImg);
    push()
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(220, 255, this.buttonBrightness, 200);
    strokeWeight(7);
    stroke(220, 255, 255, 100);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    noStroke();
    fill(255);
    textSize(width * 1 / 100);
    text(this.buttonStart, width / 2 + 12, height - height * 15 / 100)
    //Checks to see if the mouse is hovering over the button, and changes
    //text fill color accordingly.
    this.d = dist(this.buttonX, this.buttonY, mouseX, mouseY);
    if (this.d < this.buttonWidth && this.d < this.buttonHeight) {
      this.buttonBrightness = 255;
    } else {
      this.buttonBrightness = 200;
    }
    pop()
  }
}


//winningScreen
//
//the celebration? you are confronted with the reality that what you've been
//chasing is not what you thought it was.....
class WinningScreen {
  constructor(bgImg, buttonX, buttonY, buttonWidth, buttonHeight) {
    this.bgImg = bgImg;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonStart = "Circle Around & \n Hit 'em Again!";
    this.buttonBrightness;
    this.d;
  }

  //display()
  //
  //displays the background image and the button to reset the game
  //checks to see if the button is being hovered over, changing the fill brightness
  display() {
    background(this.bgImg);
    push()
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(220, 255, this.buttonBrightness, 200);
    strokeWeight(7);
    stroke(220, 255, 255, 100);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    noStroke();
    fill(255);
    textSize(width * 1 / 100);
    text(this.buttonStart, width / 2, height - height * 15 / 100);
    //Checks to see if the mouse is hovering over the button, and changes
    //text fill color accordingly.
    this.d = dist(this.buttonX, this.buttonY, mouseX, mouseY);
    if (this.d < this.buttonWidth && this.d < this.buttonHeight) {
      this.buttonBrightness = 255;
    } else {
      this.buttonBrightness = 200;
    }
    pop()
  }
}
