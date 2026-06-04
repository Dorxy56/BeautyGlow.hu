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
