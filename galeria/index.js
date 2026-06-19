// =============================================
// CLOUDINARY BEÁLLÍTÁS
// 1. Regisztrálj: https://cloudinary.com (ingyenes)
// 2. Keresd meg a Cloud Name-t a dashboardon
// 3. Írd be ide:
const CLOUD_NAME = 'dslkd5nqh';
//
// KATEGÓRIÁK HOZZÁADÁSA:
// - Töltsd fel a képeket Cloudinary-ra
// - Feltöltéskor adj hozzá egy tag-et (pl. "portre")
// - Add hozzá az alábbi tömbhöz: { id: 'portre', name: 'Portrék' }
// - Kész – a képek automatikusan megjelennek
// =============================================
const CATEGORIES = [
    { id: 'portre',  name: 'Portrék'       },
    { id: 'paros',   name: 'Páros fotózás'  },
    { id: 'csaladi', name: 'Családi'        },
    { id: 'eskuvo',  name: 'Esküvő'        },
    { id: 'kellekes', name: 'Kellékes fotózás' },
];

// =============================================
// Cloudinary URL segédfüggvények
// =============================================
function thumbUrl(publicId, format) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_600,c_fill,ar_3:4/${publicId}.${format}`;
}

function fullUrl(publicId, format) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${publicId}.${format}`;
}

function tagListUrl(tag) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`;
}

// =============================================
// Állapot
// =============================================
let allCategories = [];
let lbImages      = [];
let lbIndex       = 0;

// =============================================
// Inicializálás
// =============================================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    showLoader();
    try {
        // Minden kategória képeit párhuzamosan kérjük le
        const results = await Promise.all(
            CATEGORIES.map(async cat => {
                try {
                    const res = await fetch(tagListUrl(cat.id));
                    if (!res.ok) return { ...cat, images: [] };
                    const data = await res.json();
                    const images = (data.resources || []).map(r => ({
                        thumb: thumbUrl(r.public_id, r.format),
                        full:  fullUrl(r.public_id, r.format),
                    }));
                    return { ...cat, images };
                } catch {
                    return { ...cat, images: [] };
                }
            })
        );

        // Csak azok a kategóriák jelennek meg, amikben van kép
        allCategories = results.filter(c => c.images.length > 0);

        renderFilters();
        renderGrid('osszes');
    } catch (err) {
        showError();
        console.error('Galéria hiba:', err);
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
    bar.appendChild(createFilterBtn('osszes', 'Összes', true));
    allCategories.forEach(cat => bar.appendChild(createFilterBtn(cat.id, cat.name, false)));
}

function createFilterBtn(id, label, isActive) {
    const btn = document.createElement('button');
    btn.className = 'btn filter-btn' + (isActive ? ' active' : '');
    btn.textContent = label;
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid(id);
    });
    return btn;
}

// =============================================
// Képrács
// =============================================
function renderGrid(filterId) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    const visible = filterId === 'osszes' ? allCategories : allCategories.filter(c => c.id === filterId);

    visible.forEach(cat => {
        cat.images.forEach((img, idx) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animationDelay = `${idx * 0.04}s`;

            const el = document.createElement('img');
            el.src      = img.thumb;
            el.alt      = `${cat.name} – ${idx + 1}`;
            el.loading  = 'lazy';
            el.decoding = 'async';

            item.appendChild(el);
            item.addEventListener('click', () => {
                lbImages = cat.images.map((i, n) => ({ src: i.full, caption: `${cat.name}  •  ${n + 1} / ${cat.images.length}` }));
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

lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

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
    lbImg.src       = lbImages[lbIndex].src;
    lbCap.textContent = lbImages[lbIndex].caption;
}

// =============================================
// Loader / hiba
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
// Sticky navbar
// =============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.main-nav');
    navbar.classList.toggle('show', window.scrollY > 400);
});
