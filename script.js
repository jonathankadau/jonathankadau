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
