// Add the studio's actual email address here when you have confirmed it.
// Leaving it empty keeps the website in draft-only mode. There is no backend.
const STUDIO_EMAIL = '';

const serviceContent = {
  concept: {
    label: '01 / DEFINE THE DIRECTION',
    title: 'Architectural concept design',
    description: 'Turn an initial brief into a design direction. Explore building form, relationships between spaces, and the ideas that give a project its character.',
    image: 'assets/studio-process.jpg',
    alt: 'Plans and a scale model used to explore architectural concepts'
  },
  planning: {
    label: '02 / MAKE SPACE WORK',
    title: 'Space planning',
    description: 'Consider how rooms connect, how people move, and how a space supports daily activities. Compare layouts and refine the arrangement around the project brief.',
    image: 'assets/drafting.jpg',
    alt: 'An architectural drawing being developed at a desk'
  },
  visualisation: {
    label: '03 / SEE THE POSSIBILITIES',
    title: '3D visualisation',
    description: 'Use digital models and visual studies to discuss form, materials, and atmosphere before a design is built. The photograph shown is a visual reference, not a completed Architrexx project.',
    image: 'assets/building-facade.jpg',
    alt: 'Building photograph used as a visual reference for architectural form'
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { closeMenu(); menuToggle.focus(); }
});

document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = serviceContent[button.dataset.service];
  document.querySelectorAll('[data-service]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelector('#service-label').textContent = service.label;
  document.querySelector('#service-title').textContent = service.title;
  document.querySelector('#service-description').textContent = service.description;
  const image = document.querySelector('#service-image');
  image.src = service.image; image.alt = service.alt;
}));

// Keep one FAQ open at a time. Native details/summary also work without JS.
document.querySelectorAll('.faq-list details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('.faq-list details').forEach(other => { if (other !== detail) other.open = false; });
}));

// Highlight the section nearest the top of the viewport, without changing focus.
const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    navigation.querySelectorAll('a').forEach(link => {
      const active = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-12% 0px -68% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

let enquiryText = '';
const enquiryForm = document.querySelector('#enquiry-form');
enquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  enquiryText = `PROJECT ENQUIRY — ARCHITREXX\n\nName: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}\nProject type: ${data.get('project')}\n\nProject details:\n${data.get('message').trim()}`;
  document.querySelector('#enquiry-preview').textContent = enquiryText;
  document.querySelector('#enquiry-result').hidden = false;
  document.querySelector('#draft-status').textContent = '';
  // A configured address adds an email-app link. It never sends automatically.
  const emailLink = document.querySelector('#email-enquiry');
  if (STUDIO_EMAIL && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(STUDIO_EMAIL)) {
    emailLink.href = `mailto:${encodeURIComponent(STUDIO_EMAIL)}?subject=${encodeURIComponent(`Project enquiry: ${data.get('project')}`)}&body=${encodeURIComponent(enquiryText)}`;
    emailLink.hidden = false;
  }
});

document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  const status = document.querySelector('#draft-status');
  try {
    await navigator.clipboard.writeText(enquiryText);
    status.textContent = 'Draft copied. No message has been sent.';
  } catch {
    status.textContent = 'Copy is unavailable in this browser. Select the draft text to copy it, or use Download .txt.';
  }
});
document.querySelector('#download-enquiry').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([enquiryText], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'architrexx-enquiry.txt';
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#draft-status').textContent = 'Draft download started. No message has been sent.';
});
