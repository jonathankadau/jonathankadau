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
let posX = 0;
let posY = 0;
let velocityX = 0.03; // 🌊 base drift speed
let velocityY = 0.02;
let dragging = false;
let lastX = 0;
let lastY = 0;
let inertiaX = 0;
let inertiaY = 0;
let inertiaStrength = 0.85; // ⚙️ drag "glide" strength
let lastTime = 0;

// ✅ make sure grid can receive events
grid.style.pointerEvents = 'auto';

// --- DRAG START ---
grid.addEventListener('mousedown', (e) => {
  dragging = true;
  grid.style.cursor = 'grabbing';
  lastX = e.clientX;
  lastY = e.clientY;
  inertiaX = 0;
  inertiaY = 0;
  e.preventDefault(); // stops unwanted selections
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
  posX += dx;
  posY += dy;
  inertiaX = dx * inertiaStrength;
  inertiaY = dy * inertiaStrength;
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
  posX += dx;
  posY += dy;
  inertiaX = dx * inertiaStrength;
  inertiaY = dy * inertiaStrength;
  lastX = touch.clientX;
  lastY = touch.clientY;
}, { passive: true });

// -------------------
// ANIMATION LOOP (DRIFT + INERTIA)
// -------------------
function animateGrid(timestamp) {
  const delta = (timestamp - lastTime) || 16;
  lastTime = timestamp;

  if (!dragging) {
    posX += velocityX + inertiaX * 0.05;
    posY += velocityY + inertiaY * 0.05;
    inertiaX *= 0.93;
    inertiaY *= 0.93;
  }

  // use background position for infinite scroll illusion
  grid.style.backgroundPosition = `${posX}px ${posY}px`;

  requestAnimationFrame(animateGrid);
}

requestAnimationFrame(animateGrid);
