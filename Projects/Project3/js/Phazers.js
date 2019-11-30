//Phazers
//
//A class to create visuals for the phazers, which are to be stored and then almost immediately
//deleted from an array. The class controls the phazers appearence, as well as performing the
//collision detection between the objects and the enemies
class Phazers {
  constructor(x, y, size) {
    this.x = player.x;
    this.y = player.y;
    this.size = player.size;
  }

  //================================//
  //          display()
  //================================//
  //displays the phazer as transulect blue circle
  display() {
    push()
    noStroke()
    fill(100, 200, 255, 255);
    ellipse(this.x -this.size *2.5, this.y + this.size*10, this.size);
    ellipse(this.x + this.size *2.5, this.y + this.size*10, this.size);
    pop();
    this.size = this.size - 1;
  }

  //================================//
  //            hit()
  //================================//
  //checks the distance between itself, and the enemy which has been passed to it
  //from the for loop in script.js:draw() returns true or false
  hit(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y)
    if (d < this.size / 2 + enemy.size / 2) {
      return true;
    } else {
      return false;

    }
  }
}
