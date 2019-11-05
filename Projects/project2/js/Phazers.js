//A class to create visuals for the phazers to be stored and then immediately
//deleted from an array
class Phazers {
  constructor(x, y, size) {
    this.x = player.x;
    this.y = player.y;
    this.size = player.size;
  }
  //display()
  //
  //
  //displays the phazer as transulect blue circle
  display() {
    push()
    noStroke()
    fill(100, 200, 255, 255);
    ellipse(this.x, this.y, this.size);
    pop();
    this.size = this.size -1;
  }

  hit(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y)
    if (d < this.size/2 + enemy.size/2) {
      return true;
    } else {
      return false;

    }
  }
}
