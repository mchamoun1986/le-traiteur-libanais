function filterGalerie(category) {
  document.querySelectorAll('.galerie-filters button').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === category);
  });
  document.querySelectorAll('.galerie-item').forEach(item => {
    item.style.display = (category === 'tout' || item.dataset.category === category) ? 'block' : 'none';
  });
}

function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});
