const input = document.getElementById('messageInput');
const display = document.getElementById('messageDisplay');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;

    input.classList.add('hidden');
    display.textContent = msg;
    display.classList.remove('hidden');
  }
});

display.addEventListener('click', () => {
  display.classList.add('fade-out');
  setTimeout(() => {
    display.classList.add('hidden');
    display.classList.remove('fade-out');
    input.classList.remove('hidden');
    input.value = '';
    input.focus();
  }, 400);
});
