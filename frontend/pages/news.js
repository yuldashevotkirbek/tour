// frontend/pages/news.js

window.initNewsPage = async (apiBaseUrl) => {
    const newsListDiv = document.getElementById('news-list');
    const newsErrorDiv = document.getElementById('news-error');

    if (!newsListDiv || !newsErrorDiv) return; // Agar elementlar topilmasa, funksiyani to'xtatish

    newsListDiv.innerHTML = '<p class="loading-message">Yangiliklar yuklanmoqda...</p>';
    newsErrorDiv.style.display = 'none';

    try {
        const response = await fetch(`${apiBaseUrl}/news/`);
        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        const news = await response.json();

        if (news.length === 0) {
            newsListDiv.innerHTML = '<p class="loading-message">Hozircha yangiliklar mavjud emas.</p>';
            return;
        }

        newsListDiv.innerHTML = ''; // Eski yuklanish xabarini o'chirish
        news.forEach(post => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            newsCard.innerHTML = `
                <img src="${post.image || '../assets/images/default_news.jpg'}" alt="${post.title}">
                <div class="news-card-body">
                    <h3>${post.title}</h3>
                    <p>${post.content.substring(0, 150)}...</p>
                    <div class="news-card-date">${new Date(post.published_date).toLocaleDateString()}</div>
                    <a href="#" class="btn">Batafsil o'qish</a>
                </div>
            `;
            newsListDiv.appendChild(newsCard);
        });

    } catch (error) {
        console.error("Error loading news:", error);
        newsListDiv.innerHTML = ''; // Loading xabarini o'chirish
        newsErrorDiv.style.display = 'block'; // Xato xabarini ko'rsatish
    }
};