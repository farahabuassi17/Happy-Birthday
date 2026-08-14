const story = document.querySelector('#story');
const confetti = document.querySelector('.confetti');
const fireworks = document.querySelector('.fireworks');

function observeReveals() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('seen');
  }), { threshold: .16 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

function celebrate() {
  confetti.innerHTML = Array.from({ length: 34 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
  setTimeout(() => confetti.innerHTML = '', 3800);
}

function launchFireworks() {
  const bursts = [
    { x: 25, y: 38, delay: 0 },
    { x: 73, y: 32, delay: 350 },
    { x: 50, y: 22, delay: 700 },
    { x: 82, y: 52, delay: 1050 },
    { x: 17, y: 57, delay: 1250 }
  ];
  fireworks.innerHTML = bursts.map((burst, burstIndex) =>
    `<span class="firework" style="--x:${burst.x}%;--y:${burst.y}%;--delay:${burst.delay}ms">${
      Array.from({ length: 14 }, (_, particle) => `<i style="--p:${particle};--c:${(particle + burstIndex) % 3}"></i>`).join('')
    }</span>`
  ).join('');
  setTimeout(() => fireworks.innerHTML = '', 3600);
}

document.querySelector('#openGift').addEventListener('click', () => {
  story.hidden = false;
  observeReveals();
  setTimeout(() => story.scrollIntoView({ behavior: 'smooth' }), 100);
});
document.querySelectorAll('.celebrate').forEach(button => button.addEventListener('click', celebrate));
document.querySelectorAll('.flip-card').forEach(card => card.addEventListener('click', () => card.classList.toggle('flipped')));
document.querySelector('#showPhoto').addEventListener('click', () => {
  document.querySelector('.photo-frame').classList.add('shown');
  document.querySelector('.caption').hidden = false;
});
document.querySelector('#blow').addEventListener('click', event => {
  document.querySelector('.cake').classList.replace('lit', 'out');
  event.currentTarget.textContent = 'I hope it comes true 🤍';
  event.currentTarget.disabled = true;
  celebrate();
  launchFireworks();
});
document.querySelector('#envelope').addEventListener('click', event => event.currentTarget.classList.add('open'));
document.querySelector('#replay').addEventListener('click', () => {
  story.hidden = true;
  document.querySelector('.photo-frame').classList.remove('shown');
  document.querySelector('.caption').hidden = true;
  document.querySelector('.cake').className = 'cake lit reveal';
  document.querySelector('#blow').textContent = 'Blow the candles 🕯️';
  document.querySelector('#blow').disabled = false;
  document.querySelector('#envelope').classList.remove('open');
  document.querySelectorAll('.flip-card').forEach(card => card.classList.remove('flipped'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
