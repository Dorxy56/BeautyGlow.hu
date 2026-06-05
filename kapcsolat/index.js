const FORMSPREE_FORM_ID = 'mwvjpjkd';

// Navbar scroll megjelenítés
// window.addEventListener('scroll', toggleNavbar);

// function toggleNavbar() {
//     const navbar = document.querySelector('.main-nav');
//     if (window.scrollY > 400) {
//         navbar.classList.add('show');
//     } else {
//         navbar.classList.remove('show');
//     }
// }

// Kapcsolati űrlap – Formspree küldés
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successEl = document.getElementById('form-success');
    const errorEl   = document.getElementById('form-error');

    // Gomb letiltása küldés közben
    submitBtn.disabled = true;
    submitBtn.textContent = 'Küldés...';
    errorEl.style.display = 'none';

    try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });

        if (response.ok) {
            // Siker: elrejtjük az űrlapot, megmutatjuk az üzenetet
            form.style.display = 'none';
            successEl.style.display = 'block';
            successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Formspree hiba');
        }
    } catch (err) {
        // Hiba: megmutatjuk a hibaüzenetet, gomb visszaáll
        errorEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Küldés';
    }
});
