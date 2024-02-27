//Elements
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const decreaseSize = document.querySelector('.decreaseSize');
const userTools = document.querySelector('.toolBar');
const brushSize = document.querySelector('.brushSize');
const addSize = document.querySelector('.addSize');
const colorPalette = document.querySelector('.colorPalette input');
const clearBtn = document.querySelector('.clearBtn button');

let brushRadius = 10;
let x;
let y;
let isClicked = false;


initApp();

function initApp() {
  setCanvasDimension();
}

function setCanvasDimension() {
  //Responsible for setting the width and height of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - canvas.offsetTop;
}

canvas.addEventListener('mousedown', e => {
  isClicked = true;
  x = e.offsetX;
  y = e.offsetY;
});
canvas.addEventListener('touchstart', e => {
  isClicked = true;
  x = e.offsetX;
  y = e.offsetY;
  console.log(e);
});

canvas.addEventListener('mouseup', e => {
  isClicked = false;
});
canvas.addEventListener('touchend', e => {
  isClicked = false;
});
canvas.addEventListener('mouseout', e => {
  isClicked = false;
});

canvas.addEventListener('mousemove', e => {
  if (isClicked) {
    drawCircle(e.offsetX, e.offsetY);
    drawLine(x, y, e.offsetX, e.offsetY);
  }
  x = e.offsetX;
  y = e.offsetY;
});

function drawCircle(x, y) {
  ctx.fillStyle = colorPalette.value;
  ctx.beginPath();
  ctx.arc(x, y, brushRadius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = colorPalette.value;
  ctx.lineWidth = brushRadius * 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

addSize.addEventListener('click', e => {
  if (brushRadius < 50) {
    brushRadius++;
  }
  brushSize.textContent = brushRadius;
});

decreaseSize.addEventListener('click', e => {
  if (brushRadius > 1) {
    brushRadius--;
  }
  brushSize.textContent = brushRadius;
});

clearBtn.addEventListener('click', e => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
