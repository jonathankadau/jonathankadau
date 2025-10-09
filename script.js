const grid = document.querySelector('.grid');
let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

// Fade-in fix — ensure grid stays visible even if JS interrupts animation
grid.style.opacity = 1;

// Stop drifting animation and keep current offset
function stopGridAnimation() {
  const computedTransform = getComputedStyle(grid).transform;
  grid.style.animation = 'none';
  if (computedTransform !== 'none') {
    const matrix = new DOMMatrix(computedTransform);
    offsetX += matrix.m41;
    offsetY += matrix.m42;
  }
}

grid.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
  stopGridAnimation();
  grid.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  grid.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  grid.style.cursor = 'grab';
});

// Touch support
grid.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  isDragging = true;
  startX = touch.clientX - offsetX;
  startY = touch.clientY - offsetY;
  stopGridAnimation();
});

grid.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  offsetX = touch.clientX - startX;
  offsetY = touch.clientY - startY;
  grid.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

grid.addEventListener('touchend', () => {
  isDragging = false;
});
