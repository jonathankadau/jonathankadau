const projects = document.querySelectorAll('.project');
const preview = document.getElementById('preview');
const grid = document.getElementById('grid');

// -------------------
// PROJECT PREVIEW LOGIC
// -------------------
projects.forEach((p, index) => {
  p.addEventListener('mouseenter', () => {
    const imgSrc = p.dataset.img;
    preview.src = imgSrc;
    preview.classList.remove('hidden');
    preview.style.opacity = 1;
    preview.style.transform = `rotate(${(index - 2) * 2}deg)`;
  });

  p.addEventListener('mouseleave', () => {
    preview.style.opacity = 0;
  });

  p.addEventListener('click', () => {
    window.location.href = p.dataset.url;
  });
});

// -------------------
// GRID DRAG + DRIFT
// -------------------
let offsetX = 0;
let offsetY = 0;
let velocityX = 0.04; // automatic slow drift
let velocityY = 0.03;
let dragging = false;
let lastX = 0;
let lastY = 0;
let inertiaX = 0;
let inertiaY = 0;
let lastTime = 0;

// --- DRAG START ---
grid.addEventListener('mousedown', (e) => {
  dragging = true;
  grid.style.cursor = 'grabbing';
  lastX = e.clientX;
  lastY = e.clientY;
  inertiaX = 0;
  inertiaY = 0;
  e.preventDefault(); // ✅ prevents text selection interfering
});

// --- DRAG END ---
window.addEventListener('mouseup', () => {
  dragging = false;
  grid.style.cursor = 'grab';
});

// --- DRAG MOVE ---
window.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  offsetX += dx;
  offsetY += dy;
  inertiaX = dx * 0.6; // inertia multiplier
  inertiaY = dy * 0.6;
  lastX = e.clientX;
  lastY = e.clientY;
});

// --- TOUCH SUPPORT ---
grid.addEventListener('touchstart', (e) => {
  dragging = true;
  const touch = e.touches[0];
  lastX = touch.clientX;
  lastY = touch.clientY;
  inertiaX = 0;
  inertiaY = 0;
}, { passive: true });

grid.addEventListener('touchend', () => {
  dragging = false;
});

grid.addEventListener('touchmove', (e) => {
  if (!dragging) return;
  const touch = e.touches[0];
  const dx = touch.clientX - lastX;
  const dy = touch.clientY - lastY;
  offsetX += dx;
  offsetY += dy;
  inertiaX = dx * 0.6;
  inertiaY = dy * 0.6;
  lastX = touch.clientX;
  lastY = touch.clientY;
}, { passive: true });

// -------------------
// SMOOTH LOOP (DRIFT + INERTIA)
// -------------------
function animateGrid(timestamp) {
  const delta = (timestamp - lastTime) || 16;
  lastTime = timestamp;

  if (!dragging) {
    offsetX += velocityX + inertiaX * 0.1;
    offsetY += velocityY + inertiaY * 0.1;

    inertiaX *= 0.95; // gradual slowdown
    inertiaY *= 0.95;
  }

  // loop for infinite movement illusion
  const limit = 600;
  if (offsetX > limit) offsetX -= limit;
  if (offsetX < -limit) offsetX += limit;
  if (offsetY > limit) offsetY -= limit;
  if (offsetY < -limit) offsetY += limit;

  grid.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

  requestAnimationFrame(animateGrid);
}

requestAnimationFrame(animateGrid);
