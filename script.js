const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const soundToggle = document.querySelector('.sound-toggle');

document.documentElement.classList.add('js-ready');

if (menuToggle && siteMenu) {
  const syncMenuState = () => {
    const isMobile = window.matchMedia('(max-width: 780px)').matches;
    if (!isMobile) {
      siteMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    siteMenu.inert = isMobile && !siteMenu.classList.contains('is-open');
  };

  const closeMenu = () => {
    siteMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    syncMenuState();
  };

  closeMenu();

  menuToggle.addEventListener('click', () => {
    const isOpen = siteMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    siteMenu.inert = !isOpen;
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', syncMenuState);
}

const setActiveSection = (id) => {
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

const updateActiveSection = () => {
  const viewportCenter = window.innerHeight / 2;
  let closest = sections[0];
  let closestDistance = Number.POSITIVE_INFINITY;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs((rect.top + rect.bottom) / 2 - viewportCenter);
    if (distance < closestDistance) {
      closest = section;
      closestDistance = distance;
    }
  });
  if (closest) setActiveSection(closest.id);
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(updateActiveSection, { threshold: [0, .25, .5, .75, 1] });
  sections.forEach((section) => observer.observe(section));
}

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection);
window.addEventListener('hashchange', updateActiveSection);
updateActiveSection();

let soundEnabled = true;
let audioContext;
const playSelectionSound = () => {
  if (!soundEnabled) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  audioContext ??= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + .06);
  gain.gain.setValueAtTime(.035, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .08);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + .08);
};

soundToggle?.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  soundToggle.setAttribute('aria-label', soundEnabled ? 'Silenciar sonidos de selección' : 'Activar sonidos de selección');
  soundToggle.innerHTML = `<span aria-hidden="true">${soundEnabled ? '♫' : '♪'}</span> Sonido: ${soundEnabled ? 'ON' : 'OFF'}`;
  if (soundEnabled) playSelectionSound();
});

document.querySelectorAll('a, button').forEach((element) => {
  if (element === soundToggle) return;
  element.addEventListener('click', playSelectionSound);
});
