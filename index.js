class Carousel {
    constructor(trackId, images, visible = 3) {
        this.track = document.getElementById(trackId);
        this.images = images;
        this.visible = visible;
        this.current = 0;
        this.isAnimating = false;

        this.buildTrack();
        this.setPosition(false);

        window.addEventListener('resize', () => this.setPosition(false));
    }

    buildTrack() {
        const allImages = [
            ...this.images.slice(-this.visible),
            ...this.images,
            ...this.images.slice(0, this.visible)
        ];

        this.track.innerHTML = '';
        allImages.forEach(src => {
            const div = document.createElement('div');
            div.className = 'carousel-item-custom';
            div.innerHTML = `<img src="${src}" class="rounded-5 w-100 px-3" style="height: 25rem; object-fit: cover;">`;
            this.track.appendChild(div);
        });
    }

    getItemWidth() {
        return this.track.querySelector('.carousel-item-custom').offsetWidth + 16;
    }

    setPosition(animate) {
        this.track.style.transition = animate ? 'transform 0.5s ease' : 'none';
        const offset = (this.current + this.visible) * this.getItemWidth();
        this.track.style.transform = `translateX(-${offset}px)`;
    }

    scroll(dir) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.current += dir;
        this.setPosition(true);

        this.track.addEventListener('transitionend', () => {
            if (this.current >= this.images.length) {
                this.current = 0;
                this.setPosition(false);
            }
            if (this.current < 0) {
                this.current = this.images.length - 1;
                this.setPosition(false);
            }
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.isAnimating = false;
                });
            });
        }, { once: true });
    }
}


const carousel1 = new Carousel('carouselTrack1', [
    'https://cdn.beautyglow.hu/images/c1-1.jpg',
    'https://cdn.beautyglow.hu/images/c1-2.jpg',
    'https://cdn.beautyglow.hu/images/c1-3.jpg',
    'https://cdn.beautyglow.hu/images/c1-4.jpg',
    'https://cdn.beautyglow.hu/images/c1-5.jpg',
    'https://cdn.beautyglow.hu/images/c1-6.jpg',
    'https://cdn.beautyglow.hu/images/c1-7.jpg'
]);

const carousel2 = new Carousel('carouselTrack2', [
    'https://cdn.beautyglow.hu/images/c2-1.jpg',
    'https://cdn.beautyglow.hu/images/c2-2.jpg',
    'https://cdn.beautyglow.hu/images/c2-3.jpg',
    'https://cdn.beautyglow.hu/images/c2-4.jpg',
    'https://cdn.beautyglow.hu/images/c2-5.jpg',
    'https://cdn.beautyglow.hu/images/c2-6.jpg',
    'https://cdn.beautyglow.hu/images/c2-7.jpg'
]);

const carousel3 = new Carousel('carouselTrack3', [
    'https://cdn.beautyglow.hu/images/c3-1.jpg',
    'https://cdn.beautyglow.hu/images/c3-2.jpg',
    'https://cdn.beautyglow.hu/images/c3-3.jpg',
    'https://cdn.beautyglow.hu/images/c3-4.jpg',
    'https://cdn.beautyglow.hu/images/c3-5.jpg',
    'https://cdn.beautyglow.hu/images/c3-6.jpg'
]);

const carousel4 = new Carousel('carouselTrack4', [
    'https://cdn.beautyglow.hu/images/c4-1.jpg',
    'https://cdn.beautyglow.hu/images/c4-2.jpg',
    'https://cdn.beautyglow.hu/images/c4-3.jpg',
    'https://cdn.beautyglow.hu/images/c4-4.jpg',
    'https://cdn.beautyglow.hu/images/c4-5.jpg',
    'https://cdn.beautyglow.hu/images/c4-7.jpg'
]);

const carousel5 = new Carousel('carouselTrack5', [
    'https://cdn.beautyglow.hu/images/c5-1.jpg',
    'https://cdn.beautyglow.hu/images/c5-2.jpg',
    'https://cdn.beautyglow.hu/images/c5-3.jpg',
    'https://cdn.beautyglow.hu/images/c5-4.jpg',
    'https://cdn.beautyglow.hu/images/c5-5.jpg',
    'https://cdn.beautyglow.hu/images/c5-6.jpg',
    'https://cdn.beautyglow.hu/images/c5-7.jpg'
]);

window.addEventListener('scroll', toggleNavbar);

function toggleNavbar() {

    const navbar = document.querySelector('.main-nav');
    const scrollPos = window.scrollY;
    console.log(scrollPos);
    if (scrollPos > 800) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
}