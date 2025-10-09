const projects = document.querySelectorAll('.project');
const preview = document.getElementById('preview');

projects.forEach((p, index) => {
  p.addEventListener('mouseenter', () => {
    const imgSrc = p.dataset.img;
    preview.src = imgSrc;
    preview.classList.remove('hidden');
    preview.style.opacity = 1;
    preview.style.transform = `rotate(${(index - 2) * 2}deg)`; // small tilt effect
  });

  p.addEventListener('mouseleave', () => {
    preview.style.opacity = 0;
  });

  p.addEventListener('click', () => {
    window.location.href = p.dataset.url;
  });
});

// --- GRID INTERACTIVITY ---
const grid = document.querySelector('.grid');

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

// Stop automatic drifting when user interacts
function stopGridAnimation() {
  grid.style.animation = 'none';
}

// Start listening when mouse down
grid.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  stopGridAnimation();
  grid.style.cursor = 'grabbing';
});

// Move the grid
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  grid.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

// Stop dragging
window.addEventListener('mouseup', () => {
  isDragging = false;
  grid.style.cursor = 'grab';
});

// Optional: touch support for mobile
grid.addEventListener('touchstart', (e) => {
  isDragging = true;
  const touch = e.touches[0];
  startX = touch.clientX - currentX;
  startY = touch.clientY - currentY;
  stopGridAnimation();
});

grid.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  currentX = touch.clientX - startX;
  currentY = touch.clientY - startY;
  grid.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

grid.addEventListener('touchend', () => {
  isDragging = false;
});
