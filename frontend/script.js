// frontend/script.js

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    // API manzili (Django backend ishlayotgan manzil)
    // Deploy qilinganda bu yerga deploy qilingan backend manzili yoziladi
    const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Rivojlanish uchun

    // Sahifa kontentini yuklash funksiyasi
    async function loadPage(pageName) {
        // Barcha sahifa qismlarini yashirish
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        const sectionId = `${pageName}-section`;
        let pageSection = document.getElementById(sectionId);

        if (pageName === 'home') {
            // Home sahifasi HTMLda statik turibdi
            if (pageSection) {
                pageSection.classList.add('active');
            }
            return;
        }

        // Agar sahifa allaqachon yuklanmagan bo'lsa, HTMLni yuklash
        if (!pageSection) {
            try {
                const response = await fetch(`pages/${pageName}.html`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${pageName}.html: ${response.statusText}`);
                }
                const htmlContent = await response.text();
                // Yangi section elementini yaratish
                pageSection = document.createElement('section');
                pageSection.id = sectionId;
                pageSection.classList.add('page-section');
                pageSection.innerHTML = htmlContent;
                mainContent.appendChild(pageSection);

                // Sahifa uchun maxsus JS faylini chaqirish
                // Global ob'ektda saqlangan funksiyani chaqirish
                if (window[`init${capitalizeFirstLetter(pageName)}Page`]) {
                    window[`init${capitalizeFirstLetter(pageName)}Page`](API_BASE_URL);
                }

            } catch (error) {
                console.error(`Error loading ${pageName} page:`, error);
                mainContent.innerHTML = `<section class="page-section active container"><h2>Xatolik!</h2><p>Sahifa yuklashda muammo yuz berdi: ${error.message}</p></section>`;
                return;
            }
        }
        pageSection.classList.add('active');
    }

    // Harfni katta qilish yordamchi funksiyasi
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Navbar linklarini tinglovchilarini sozlash
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = e.target.dataset.page; // data-page atributidan sahifa nomini olish

            // Active klassini yangilash
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            loadPage(pageName);
        });
    });

    // Sayt yuklanganda yoki hash o'zgarganda sahifani yuklash
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // # belgisini olib tashlash
        const initialPage = hash || 'home'; // Agar hash bo'lmasa, home sahifasini yuklash
        loadPage(initialPage);

        // Navbar linkini faollashtirish
        navLinks.forEach(link => {
            if (link.dataset.page === initialPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Ilk yuklanishda va hash o'zgarganda ishlatish
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Sahifa yuklanganda birinchi marta chaqirish
});