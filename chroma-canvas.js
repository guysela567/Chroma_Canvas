const rows = 6, cols = 22;

let canvas;
let chromaSDK;
let previewGrid = createPreviewGrid();
let previewCanvas;

const prevC = (p) => {
  p.setup = () => {
    p.createCanvas(22 * scl, 6 * scl).parent('#main');
  };

  p.draw = () => {
    p.image(canvas, 0, 0, p.width, p.height);
  };
};

function chromaInit(fps, scl) {
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

function createPreviewGrid() {
  const wrapper = document.querySelector('#wrapper');
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.innerHTML = KEYCAP_TEXT[i][j];
      wrapper.appendChild(cell);
      grid[i][j] = cell;
    }
  }

  return grid;
}

function RGBToHex(r, g, b) {
  const newR = r.toString(16).length == 1 ? "0" + r : r.toString(16);
  const newG = g.toString(16).length == 1 ? "0" + g : g.toString(16);
  const newB = b.toString(16).length == 1 ? "0" + b : b.toString(16);

  return parseInt(`0x${newB}${newG}${newR}`);
}

function updatePreviewGrid() {
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