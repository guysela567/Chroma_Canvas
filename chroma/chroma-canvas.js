const rows = 6, cols = 22; // keyboard grid size is 22 by 6
let scl = 60; // Scale up the canvas so drawing isn't weird
const width = cols * scl, height = rows * scl;

let canvas;
let chromaSDK;
let previewGrid = createPreviewGrid();
let previewCanvas;

// create a p5 instance for the preview canvas
const prevC = (p) => {
  p.setup = () => {
    p.createCanvas(22 * scl, 6 * scl).parent('#main');
  };

  p.draw = () => {
    p.image(canvas, 0, 0, p.width, p.height);
  };
};

function chromaInit(fps, scale) { // creates a connection to the physical Razer keyboard
  if (scale) scl = scale;
  chromaSDK = new ChromaSDK();
  chromaSDK.init();
  canvas = createCanvas(cols, rows).hide();
  previewCanvas = new p5(prevC);
  noStroke();
  frameRate(fps);
}

function onUnload() {
  chromaSDK.uninit();
}

function createPreviewGrid() { // create a DOM grid of divs
  const wrapper = document.querySelector('#wrapper');
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.innerHTML = KEYCAP_TEXT[i][j]; // add the key text to each cell
      wrapper.appendChild(cell);
      grid[i][j] = cell;
    }
  }

  return grid;
}

function RGBToHex(r, g, b) { // convert RGB to hex
  const newR = r.toString(16).length == 1 ? "0" + r : r.toString(16);
  const newG = g.toString(16).length == 1 ? "0" + g : g.toString(16);
  const newB = b.toString(16).length == 1 ? "0" + b : b.toString(16);

  return parseInt(`0x${newB}${newG}${newR}`);
}

function updatePreviewGrid() { // updates the preview grid and sends an api request to update the keyboard lighting
  const keyGrid = Array(rows).fill(0).map(() => Array(cols).fill(0));
  loadPixels();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = (x + y * cols) * 4;
      const [r, g, b] = pixels.slice(index, index + 3);
      previewGrid[y][x].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      keyGrid[y][x] = RGBToHex(r, g, b);
    }
  }

  chromaSDK.createKeyboardEffect('CHROMA_CUSTOM', keyGrid);
}

function draw() { // p5 draw loop
  scale(1 / scl); // scale the drawings back down
  if (typeof drawChroma == 'function') drawChroma(); // draw loop in the main file
  updatePreviewGrid(); // send pixel data to keyboard
}