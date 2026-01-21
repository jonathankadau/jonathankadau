const projects = document.querySelectorAll('.project');
const grid = document.getElementById('grid');
const introBox = document.getElementById('intro-box');
const body = document.body;

// -------------------
// Hover Interaction (homepage only)
// -------------------
if (projects.length && grid && introBox) {
  projects.forEach((p) => {
    const bgColor = p.dataset.bg;
    const gridColor = p.dataset.grid;
    const text = p.dataset.text;

    // Set hover color for text (via CSS variable)
    p.style.setProperty('--hover-color', bgColor);

    p.addEventListener('mouseenter', () => {
      body.style.background = bgColor;

      grid.style.backgroundImage = `
        linear-gradient(to right, ${gridColor}33 1px, transparent 1px),
        linear-gradient(to bottom, ${gridColor}33 1px, transparent 1px),
        linear-gradient(to right, ${gridColor}66 1px, transparent 50px),
        linear-gradient(to bottom, ${gridColor}66 1px, transparent 50px)
      `;

      introBox.querySelector('p').textContent = text;
      introBox.style.color = gridColor;
      introBox.style.borderColor = gridColor;
    });

    p.addEventListener('mouseleave', () => {
      body.style.background = '#F7B267';
      grid.style.backgroundImage = `
        linear-gradient(to right, rgba(0, 110, 255, 0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 110, 255, 0.15) 1px, transparent 1px),
        linear-gradient(to right, rgba(0, 110, 255, 0.25) 1px, transparent 50px),
        linear-gradient(to bottom, rgba(0, 110, 255, 0.25) 1px, transparent 50px)
      `;
      introBox.querySelector('p').textContent =
        "Welcome to my portfolio. This is an expression of myself through designed space, art, picture, and model. Thank you for visiting. (Dont forget to drag the grid around for a little while.)";
      introBox.style.color = 'rgba(255,255,255,0.8)';
      introBox.style.borderColor = 'rgba(255,255,255,0.3)';
    });
  });
}

// -------------------
// Project Page Presets (ALL projects)
// -------------------
const isProjectPage = document.body.classList.contains('project-page');

if (isProjectPage) {
  const bg = document.body.dataset.bg;
  const gridColor = document.body.dataset.grid;

  if (bg) {
    document.body.style.background = bg;
  }

  if (grid && gridColor) {
    grid.style.backgroundImage = `
      linear-gradient(to right, ${gridColor}33 1px, transparent 1px),
      linear-gradient(to bottom, ${gridColor}33 1px, transparent 1px),
      linear-gradient(to right, ${gridColor}66 1px, transparent 50px),
      linear-gradient(to bottom, ${gridColor}66 1px, transparent 50px)
    `;
  }
}

// -------------------
// Project Page Presets
// -------------------
const isCataracta =
  document.body.classList.contains('project-page') &&
  window.location.pathname.includes('cataracta');

if (isCataracta && grid) {
  const gridColor = '#00FF88';

  // lock grid to Cataracta color
  grid.style.backgroundImage = `
    linear-gradient(to right, ${gridColor}33 1px, transparent 1px),
    linear-gradient(to bottom, ${gridColor}33 1px, transparent 1px),
    linear-gradient(to right, ${gridColor}66 1px, transparent 50px),
    linear-gradient(to bottom, ${gridColor}66 1px, transparent 50px)
  `;
}


// -------------------
// Grid Drag + Drift (all pages that have #grid)
// -------------------
if (grid) {
  let posX = 0, posY = 0;
  let velocityX = 0.25, velocityY = 0.15;
  let dragging = false;
  let lastX = 0, lastY = 0;
  let inertiaX = 0, inertiaY = 0;

  grid.addEventListener('mousedown', (e) => {
    dragging = true;
    grid.style.cursor = 'grabbing';
    lastX = e.clientX;
    lastY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    grid.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    posX += dx;
    posY += dy;
    inertiaX = dx;
    inertiaY = dy;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  function animateGrid() {
    if (!dragging) {
      posX += velocityX + inertiaX * 0.05;
      posY += velocityY + inertiaY * 0.05;
      inertiaX *= 0.95;
      inertiaY *= 0.95;
    }

    grid.style.backgroundPosition = `${posX}px ${posY}px`;
    requestAnimationFrame(animateGrid);
  }

  requestAnimationFrame(animateGrid);
}
