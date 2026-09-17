const progress = document.getElementById('progress');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`;
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = '☰';
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

const certificateLightbox = document.getElementById('certificateLightbox');
const certificateLightboxImage = document.getElementById('certificateLightboxImage');
const certificateLightboxClose = document.createElement('button');

certificateLightboxClose.type = 'button';
certificateLightboxClose.className = 'certificate-lightbox-close';
certificateLightboxClose.setAttribute('aria-label', 'Close certificate preview');
certificateLightboxClose.textContent = '×';
certificateLightbox?.prepend(certificateLightboxClose);
certificateLightboxClose.addEventListener('click', closeCertificateLightbox);

document.querySelectorAll('.certificate-open').forEach(card => {
  card.addEventListener('click', event => {
    event.preventDefault();
    const image = card.querySelector('img');
    if (!image || !certificateLightbox || !certificateLightboxImage) return;
    certificateLightboxImage.src = image.src;
    certificateLightboxImage.alt = image.alt;
    certificateLightboxImage.classList.toggle('district-preview', card.dataset.certificate === 'district');
    certificateLightbox.classList.add('open');
    certificateLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeCertificateLightbox() {
  if (!certificateLightbox || !certificateLightboxImage) return;
  certificateLightbox.classList.remove('open');
  certificateLightbox.setAttribute('aria-hidden', 'true');
  certificateLightboxImage.removeAttribute('src');
  document.body.style.overflow = '';
}

certificateLightbox?.addEventListener('click', event => {
  if (event.target === certificateLightbox) closeCertificateLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeCertificateLightbox();
});
