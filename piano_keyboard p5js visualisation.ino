#include <Wire.h>
#include "Adafruit_MPR121.h"

#ifndef _BV
#define _BV(bit) (1 << (bit)) 
#endif

Adafruit_MPR121 cap = Adafruit_MPR121();

// Keeps track of the last pins touched
// so we know when buttons are 'released'
uint16_t lasttouched = 0;
uint16_t touching = 0;

void setup() {
  Serial.begin(9600);

  while (!Serial) { // needed to keep leonardo/micro from starting too fast!
    delay(10);
  }
  //5V default address is 0X5A
   if (!cap.begin(0x5A)) {
    while (1);
  }
}
  
void loop() {
  // Get the currently touched pads
touching = cap.touched();
  for (uint8_t i=0; i<12; i++) {
    //if it is touched then trigger the indicator of the sensor
    if ((touching & _BV(i)) && !(lasttouched & _BV(i)) ) {
      if (i == 10){ //if the 10th and 11th key is touched we need to distinguish it from the the key №0 and key №1 in our p5js code
        Serial.println("T" + String('B'));
      }
      else if (i == 11){
        Serial.println("T" + String('C'));
      }
      else{
       Serial.println("T" + String(i)); //print the T as an indication that the key is being touched
      }
    }
    if (!(touching & _BV(i)) && (lasttouched & _BV(i)) ) {
     Serial.println(" released"); //after the user stops touching the key, the arduino code should indicate that the key is not being touched anymore for the sound to stop playing
    }
  }


  // reset the state
  lasttouched = touching;
  return;
  

  //this code was taken from the test code of the mpr121 sensor
  // debugging info
  Serial.print("\t\t\t\t\t\t\t\t\t\t\t\t\t 0x"); Serial.println(cap.touched(), HEX);
  Serial.print("Filt: ");
  for (uint8_t i=0; i<12; i++) {
    Serial.print(cap.filteredData(i)); Serial.print("\t");
  }
  Serial.println();
  Serial.print("Base: ");
  for (uint8_t i=0; i<12; i++) {
    Serial.print(cap.baselineData(i)); Serial.print("\t");
  }
  Serial.println();
  
  // put a delay so it isn't overwhelming
  delay(100);
}
