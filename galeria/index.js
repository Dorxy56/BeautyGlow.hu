// =============================================
// BEÁLLÍTÁSOK
// A Worker deploy után cseréld le az alábbi URL-t a valódi Worker URL-re!
// Pl.: 'https://beautyglow-gallery.YOUR_SUBDOMAIN.workers.dev'
// =============================================
const API_URL    = '/api/gallery';
const CDN_BASE   = 'https://cdn.beautyglow.hu/images/';

// =============================================
// Állapot
// =============================================
let allCategories   = [];
let activeFilter    = 'osszes';
let lbImages        = [];   // aktuálisan lightboxban lévő képek tömbje
let lbIndex         = 0;    // aktuális index

// =============================================
// Inicializálás
// =============================================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        showLoader();
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('API hiba');
        const data = await res.json();
        allCategories = data.categories || [];

        renderFilters();
        renderGrid('osszes');
    } catch (err) {
        showError();
        console.error('Galéria betöltési hiba:', err);
    } finally {
        hideLoader();
    }
}

// =============================================
// Filter gombok
// =============================================
function renderFilters() {
    const bar = document.getElementById('gallery-filters');
    bar.innerHTML = '';

    // "Összes" gomb
    bar.appendChild(createFilterBtn('osszes', 'Összes', true));

    // Egy gomb kategóriánként
    allCategories.forEach(cat => {
        bar.appendChild(createFilterBtn(cat.id, cat.name, false));
    });
}

function createFilterBtn(id, label, isActive) {
    const btn = document.createElement('button');
    btn.className = 'btn filter-btn' + (isActive ? ' active' : '');
    btn.textContent = label;
    btn.dataset.id = id;
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = id;
        renderGrid(id);
    });
    return btn;
}

// =============================================
// Képrács renderelés
// =============================================
function renderGrid(filterId) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    const filtered = filterId === 'osszes'
        ? allCategories
        : allCategories.filter(c => c.id === filterId);

    filtered.forEach(cat => {
        cat.images.forEach((filename, idx) => {
            const src  = `${CDN_BASE}${cat.folder}${filename}`;
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animationDelay = `${idx * 0.04}s`;

            const img = document.createElement('img');
            img.src             = src;
            img.alt             = `${cat.name} – ${idx + 1}`;
            img.loading         = 'lazy';
            img.decoding        = 'async';

            item.appendChild(img);
            item.addEventListener('click', () => {
                // Lightboxban az adott kategória képeit lapozza
                lbImages = cat.images.map(f => ({
                    src:     `${CDN_BASE}${cat.folder}${f}`,
                    caption: cat.name
                }));
                openLightbox(idx);
            });

            grid.appendChild(item);
        });
    });
}

// =============================================
// Lightbox
// =============================================
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbCap    = document.getElementById('lb-caption');

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => moveLightbox(-1));
document.getElementById('lb-next').addEventListener('click', () => moveLightbox(1));

// Kattintás a sötét háttérre → bezár
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

// Billentyűzet
document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'none') return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  moveLightbox(-1);
    if (e.key === 'ArrowRight') moveLightbox(1);
});

function openLightbox(index) {
    lbIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    lbImg.src = '';
}

function moveLightbox(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const current = lbImages[lbIndex];
    lbImg.src     = current.src;
    lbCap.textContent = `${current.caption}  •  ${lbIndex + 1} / ${lbImages.length}`;
}

// =============================================
// Loader / hiba segédfüggvények
// =============================================
function showLoader() {
    document.getElementById('gallery-loader').style.display = 'flex';
    document.getElementById('gallery-grid').style.display   = 'none';
    document.getElementById('gallery-error').style.display  = 'none';
}

function hideLoader() {
    document.getElementById('gallery-loader').style.display = 'none';
    document.getElementById('gallery-grid').style.display   = 'grid';
}

function showError() {
    document.getElementById('gallery-loader').style.display = 'none';
    document.getElementById('gallery-error').style.display  = 'block';
}

// =============================================
// Sticky navbar scroll
// =============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.main-nav');
    if (window.scrollY > 400) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});
