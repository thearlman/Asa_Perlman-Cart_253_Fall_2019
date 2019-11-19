//PlanetAmazon()
//
// A class which defines Planet Amazon, the destination for the game and arguably
//where we will all end up one day ;-).
// Takes an image, X and Y coordinates, a Y velocity, a size, and a growSpeed
class PlanetAmazon {
  constructor(img, x, startY, startSize) {
    this.img = img;
    this.x = x;
    this.startY = startY;
    this.y = this.startY;
    this.vyRun = height * .03 / 100;
    this.vy = this.vyRun;
    this.startSize = startSize;
    this.size = this.startSize;
    this.growSpeedRun = height * .05 / 100;
    this.growSpeed = this.growSpeedRun;

  }

  //PlanetAmazon.display()
  //
  // Displays the planet, growing in size, and moving down to create a sense of motion
  display() {
    push();
    this.size += this.growSpeed;
    this.y += this.vy;
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
    pop()
  }

  pause(){
      this.vy = 0;
      this.growSpeed = 0;
  }

  resume(){
    this.vy = this.vyRun * 4;
    this.growSpeed = this.growSpeedRun * 4;

  }

  //reset()
  //
  //resets the two important parameters when the game is reset
  reset() {
    this.y = this.startY;
    this.size = this.startSize;
    this.vy = this.vyRun;
    this.growSpeed = this.growSpeedRun;
  }
}
