// frontend/pages/tours.js

window.initToursPage = async (apiBaseUrl) => {
    const toursListDiv = document.getElementById('tours-list');
    const toursErrorDiv = document.getElementById('tours-error');

    if (!toursListDiv || !toursErrorDiv) return; // Agar elementlar topilmasa, funksiyani to'xtatish

    toursListDiv.innerHTML = '<p class="loading-message">Turlar yuklanmoqda...</p>'; // Yuklanish xabarini ko'rsatish
    toursErrorDiv.style.display = 'none';

    try {
        const response = await fetch(`${apiBaseUrl}/tours/`);
        if (!response.ok) {
            throw new Error(`Failed to fetch tours: ${response.statusText}`);
        }
        const tours = await response.json();

        if (tours.length === 0) {
            toursListDiv.innerHTML = '<p class="loading-message">Hozircha turlar mavjud emas.</p>';
            return;
        }

        toursListDiv.innerHTML = ''; // Eski yuklanish xabarini o'chirish
        tours.forEach(tour => {
            const tourCard = document.createElement('div');
            tourCard.classList.add('tour-card');
            tourCard.innerHTML = `
                <img src="${tour.image || '../assets/images/default_tour.jpg'}" alt="${tour.title}">
                <div class="tour-card-body">
                    <h3>${tour.title}</h3>
                    <p>${tour.description.substring(0, 100)}...</p>
                    <p>Davomiyligi: ${tour.duration_days} kun</p>
                    <div class="tour-card-price">$${parseFloat(tour.price).toFixed(2)}</div>
                    <a href="#" class="btn">Batafsil</a>
                </div>
            `;
            toursListDiv.appendChild(tourCard);
        });

    } catch (error) {
        console.error("Error loading tours:", error);
        toursListDiv.innerHTML = ''; // Loading xabarini o'chirish
        toursErrorDiv.style.display = 'block'; // Xato xabarini ko'rsatish
    }
};