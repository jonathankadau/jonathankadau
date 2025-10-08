const projects = document.querySelectorAll('.project');
const preview = document.getElementById('preview');

projects.forEach(p => {
  // Hover: show preview image
  p.addEventListener('mousemove', (e) => {
    const imgSrc = p.dataset.img;
    preview.src = imgSrc;
    preview.style.left = e.pageX + 20 + 'px';
    preview.style.top = e.pageY + 20 + 'px';
    preview.style.opacity = 1;
    preview.classList.remove('hidden');
  });

  // Move image with cursor
  p.addEventListener('mouseleave', () => {
    preview.style.opacity = 0;
    setTimeout(() => preview.classList.add('hidden'), 200);
  });

  // Click: go to project page
  p.addEventListener('click', () => {
    const url = p.dataset.url;
    window.location.href = url;
  });
});
