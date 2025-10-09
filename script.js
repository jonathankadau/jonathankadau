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
// GRID INTERACTIVITY
// -------------------
let offsetX = 0;
let offsetY = 0;
let velocityX = 0.05; // automatic drift speed
let velocityY = 0.03;
let drag = false;
let lastX, lastY;
let inertiaX = 0, inertiaY = 0;
let lastTime = 0;

// handle dragging
grid.addEventListener('mousedown', (e) => {
  drag = true;
  grid.style.cursor = 'grabbing';
  lastX = e.clientX;
  lastY = e.clientY;
  inertiaX = 0;
  inertiaY = 0;
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
  inertiaX = dx * 0.9; // add glide momentum
  inertiaY = dy * 0.9;
  lastX = e.clientX;
  lastY = e.clientY;
});

// touch support
grid.addEventListener('touchstart', (e) => {
  drag = true;
  const touch = e.touches[0];
  lastX = touch.clientX;
  lastY = touch.clientY;
  inertiaX = 0;
  inertiaY = 0;
});

grid.addEventListener('touchend', () => (drag = false));

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
});

// -------------------
// INFINITE + SMOOTH LOOP
// -------------------
function animateGrid(timestamp) {
  const delta = (timestamp - lastTime) || 16;
  lastTime = timestamp;

  if (!drag) {
    // apply inertia and auto drift
    offsetX += velocityX + inertiaX * 0.1;
    offsetY += velocityY + inertiaY * 0.1;

    // slowly dampen inertia
    inertiaX *= 0.95;
    inertiaY *= 0.95;
  }

  // make grid movement seamless (loop back)
  if (offsetX > 1000 || offsetX < -1000) offsetX = 0;
  if (offsetY > 1000 || offsetY < -1000) offsetY = 0;

  grid.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

  requestAnimationFrame(animateGrid);
}

requestAnimationFrame(animateGrid);
