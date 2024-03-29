let ripple1, ripple2;

function setup() {
  chromaInit(10);
  ripple1 = new Ripple(0, 150, color(0, 0, 255), 1, 50);
  ripple2 = new Ripple(width - 150, 150, color(255, 0, 0), -1, 50);
}

function drawChroma() {
  blendMode(REPLACE);
  background(0, 0 , 0);
  blendMode(ADD); // blend the overlaying lights together
  ripple1.update();
  ripple2.update();
  ripple1.show();
  ripple2.show();
}