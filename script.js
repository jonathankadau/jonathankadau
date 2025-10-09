const projects = document.querySelectorAll('.project');
const preview = document.getElementById('preview');
const grid = document.querySelector('.grid');

// --- Project Hover / Click Behavior ---
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

// --- GRID INTERACTIVITY ---
let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

function stopGridAnimation() {
  grid.style.animation = 'none';
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

// Touch support for mobile
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
