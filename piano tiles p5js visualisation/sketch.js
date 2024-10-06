//this code was inspired by the p5js code of 3d piano tiles (https://editor.p5js.org/lzmunch/sketches/1UhU21lsY)
//this code is using p5.serial library that must be installed beforehand on the computer as well as envelope library
let serial; // setting a variable for the p5.serial library 
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let osc, env; //variables for the envelope sound 
let t = -175;
let bt = [-150, -100, 0, 50, 100]; 
let keys = []; // the list for displaying the white keys
let blackKeys = []; // the list for displaying the black keys
let k = [0, 2, 4, 5, 7, 9, 'C']; // the information transported from the arduino for white keys
let bk = [1, 3, 6, 8, 'B']; // the information transported from the arduino for black keys
let notes = [60, 62, 64, 65, 67, 69, 90]; // the list for the envelope library to play the sound for white keys 
let blackNotes = [61, 63, 66, 68, 70]; // the list for the envelope library to play the sound for black keys 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); //creating the 3d canvas 
   // Instantiate our SerialPort object
  serial = new p5.SerialPort(); // creating a portal to receive information from arudino

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem14401");

  // Here are the callbacks that you can register
  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  serial.on('close', gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
  angleMode(DEGREES);
  env = new p5.Envelope(); // creating the encelope with the p5js library for the sound effect
  env.setADSR(0.01, 0.1, 1, 0.25);
  osc = new  p5.Oscillator("triangle");
  osc.start();
  osc.amp(env)
  for(let i = 0; i < 7; i++) {
   keys.push(new Key(t, k[i])) //creating the white keys from the class
    t += 50; 
  }
   for(let j = 0; j < 5; j++) {
   blackKeys.push(new BlackKey(bt[j], bk[j])) //creating the black keys from the class
  }
 
}

function serverConnected() {
  print("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

//print error to console
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
 // console.log(currentString);             // print the string
  latestData = currentString;            // save it for the draw method
   //console.log(latestData.charAt(1))
}

// We got raw from the serial port
// function gotRawData(thedata) {
//   print("gotRawData" + thedata);
// }

function draw() {

  background(54,69,79); // setting the color of the background
  //translate(width/2, height/2);
  scale(2);
  for(let i = 0; i < keys.length; i++) {
    keys[i].pressed();
    keys[i].display();  //displaying the white keys on the canvas
  }
 
   for(let j = 0; j < blackKeys.length; j++) {
    blackKeys[j].pressed();
    blackKeys[j].display(); //displaying the black keys on the canvas
    
  }  
 // serialEvent();
  touchEvent()
}

function touchEvent() {
  for (let i = 0; i < k.length; i ++){
  if (latestData.charAt(0) == 'T' && latestData.charAt(1) == k[i]){
    env.play();
    osc.freq(midiToFreq(notes[i])); // if the white key is being touched the sound of the note that is being associated with the key plays 
    if (latestData.charAt(0) == 'T' && latestData.charAt(1) == 'B'){
    env.play();
    osc.freq(midiToFreq(notes[4])); // if the 11th key is being touched the sound of the note that is being associated with the key plays 
  }
  }
  }
  for(let j = 0; j < bk.length; j++) {
  if(latestData.charAt(0) == 'T' && latestData.charAt(1) == bk[j]) {
    env.play();
   osc.freq(midiToFreq(blackNotes[j])); // if the black key is being touched the sound of the note that is being associated with the key plays 
  }
    if(latestData.charAt(0) == 'T' && latestData.charAt(1) == 'C') {
    env.play();
   osc.freq(midiToFreq(blackNotes[3])); // if the white key is being touched the sound of the note that is being associated with the key plays 
  }
  }
}





