/* js/main.js */

function getNavbar(activePage) {
  return `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo"><span>LE TRAITEUR</span> LIBANAIS</a>
      <ul class="nav-links">
        <li><a href="index.html" class="${activePage === 'accueil' ? 'active' : ''}">Accueil</a></li>
        <li><a href="formules.html" class="${activePage === 'formules' ? 'active' : ''}">Formules</a></li>
        <li><a href="devis.html" class="${activePage === 'devis' ? 'active' : ''}">Devis</a></li>
        <li><a href="galerie.html" class="${activePage === 'galerie' ? 'active' : ''}">Galerie</a></li>
        <li><a href="apropos.html" class="${activePage === 'apropos' ? 'active' : ''}">À Propos</a></li>
        <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
        <li><a href="devis.html" class="btn btn-gold nav-cta">Devis Gratuit</a></li>
      </ul>
      <div class="nav-hamburger" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
  <div class="nav-mobile" id="navMobile">
    <a href="index.html">Accueil</a>
    <a href="formules.html">Nos Formules</a>
    <a href="devis.html">Simulateur de Devis</a>
    <a href="galerie.html">Galerie</a>
    <a href="apropos.html">À Propos</a>
    <a href="contact.html">Contact</a>
    <a href="devis.html" class="btn btn-gold" style="text-align:center;margin-top:1rem;">Devis Gratuit</a>
  </div>`;
}

function getFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo"><span>LE TRAITEUR</span> LIBANAIS</a>
          <p>L'excellence de la cuisine libanaise pour vos événements à Lyon. Mezzés, verrines, bowls et buffets préparés avec passion.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <ul>
            <li><a href="formules.html">Nos Formules</a></li>
            <li><a href="devis.html">Devis en ligne</a></li>
            <li><a href="galerie.html">Galerie</a></li>
            <li><a href="apropos.html">À Propos</a></li>
          </ul>
        </div>
        <div>
          <h4>Formules</h4>
          <ul>
            <li><a href="formules.html#mezzes">Mezzés</a></li>
            <li><a href="formules.html#verrines">Verrines</a></li>
            <li><a href="formules.html#bowls">Bowls</a></li>
            <li><a href="formules.html#buffets">Buffets</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+33472000000">04 72 00 00 00</a></li>
            <li><a href="mailto:contact@letraiteurlibanais.com">contact@letraiteurlibanais.com</a></li>
            <li><a href="contact.html">Lyon, France</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Le Traiteur Libanais — Lyon. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/33600000000" class="floating-whatsapp" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.838-6.313-2.236l-.44-.362-3.09 1.036 1.036-3.09-.362-.44A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
  </a>
  <a href="tel:+33472000000" class="floating-phone" aria-label="Appeler">
    <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
  </a>`;
}

function toggleMobileNav() {
  const nav = document.getElementById('navMobile');
  nav.classList.toggle('open');
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navMobile').classList.remove('open');
    });
  });
});
