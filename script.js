const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const toolbar = document.getElementById('toolbar');
const colorPicker = document.getElementById('colorPicker');

let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';

toolbar.addEventListener('click', (event) => {
  if (event.target.classList.contains('tool')) {
    const tool = event.target.dataset.tool;
    
    const tools = toolbar.querySelectorAll('.tool');
    tools.forEach(t => t.classList.remove('active'));
  
    event.target.classList.add('active');
    currentTool = tool;
  }
});

colorPicker.addEventListener('change', (event) => {
  currentColor = event.target.value;
});

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener('mousemove', (event) => {
  if (isDrawing) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = currentTool === 'pencil' ? currentColor : '#333'; 
    ctx.lineWidth = currentTool === 'pencil' ? 5 : 20;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.closePath();
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
  ctx.closePath();
});