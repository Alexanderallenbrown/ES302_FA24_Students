// let inconsolata;
// function preload() {
//   inconsolata = loadFont('assets/Inconsolata.otf');
// }

let font;
let rollSlider;
let pitchSlider;
let yawSlider;
let rollAngle;
let pitchAngle;
let yawAngle;
let rollDisplay
let yawDisplay;
let pitchDisplay;
let checkbox;
let orderDisplay;

let zyx = true;

function preload() {
  font = loadFont('Inconsolata.otf');
}

function setup() {
  rollAngle = 0;
  pitchAngle = 0;
  yawAngle = 0;
  // var cnv = createCanvas(windowWidth/2, 500,WEBGL);
  // cnv.parent('sketch-holder')
  createCanvas(500, 500,WEBGL)
  camera(1000,-1000,-1000,-100,0,0,0,1,0)

  textFont(font);
  textSize(10);
  textAlign(CENTER, TOP);

  //make a slider and put it a x = 30,y = 80
  rollSlider = createSlider(-314,314,0,1);
  rollSlider.position(80,525);
  //whenever the slider is changed, do this:
  rollSlider.input(rollSliderChange);

  //make a slider and put it a x = 30,y = 80
  pitchSlider = createSlider(-314,314,0,1);
  pitchSlider.position(80,550);
  //whenever the slider is changed, do this:
  pitchSlider.input(pitchSliderChange);

  //make a slider and put it a x = 30,y = 80
  yawSlider = createSlider(-314,314,0,1);
  yawSlider.position(80,575);
  //whenever the slider is changed, do this:
  yawSlider.input(yawSliderChange);

  //make another thing that shows the values
  rollDisplay = createP()
  rollDisplay.position(0,510);
  pitchDisplay = createP()
  pitchDisplay.position(0,535);
  yawDisplay = createP()
  yawDisplay.position(0,560);

  //make a button to submit changes in the textbox
  button = createButton('Reset');
  button.position(10,10);
  button.mousePressed(resetButton);

  checkbox = createCheckbox('Order: ',true);
  checkbox.changed(checkCallback);
  orderDisplay = createP()
  orderDisplay.position(70,485);
  orderDisplay.html("ZYX")

}

function checkCallback(){
  zyx = this.checked();
  if(zyx){
    orderDisplay.html("ZYX")
  }
  else{
    orderDisplay.html("XYZ")
  }
}

function resetButton(){
  rollAngle = 0;
  pitchAngle = 0;
  yawAngle = 0;
  rollSlider.value(0)
  pitchSlider.value(0)
  yawSlider.value(0)

}
function rollSliderChange(){
  rollAngle = rollSlider.value()/100.0;
}
function pitchSliderChange(){
  pitchAngle = pitchSlider.value()/100.0;
}
function yawSliderChange(){
  yawAngle = yawSlider.value()/100.0;
}

function draw() {

  orbitControl();

  background(100);
  drawAxesZYX(0,0,0,100);
  if(zyx){
    drawAxesZYX(rollAngle,pitchAngle,yawAngle,255);
  }
  else{
    drawAxesXYZ(rollAngle,pitchAngle,yawAngle,255);
  }

  rollDisplay.html('Roll: '+str(rollAngle))
  pitchDisplay.html('Pitch: '+str(pitchAngle))
  yawDisplay.html('Yaw: '+str(yawAngle))

}

function drawAxesZYX(Rx,Ry,Rz,myalpha){
  let axLen = 300;
  let tSize = 50;
  // push()
  rotateY(Rz);
  rotateX(Ry);
  rotateZ(Rx);
  push()
  // rotateX(PI/2)
  // rotateZ(3*PI/2)
  rotateY(PI/2)
  rotateX(3*PI/2)

  //draw origin
  strokeWeight(10);
  stroke(color(255,0,0,myalpha))
  // sphere(.01)
  line(0,0,0,axLen,0,0)
  push()
  translate(axLen,0,0)
  fill(color(255,0,0,myalpha))
  stroke(255)
  textSize(tSize)
  rotateZ(PI/2)
  rotateX(PI/2)
  rotateY(PI)
  text("X",0,-100)
  pop()

  stroke(color(0,255,0,myalpha))
  // sphere(.01)
  line(0,0,0,0,axLen,0)
  push()
  translate(0,axLen,0)
  fill(color(0,255,0,myalpha))
  stroke(255)
  textSize(tSize)
  rotateZ(PI/2)
  rotateX(PI/2)
  rotateY(PI)
  text("Y",0,-100)
  pop()


  stroke(color(0,0,255,myalpha))
  // sphere(.01)
  line(0,0,0,0,0,-axLen)
  push()
  translate(0,0,-axLen)
  fill(color(0,0,255,myalpha))
  stroke(255)
  textSize(tSize)
  rotateZ(PI/2)
  rotateX(PI/2)
  rotateY(PI)
  text("Z",0,-100)
  pop()


  pop()


  //reset to black
  stroke(255)

}

function drawAxesXYZ(Rx,Ry,Rz,myalpha){
  let axLen = 300;
  let tSize = 50;
  // push()
  rotateZ(Rx);
  rotateX(Ry);
  rotateY(Rz);

  push()
  // rotateX(PI/2)
  // rotateZ(3*PI/2)
  rotateY(PI/2)
  rotateX(3*PI/2)

  //draw origin
  strokeWeight(10);
  stroke(color(255,0,0,myalpha))
  // sphere(.01)
  line(0,0,0,axLen,0,0)
  push()
  translate(axLen,0,0)
  fill(color(255,0,0,myalpha))
  stroke(255)
  textSize(tSize)
  rotateZ(PI/2)
  rotateX(PI/2)
  rotateY(PI)
  text("X",0,-100)
  pop()

  stroke(color(0,255,0,myalpha))
  // sphere(.01)
  line(0,0,0,0,axLen,0)
  push()
  translate(0,axLen,0)
  fill(color(0,255,0,myalpha))
  stroke(255)
  textSize(tSize)
  rotateZ(PI/2)
  rotateX(PI/2)
  rotateY(PI)
  text("Y",0,-100)
  pop()


  stroke(color(0,0,255,myalpha))
  // sphere(.01)
  line(0,0,0,0,0,-axLen)
  push()
  translate(0,0,-axLen)
  fill(color(0,0,255,myalpha))
  stroke(255)
  textSize(tSize)
  rotateZ(PI/2)
  rotateX(PI/2)
  rotateY(PI)
  text("Z",0,-100)
  pop()


  pop()


  //reset to black
  stroke(255)

}
