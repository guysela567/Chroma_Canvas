const scl = 60; // Scale up the canvas so drawing isn't weird
const width = cols * scl, height = rows * scl;

let size = 150;
let x = size / 2;
let dir = 1;
let speed = 50;

function setup() {
  chromaInit(10);
  fill(255, 255, 0);
}

function draw() {
  scale(1 / scl); // scale the drawings back down
  background(0);
  x += speed * dir;
  if (x <= 0 || x >= width - size) dir *= -1;
  rect(x, 0, size, height);
  updatePreviewGrid(); // send pixel data to keyboard
}