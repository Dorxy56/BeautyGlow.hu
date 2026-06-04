// Navbar scroll megjelenítés
window.addEventListener('scroll', toggleNavbar);

function toggleNavbar() {
    const navbar = document.querySelector('.main-nav');
    const scrollPos = window.scrollY;
    if (scrollPos > 400) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
}

// Kapcsolati űrlap – mailto előtöltés
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Alapvető validáció
    if (!name || !email || !message) {
        alert('Kérlek töltsd ki a neved, email címed és az üzeneted mezőt!');
        return;
    }

    const body = [
        `Feladó neve: ${name}`,
        `Feladó email: ${email}`,
        ``,
        `Üzenet:`,
        message
    ].join('\n');

    const mailtoLink =
        `mailto:bernadettwilhelm@gmail.com` +
        `?subject=${encodeURIComponent(subject || 'Üzenet a weboldalról')}` +
        `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
});
