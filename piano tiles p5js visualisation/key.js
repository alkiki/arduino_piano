class Key { //creating the class for the white keys
  constructor(t, k) {
    this.t = t;
    this.x = 50; 
    this.y = 50;
    this.z = 150;
    this.a = 165;
    this.key = k;
    this.press = false;
  }

  display() {
      ambientLight(0);
    emissiveMaterial(255);
    this.a = constrain(this.a, 105, 165); 
    push();
    rotateX(this.a);
    translate(this.t, 0);
    box(this.x, this.y, this.z); //constructing the long white keyboard
    pop();

  }

  pressed() {
    if (latestData.charAt(0) == 'T' && latestData.charAt(1) == this.key) {
      this.press = true;
      this.a -= 3; //creating the pressing effect
    } else {
      this.press = false;
      this.a += 3;
    }
  }


}