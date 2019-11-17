//PlanetAmazon()
//
// A class which defines Planet Amazon, the destination for the game and arguably
//where we will all end up one day ;-).
// Takes an image, X and Y coordinates, a Y velocity, a size, and a growSpeed
class PlanetAmazon {
  constructor(img, x, startY, vy, startSize, growSpeed) {
    this.img = img;
    this.x = x;
    this.startY = startY;
    this.y = this.startY;
    this.vy = vy;
    this.startSize = startSize;
    this.size = this.startSize;
    this.growSpeed = growSpeed;
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
  //reset()
  //
  //resets the two important parameters when the game is reset
  reset() {
    this.y = this.startY;
    this.size = this.startSize;
  }
}
