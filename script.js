const projects = document.querySelectorAll('.project');
const preview = document.getElementById('preview');

projects.forEach(p => {
  // Show image preview near cursor
  p.addEventListener('mousemove', (e) => {
    const imgSrc = p.dataset.img;
    preview.src = imgSrc;
    preview.style.left = e.pageX + 20 + 'px';
    preview.style.top = e.pageY + 20 + 'px';
    preview.style.opacity = 1;
    preview.classList.remove('hidden');
  });

  // Hide preview on mouse leave
  p.addEventListener('mouseleave', () => {
    preview.style.opacity = 0;
    setTimeout(() => preview.classList.add('hidden'), 200);
  });

  // Click: navigate to project page
  p.addEventListener('click', () => {
    const url = p.dataset.url;
    window.location.href = url;
  });
});
