class BlackKey { //creating the class for the black keys
  constructor(t, k) {
    this.t = t;
    this.x = 35; 
    this.y = 50; 
    this.z = 100;
    this.a = 0;
    this.key = k;
    this.press = false;
  }

  display() {
      ambientLight(0);
  emissiveMaterial(0);
    this.a = constrain(this.a, 0, 20);
    push();
    if(this.press) {
    }
    rotateX(165);
    translate(this.t, 30 - this.a);
    box(this.x, this.y, this.z); //creating the black key
    pop();

  }

  pressed() {
    if (latestData.charAt(0) == 'T' && latestData.charAt(1) == this.key) {
      this.press = true;
      this.a += 3; //creating the pressing effect based on the data that was transformed froma arduino
    } else {
      this.press = false;
      this.a -= 3;
    }
  }


}