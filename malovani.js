const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = 'black';
let currentTool = 'brush';
let currentBrushSize = 5;
let drawingSnapshot;
let shapes = [];

let currentTriangle = [];

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startDrawing(e) {
  isDrawing = true;
  const pos = getMousePos(e);
  [lastX, lastY] = [pos.x, pos.y];
  drawingSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  updateSelectedTool();
}

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = 'transparent';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = currentBrushSize;

  const pos = getMousePos(e);

  if (currentTool === 'brush') {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    [lastX, lastY] = [pos.x, pos.y];
  } else if (currentTool === 'rectangle') {
    restoreDrawingSnapshot();
    ctx.strokeRect(lastX, lastY, pos.x - lastX, pos.y - lastY);
  } else if (currentTool === 'circle') {
    restoreDrawingSnapshot();
    const radius = Math.sqrt(Math.pow(pos.x - lastX, 2) + Math.pow(pos.y - lastY, 2));
    ctx.beginPath();
    ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (currentTool === 'triangle') {
    restoreDrawingSnapshot();
    if (currentTriangle.length === 2) {
      drawTriangle([currentTriangle[0], currentTriangle[1], { x: pos.x, y: pos.y }]);
    }
  }
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
  if (currentTool !== 'brush' && currentTool !== 'eraser') {
    const pos = getMousePos(event);
    if (currentTool === 'triangle') {
      currentTriangle.push({ x: pos.x, y: pos.y });
      if (currentTriangle.length === 3) {
        drawTriangle(currentTriangle);
        shapes.push({ tool: currentTool, vertices: currentTriangle.map(v => ({ x: v.x, y: v.y })) });
        currentTriangle = [];
        drawingSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }
    } else {
      shapes.push({ tool: currentTool, x: lastX, y: lastY, width: pos.x - lastX, height: pos.y - lastY });
    }
  }
  drawingSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSnapshot() {
  ctx.putImageData(drawingSnapshot, 0, 0);
}

function setColor(color) {
  currentColor = color;
  updateSelectedColor();
}

function setBrushTool() {
  currentTool = 'brush';
  updateSelectedTool();
}

function setRectangleTool() {
  currentTool = 'rectangle';
  updateSelectedTool();
}

function setCircleTool() {
  currentTool = 'circle';
  updateSelectedTool();
}

function setTriangleTool() {
  currentTool = 'triangle';
  currentTriangle = [];
  updateSelectedTool();
}

function setEraser() {
  currentColor = 'white';
  currentTool = 'eraser';
  startDrawing();
  updateSelectedTool();
}

function setBrushSize(size) {
  currentBrushSize = size;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes = [];
}

function downloadCanvas() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'malovani.png';
  link.click();
}

function drawTriangle(vertices) {
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  ctx.lineTo(vertices[1].x, vertices[1].y);
  ctx.lineTo(vertices[2].x, vertices[2].y);
  ctx.closePath();
  ctx.stroke();
}

function updateSelectedTool() {
  document.querySelectorAll('.tools-panel button').forEach(button => {
    button.classList.remove('selected');
  });
  document.getElementById(currentTool + '-tool').classList.add('selected');
}

function updateSelectedColor() {
  document.querySelectorAll('.color-box').forEach(colorBox => {
    colorBox.classList.remove('active-color-box');
  });
  const selectedColorBox = [...document.querySelectorAll('.color-box')].find(colorBox => {
    return colorBox.style.backgroundColor === currentColor;
  });
  if (selectedColorBox) {
    selectedColorBox.classList.add('active-color-box');
  }
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

updateSelectedTool();

function goHome() {
    window.location.href = "index.html";
  }
  