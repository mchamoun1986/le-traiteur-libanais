/* js/main.js */

function getNavbar(activePage) {
  return `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo"><span>LE TRAITEUR</span> LIBANAIS</a>
      <ul class="nav-links">
        <li><a href="index.html" class="${activePage === 'accueil' ? 'active' : ''}">Accueil</a></li>
        <li class="nav-dropdown">
          <a href="traiteur-lyon.html" class="${['traiteur-lyon','traiteur-entreprise','traiteur-anniversaire','traiteur-cocktail','plateau-repas'].includes(activePage) ? 'active' : ''}">Services ▾</a>
          <ul class="nav-dropdown-menu">
            <li><a href="traiteur-lyon.html">Traiteur Lyon</a></li>
            <li><a href="traiteur-entreprise-lyon.html">Entreprises</a></li>
            <li><a href="traiteur-anniversaire-lyon.html">Anniversaires</a></li>
            <li><a href="traiteur-cocktail-lyon.html">Cocktails &amp; Pots</a></li>
            <li><a href="plateau-repas-lyon.html">Plateaux Repas</a></li>
          </ul>
        </li>
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
    <a href="traiteur-lyon.html">Traiteur Lyon</a>
    <a href="traiteur-entreprise-lyon.html">Traiteur Entreprises</a>
    <a href="traiteur-anniversaire-lyon.html">Traiteur Anniversaires</a>
    <a href="traiteur-cocktail-lyon.html">Cocktails &amp; Pots</a>
    <a href="plateau-repas-lyon.html">Plateaux Repas</a>
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
            <li><a href="devis.html">Demander un devis</a></li>
            <li><a href="contact.html">Nous écrire</a></li>
            <li>Lyon &amp; alentours</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Le Traiteur Libanais — Lyon. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
`;
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
