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
    preview.style.transform = `rotate(${(index - 2) * 2}deg)`; // small tilt
  });

  p.addEventListener('mouseleave', () => {
    preview.style.opacity = 0;
  });

  p.addEventListener('click', () => {
    window.location.href = p.dataset.url;
  });
});

// -------------------
// GRID DRAG + GLIDE LOGIC
// -------------------
let offsetX = 0;
let offsetY = 0;
let velocityX = 0.05; // base drift speed
let velocityY = 0.03;
let drag = false;
let lastX = 0;
let lastY = 0;
let inertiaX = 0;
let inertiaY = 0;
let lastTime = 0;

// 🖱️ Mouse support
grid.addEventListener('mousedown', (e) => {
  drag = true;
  grid.style.cursor = 'grabbing';
  lastX = e.clientX;
  lastY = e.clientY;
  inertiaX = 0;
  inertiaY = 0;
  e.preventDefault(); // prevent text selection
});

window.addEventListener('mouseup', () => {
  drag = false;
  grid.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
  if (!drag) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  offsetX += dx;
  offsetY += dy;
  inertiaX = dx * 0.9; // glide momentum
  inertiaY = dy * 0.9;
  lastX = e.clientX;
  lastY = e.clientY;
});

// 📱 Touch support
grid.addEventListener('touchstart', (e) => {
  drag = true;
  const touch = e.touches[0];
  lastX = touch.clientX;
  lastY = touch.clientY;
  inertiaX = 0;
  inertiaY = 0;
}, { passive: false });

grid.addEventListener('touchend', () => {
  drag = false;
});

grid.addEventListener('touchmove', (e) => {
  if (!drag) return;
  const touch = e.touches[0];
  const dx = touch.clientX - lastX;
  const dy = touch.clientY - lastY;
  offsetX += dx;
  offsetY += dy;
  inertiaX = dx * 0.9;
  inertiaY = dy * 0.9;
  lastX = touch.clientX;
  lastY = touch.clientY;
  e.preventDefault();
}, { passive: false });

// -------------------
// INFINITE LOOP + SMOOTH GLIDE
// -------------------
function animateGrid(timestamp) {
  const delta = (timestamp - lastTime) || 16;
  lastTime = timestamp;

  if (!drag) {
    // apply inertia and slow drift
    offsetX += velocityX + inertiaX * 0.1;
    offsetY += velocityY + inertiaY * 0.1;

    // gradually slow down inertia
    inertiaX *= 0.95;
    inertiaY *= 0.95;
  }

  // create infinite seamless movement
  if (offsetX > 300 || offsetX < -300) offsetX = 0;
  if (offsetY > 300 || offsetY < -300) offsetY = 0;

  grid.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  requestAnimationFrame(animateGrid);
}

requestAnimationFrame(animateGrid);
